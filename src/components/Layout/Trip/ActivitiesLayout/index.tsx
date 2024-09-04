'use client'

import { Collection } from "@/src/components/compounds/Activities/Collection/Collection"
import { useActivitiesProps } from "@/src/hooks/trip/useActivitiesProps"


export const ActivitiesLayout = () => {
  const { items } = useActivitiesProps();

  console.log(items)

  return <div className="flex flex-col gap-5">{items.map((item, idx) => { return <Collection {...item} key={`${item.date}-${idx}`} />})}</div>
}