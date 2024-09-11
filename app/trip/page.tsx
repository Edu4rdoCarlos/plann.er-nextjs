"use client";

import { useTrip } from "@/src/hooks/useTrip";
import { format } from "date-fns";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";

export default function TripPage() {
  const { data: trips } = useTrip.ListAll();
  console.log(trips);

  return (
    <div className="flex flex-col" style={{ gap: 25 }}>
      <div className="flex justify-between md:items-center relative z-10 flex-col md:flex-row gap-4">
        <h1 style={{ fontSize: 36 }} className="font-semibold">
          Viagens
        </h1>
      </div>

      {trips && trips.length > 0 ? (
        <ul className="flex flex-col gap-6">
          {trips.map((trip, idx) => (
            <Link
              href={`/trip/${trip.id}`}
              key={idx}
              className="group cursor-pointer"
            >
              <li className="grid grid-cols-5 gap-6 items-center p-5 border rounded-md overflow-hidden group-hover:bg-zinc-800/20 transition-colors duration-300 border-zinc-800">
                <div className="w-fit">
                  <strong>Cidade:</strong> {trip.city}
                </div>
                <div className="w-fit mx-auto">
                  <strong>País:</strong> {trip.country}
                </div>
                <div className="w-fit mx-auto">
                  <strong>Início:</strong>{" "}
                  {format(new Date(trip.startDate), "dd/MM/yyyy")}
                </div>
                <div className="w-fit mx-auto">
                  <strong>Término:</strong>{" "}
                  {format(new Date(trip.endDate), "dd/MM/yyyy")}
                </div>
                <span className="flex justify-end pr-4 opacity-0 transition-opacity group-hover:opacity-100 duration-200">
                  <MoveRight width={32} />
                </span>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="text-zinc-400">Nenhuma viagem cadastrada</div>
      )}
    </div>
  );
}
