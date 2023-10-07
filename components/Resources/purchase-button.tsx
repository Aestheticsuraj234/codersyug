"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { formatPrice } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';

const PurchaseButton = ({
    slug,
    price,
}: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handlePurchase = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/resources/${slug}/checkout`);
            window.location.assign(response.data.url);
            toast({
                title: "Redirecting to payment gateway",
                description: "Please wait...",
            });
            console.log(response.data);
        } catch (error:any) {
            console.error(error);
            toast({
                title: `${error.response.data.message}`,
                description: "Please try again",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="flex-center gap-1 px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
            {isLoading ? (
                <Loader2 className='animate-spin' />
            ) : (
                <>Purchase for <span className='text-emerald-400 text-xl dark:text-white'>{formatPrice(price)}</span></>
            )}
        </Button>
    );
};

export default PurchaseButton;
