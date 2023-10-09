import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  console.log("[webhook]", userId)
  const resourcesSlug = session?.metadata?.resourcesSlug;

  if (event.type === "checkout.session.completed") {
    if (!userId || !resourcesSlug) {
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }
    const existingPurchase = await db.purchasedResources.findFirst({
        where: {
          userId: parseInt(userId),
          resourceSlug: resourcesSlug,
          isPuchasedByUser: true,
        },
      });
      
      if (!existingPurchase) {
        // User has not purchased this resource before, create a new purchase record
        await db.purchasedResources.create({
          data: {
            userId: parseInt(userId),
            resourceSlug: resourcesSlug,
            isPuchasedByUser: true,
            
          },
        });
      } else {
        // User has already purchased this resource, handle accordingly (e.g., show an error)
        return new NextResponse("Already Purchased", { status: 400 });
      }
 
      
  } else {
    return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
  }

  return new NextResponse(null, { status: 200 });
}