import { useState, useCallback, ComponentType } from "react";
import copy from "copy-to-clipboard";
import { Check, Link2, LucideProps } from "lucide-react";

interface ClipboardProps {
  content: string;
  IconArg?: ComponentType<LucideProps>;
}

export const useClipboard = (props: ClipboardProps) => {
  const { content, IconArg = Link2 } = props;

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = useCallback(() => {
    if (copy(content)) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [content]);

  return {
    Icon: copied ? Check : IconArg,
    onClick: handleCopy,
  };
};
