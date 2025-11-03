"use client";

import { useTrip } from "@/src/hooks/useTrip";
import { format } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Plane,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/primitives/Button/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "@/src/hooks/useLocale";

export default function TripPage() {
  const { data: trips } = useTrip.ListAll();
  const router = useRouter();
  const t = useTranslations("trips");
  const { locale } = useLocale();

  const dateLocales = {
    pt: ptBR,
    en: enUS,
    es: es,
  };

  const getTripStatus = (startDate: string | Date, endDate: string | Date) => {
    const now = new Date();
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);

    if (now < start) {
      return {
        status: "upcoming",
        label: t("statusUpcoming"),
        color: "bg-blue-500",
      };
    } else if (now > end) {
      return {
        status: "completed",
        label: t("statusCompleted"),
        color: "bg-gray-500",
      };
    } else {
      return {
        status: "ongoing",
        label: t("statusOngoing"),
        color: "text-lime-300",
      };
    }
  };

  const getTripDuration = (
    startDate: string | Date,
    endDate: string | Date
  ) => {
    const start = startDate instanceof Date ? startDate : new Date(startDate);
    const end = endDate instanceof Date ? endDate : new Date(endDate);
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days === 1 ? `1 ${t("day")}` : `${days} ${t("days")}`;
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-zinc-400 text-lg">
            {trips?.length
              ? `${trips.length} ${
                  trips.length > 1 ? t("tripPlural") : t("trip")
                } ${trips.length > 1 ? t("plannedPlural") : t("planned")}`
              : t("noTrips")}
          </p>
        </div>

        <div className="w-auto">
          <Button
            colorScheme="primary"
            size="sm"
            onClick={() => router.push("/new")}
            className="flex items-center gap-2 px-6 py-3"
          >
            <Plus size={20} />
            {t("newTrip")}
          </Button>
        </div>
      </div>

      {trips && trips.length > 0 ? (
        <div className="grid gap-6">
          {trips.map((trip, idx) => {
            const tripStatus = getTripStatus(trip.startDate, trip.endDate);
            const duration = getTripDuration(trip.startDate, trip.endDate);

            return (
              <Link href={`/trip/${trip.id}`} key={idx} className="group block">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:bg-zinc-800/30 hover:border-zinc-700 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-600/20 rounded-lg">
                        <Plane className="text-lime-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {trip.city}, {trip.country}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${tripStatus.color}`}
                          >
                            {tripStatus.label}
                          </span>
                          <span className="text-zinc-400 text-sm">
                            {duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight
                      className="text-zinc-400 group-hover:text-lime-400 group-hover:translate-x-1 transition-all duration-200"
                      size={24}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                      <MapPin
                        className="text-lime-400 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-sm text-zinc-400">
                          {t("destination")}
                        </p>
                        <p className="text-white font-medium">{trip.city}</p>
                        <p className="text-zinc-300 text-sm">{trip.country}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                      <Calendar
                        className="text-blue-400 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-sm text-zinc-400">{t("start")}</p>
                        <p className="text-white font-medium">
                          {format(new Date(trip.startDate), "dd/MM/yyyy", {
                            locale: dateLocales[locale],
                          })}
                        </p>
                        <p className="text-zinc-300 text-sm">
                          {format(new Date(trip.startDate), "EEEE", {
                            locale: dateLocales[locale],
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg">
                      <Clock
                        className="text-orange-400 flex-shrink-0"
                        size={18}
                      />
                      <div>
                        <p className="text-sm text-zinc-400">{t("end")}</p>
                        <p className="text-white font-medium">
                          {format(new Date(trip.endDate), "dd/MM/yyyy", {
                            locale: dateLocales[locale],
                          })}
                        </p>
                        <p className="text-zinc-300 text-sm">
                          {format(new Date(trip.endDate), "EEEE", {
                            locale: dateLocales[locale],
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 max-w-md mx-auto">
            <div className="p-4 bg-lime-600/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Plane className="text-lime-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("noTrips")}
            </h3>
            <p className="text-zinc-400 mb-6">{t("noTripsDescription")}</p>
            <div className="w-auto">
              <Button
                colorScheme="primary"
                size="md"
                onClick={() => router.push("/new")}
                className="flex items-center gap-2 px-6 py-3"
              >
                <Plus size={20} />
                {t("createFirst")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
