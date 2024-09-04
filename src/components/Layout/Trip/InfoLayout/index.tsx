'use client'

import { useInfoLayoutProps } from "@/src/hooks/trip/useInfoLayoutProps"
import { AttachmentLayout } from "./AttachmentLayout"
import { GuestsLayout } from "./GuestLayout"
import { Bar } from "@/src/components/primitives/Bar/Bar"

export const InfoLayout = () => {
  const { attachmentItems, guestItems } = useInfoLayoutProps()

  return (
    <div className="flex flex-col w-full gap-8 h-full">
      <AttachmentLayout items={attachmentItems} />
      <Bar />
      <GuestsLayout items={guestItems.items} />
    </div>
  )
}