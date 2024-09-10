import { useParams } from "next/navigation";
import { useMember } from "../useMember";
import { Check } from "@/src/components/primitives/Check/Check";

export const useMembersProps = () => {
  const router = useParams();

  const { data } = useMember.ListAll(router.id as string);

  const members =
    data?.map((member, idx) => {
      return {
        info: member.email,
        label: member.name || `Convidado ${idx + 1}`,
        widget: <Check checked={member.status} />,
      };
    }) || [];

  return { items: members };
};
