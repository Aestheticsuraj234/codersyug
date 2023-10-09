import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className='dark:text-zinc-100 text-zinc-800 body-text border-t border-black-400 px-4 py-8 md:px-20'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0 md:gap-x-9'>
                <p>
                    Copyright © 2023 Codersyug | All Rights Reserved
                </p>
                <div className='flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-9'>
                    <Link href="/terms-conditions">
                      Terms & Conditions
                    </Link>
                    <Link href="/privacy-policy">
                       Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
