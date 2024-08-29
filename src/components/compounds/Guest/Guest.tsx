import { X } from "lucide-react";
import { Button } from "../../primitives/Button/Button";
import { sEmail, sGuest } from "./Guest.variants";

export interface GuestProps {
  email: string;
  onCancel: () => void;
}

export const Guest = (props: GuestProps) => {
  const { email, onCancel } = props;
  return (
    <div className={sGuest()}>
      <span className={sEmail()}>{email}</span>
      <Button
        colorScheme="secondary"
        variants="ghost"
        onClick={onCancel}
        className="w-fit"
      >
        <X width={16} />
      </Button>
    </div>
  );
};
