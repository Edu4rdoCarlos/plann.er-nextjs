"use client";

import { Collection } from "@/src/components/compounds/Activities/Collection/Collection";
import { CreateActivity } from "@/src/components/compounds/Modal/CreateActivity/CreateActivity";
import { useActivitiesProps } from "@/src/hooks/trip/useActivitiesProps";
import { useState } from "react";

export const ActivitiesLayout = () => {
  const { items } = useActivitiesProps();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col" style={{ gap: 25 }}>
      <div className="flex justify-between items-center relative z-10">
        <h1 style={{ fontSize: 36 }} className="font-semibold">
          Atividades
        </h1>
        <CreateActivity onOpenChange={setOpen} open={open} />
      </div>
      {items.map((item, idx) => {
        return <Collection {...item} key={`${item.date}-${idx}`} />;
      })}
    </div>
  );
};
