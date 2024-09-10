"use client";

import { useInfoLayoutProps } from "@/src/hooks/trip/useInfoLayoutProps";
import { AttachmentLayout } from "./AttachmentLayout";
import { MemberLayout } from "./MemberLayout";
import { Bar } from "@/src/components/primitives/Bar/Bar";

export const InfoLayout = () => {
  const { attachmentItems, memberItems } = useInfoLayoutProps();

  return (
    <div className="flex flex-col w-full h-full">
      <AttachmentLayout items={attachmentItems} />
      <Bar />
      <MemberLayout items={memberItems.items} />
    </div>
  );
};
