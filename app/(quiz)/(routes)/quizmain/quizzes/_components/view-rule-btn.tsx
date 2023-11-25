"use client";
import React from 'react'
import {Button} from '@/components/ui/button'
import { IconBadge } from '@/components/Global/icon-badge'
import { ClipboardEdit } from 'lucide-react'
import { useRouter } from 'next/navigation'
const ViewRuleBtn = () => {
    const router = useRouter()

    const onVisit = () => {
        router.push("https://royal-egg-90c.notion.site/Quiz-Wuiz-Rules-7aa7b59c24b242d5b3fa2c74d0af8c67")

    }

  return (
    <Button onClick={onVisit} variant={"outline"} size={"default"} className='flex-center flex-row gap-2' >
      <IconBadge icon={ClipboardEdit} variant={"warning"} size={"sm"} />  View Rules😨
    </Button>
  )
}

export default ViewRuleBtn