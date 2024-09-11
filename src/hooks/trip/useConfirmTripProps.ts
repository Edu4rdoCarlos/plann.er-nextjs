import { useTrip } from "@/src/hooks/useTrip";
import { parseQueryString } from "@/src/utils/text";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DecodedData {
  email: string;
  trip: string;
}

export const useConfirmTripProps = () => {
  const searchParams = useSearchParams();
  const [decodedData, setDecodedData] = useState<DecodedData>();
  const { data, refetch } = useTrip.FindOne(decodedData?.trip);

  useEffect(() => {
    if (decodedData) {
      refetch();
    }
  }, [decodedData]);

  useEffect(() => {
    const base64String = searchParams.toString();
    if (base64String) {
      const decodedString = Buffer.from(base64String, "base64").toString(
        "utf-8"
      );
      const decodedObj = parseQueryString(
        decodedString
      ) as unknown as DecodedData;

      setDecodedData(decodedObj);
    }
  }, [searchParams]);
  return {
    data,
    refetch,
    decodedData,
  };
};
