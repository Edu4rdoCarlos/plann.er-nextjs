import { useState, useCallback, ComponentType } from "react";
import copy from "copy-to-clipboard";
import { Check, Link2, LucideProps } from "lucide-react";

export const useClipboard = (IconArg?: ComponentType<LucideProps>) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback((content: string) => {
    if (copy(content)) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, []);

  return {
    Icon: copied ? Check : IconArg || Link2,
    copy: handleCopy,
  };
};
