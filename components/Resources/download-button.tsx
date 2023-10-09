"use client"
import { incrementViewOnDownload } from '@/server-action/action'
import {  MoveRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DownloadButton = ({
    downloadLink,
    slug
}:any) => {
    const handleDownload = async () => {
        await incrementViewOnDownload(slug)
    }
  return (

    <Link
        href={downloadLink}
        onClick={handleDownload}
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
        Download Now
        <MoveRight />
    </Link>

  )
}

export default DownloadButton