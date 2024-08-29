"use client";
import { useTrip } from "@/src/hooks/useTrip";

export default function Home() {
  const allData = useTrip.ListAll();
  console.log(allData);
  return <></>;
}
