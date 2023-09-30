import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='dark:text-zinc-100 text-zinc-800 flex-between  body-text w-full gap-y-10 border-t border-black-400 bg-black-100 px-20 py-8 max-md:flex-col'>
            <p>
                Copyright © 2023 Codersyug | All Rights Reserved
            </p>
            <div className='flex gap-x-9'>
                <Link href={"/terms-of-use"}>
                    Terms & Conditions
                </Link>
                <Link href={"/privacy-policy"}>
                    Privacy Policy
                </Link>
            </div>
        </footer>
    )
}

export default Footer