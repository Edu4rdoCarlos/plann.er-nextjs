'use client'

import { useInfoLayoutProps } from "@/src/hooks/trip/useInfoLayoutProps"
import { AttachmentLayout } from "./AttachmentLayout"

export const InfoLayout = () => {
  const { attachmentItems } = useInfoLayoutProps()

  return (
    <div className="flex flex-col">
      <AttachmentLayout items={attachmentItems} />
      <div className="h-0.5 w-full bg-zinc-600" />
    </div>
  )
}