import Stripe from "stripe";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe";

export async function POST(
    req: Request,
    { params }: { params: { slug: string } }
) {
try {
    const profile = await currentProfile();
    if(!profile || !profile.id || !profile.email){
        return new NextResponse("Unauthorized",{status:401})
    }

    const resources = await db.resources.findUnique({
        where:{
            Slug:params.slug
        }
   
    })

    console.log("[resources_slug_checkout]",resources)

    const purchasedResources = await db.resources.findUnique({
        where:{
            Slug:params.slug,
            purchasedBy:{
                some:{
                    id:profile?.id
                }
            }
        }
 
    });
    console.log("[resources_slug_checkout]",Boolean(purchasedResources))

    if(purchasedResources){
        return new NextResponse("Already Purchased",{status:400})
    }

    if(!resources){
        return new NextResponse("Resource Not Found",{status:404})
    }
   
    const line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [
        {
            price_data:{
                currency:"INR",
                product_data:{
                    name:resources.Title,
                    description:resources.Description || undefined,
                    
                   
                },
                unit_amount:Math.round(resources.Price! * 100 )|| undefined
            },
            quantity:1

        }
  
    ]

    let stripeCustomer = await db.stripeCustomer.findUnique({
        where:{
            userId:profile.id 
        },
        select:{
            stripeCustomerId:true
        }
    })
        if(!stripeCustomer){
            const customer = await stripe.customers.create({
                email:profile.email
          
            });

            stripeCustomer = await db.stripeCustomer.create({
                data:{
                    userId:profile.id,
                    stripeCustomerId:customer.id
                }
            })


            
        }
 
    
        const session = await stripe.checkout.sessions.create({
            customer:stripeCustomer.stripeCustomerId,
            payment_method_types:["card"],
            line_items,
            mode:"payment",
            success_url:`${process.env.NEXT_PUBLIC_URL}/resources/${params.slug}?success=1`,
            cancel_url:`${process.env.NEXT_PUBLIC_URL}/resources/resources/${params.slug}?canceled=1`,
            metadata:{
                resourceId:resources.id,
                userId:profile.id,
                resourceSlug:params.slug
            }
        })

        return NextResponse.json({ url: session.url });

    
} catch (error) {
    console.log("[resources_slug_checkout]",error)
    return new NextResponse("Internal Error",{status:500})
    
}
}