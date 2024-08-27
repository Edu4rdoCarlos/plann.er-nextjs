import { tv } from "tailwind-variants";

const selectWithSearch = tv({
  slots: {
    sWrapper: ["relative"],
    sSearch: ["relative z-[1]"],
    sDropdown: [
      "w-full",
      "bg-zinc-900",
      "rounded-b-lg",
      "overflow-hidden",
      "border-zinc-800",
      "border-[1px]",
      "absolute",
      "top-[48px]",
      "z-[0]",
    ],
    sItems: [
      "py-2",
      "border-b-[1px]",
      "border-zinc-800",
      "px-3",
      "hover:bg-zinc-800/40",
      "transition",
      "duration-100",
      "first:pt-5",
      "last:border-none",
    ],
    sBar: ["h-[25px]", "w-0.5", "bg-zinc-800", "mx-1"],
    sNotFound: ["last:hover:bg-zinc-900", "select-none"],
  },
});

export const { sDropdown, sItems, sWrapper, sSearch, sNotFound, sBar } =
  selectWithSearch();
