"use clent"
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Check, CopyIcon } from 'lucide-react';
import { getUniqueCode } from '@/server-action/hackathon';

const UniqueCodeComponent = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [res, setRes] = useState<any>("");

    const onCopy = () => {
        navigator.clipboard.writeText(res);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    const getCode = async () => {
        const code = await getUniqueCode();
        setRes(code);
    }

    useEffect(() => {
        getCode();
    }, []);

    return (
        <div className="md:flex-end  flex-center ">
            <div className="rounded-md px-2 py-1 w-auto border border-1 dark:border-zinc-300 border-gray-500 dark:bg-zinc-700 bg-gray-200 flex items-center justify-between flex-col sm:flex-row">
                <div className="flex items-center flex-row justify-center gap-4">
                    <p className="dark:text-white text-gray-800 text-sm font-medium overflow-hidden ">
                        {res}
                    </p>
                    <Button size={"icon"} onClick={onCopy}>
                        {isCopied ? <Check className="w-5 h-5 text-whitec text-green-600" /> : <CopyIcon className="w-5 h-5 text-whitec" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UniqueCodeComponent;
