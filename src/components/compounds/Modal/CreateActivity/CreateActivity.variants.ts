import { tv } from "tailwind-variants";

const createActivityVariants = tv({
  slots: {
    sTimeWrapper: [
      "flex",
      "w-full",
      "gap-2",
      "first:[&>div]:w-[60%]",
      "last:[&>div]:w-[40%]",
    ],
  },
});

export const { sTimeWrapper } = createActivityVariants();
