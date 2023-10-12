import Stripe from "stripe";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe";
import { ResourceAccessType } from "@prisma/client";

export async function POST(
    req: Request,
    { params }: { params: { slug: string } }
) {
    try {
        // find currently logged in user
        const profile = await currentProfile();
        // if user is not logged in, return unauthorized
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // find resource with slug and access type paid
        const resources = await db.resources.findUnique({
            where: {
                Slug: params.slug,
                accessType: ResourceAccessType.PAID
            },
           

        })


        const ALREADY_PURCHASED = await db.resources.findUnique({
            where: {
                Slug: params.slug,
                purchasedBy: {
                    some: {
                        userId: profile.id
                       
                    }
                }

            },
           

        });
    
// if resource is already purchased by user, return already purchased
        if (ALREADY_PURCHASED) {
            return new NextResponse("Already Purchased", { status: 400 })
        }
        // if resource is not found, return resource not found

        if (!resources) {
            return new NextResponse("Resource Not Found", { status: 404 })
        }
// Create a new checkout session for the order with the `resourceSlug & userId` metadata item
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: resources.Title!,
                        description: resources.Description! || undefined,
                    },
                    unit_amount: Math.round(resources.Price! * 100) || undefined
                },
                

            }

        ]


//  find stripe customer id for the user
        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
              userId: profile.id,
            },
            select: {
              stripeCustomerId: true,
            }
          });


        //   if stripe customer id is not found, create a new customer
        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: profile.email

            });

            // create a new stripe customer record in the database
            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: profile.id,
                    stripeCustomerId: customer.id
                }
            })



        }


        // create a new checkout session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            mode: "payment",
            line_items,
            // payment_method_types: ["card"],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/resources/${params.slug}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/resources/${params.slug}?canceled=1`,
            metadata: {
                userId: profile.id,
                resourcesSlug: resources.Slug!,
            }
        })

        return NextResponse.json({ url: session.url });


    } catch (error) {
        console.log("[resources_slug_checkout]", error)
        return new NextResponse("Internal Error", { status: 500 })

    }
}