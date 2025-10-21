"use client";

import { InviteMembers } from "@/src/components/compounds/Modal/InviteMember/InviteMember";
import { Button } from "@/src/components/primitives/Button/Button";
import { Calendar } from "@/src/components/primitives/Calendar/Calendar";
import { Input } from "@/src/components/primitives/Input/Input";
import { SelectWithSearch } from "@/src/components/primitives/Select/SelectWithSearch";
import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { useTrip } from "@/src/hooks/useTrip";
import { useToast } from "@/src/providers/ToastProvider";
import { ICreateTrip } from "@/src/types/trip";
import { ArrowRight, Mail, Settings2, User, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { mutateAsync: createTrip, isLoading } = useTrip.Create();
  const t = useTranslations("newTrip");

  const {
    handleCalendarChange,
    calendarValue,
    handleInput,
    options,
    inputValue,
  } = useTripProps();

  const [isContinued, setIsContinued] = useState(false);
  const [guests, setGuests] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameOwner, setNameOwner] = useState<string>("");
  const [emailOwner, setEmailOwner] = useState<string>("");

  const isReadyToContinue =
    inputValue &&
    Array.isArray(calendarValue) &&
    calendarValue[0] !== null &&
    calendarValue[1] !== null;

  const handleContinueClick = () => {
    if (isReadyToContinue) {
      setIsContinued(true);
    }
  };

  const handleAlterDateAndLocationClick = () => {
    setIsContinued(false);
  };

  const handleGuestsChange = (newGuests: string[]) => {
    setGuests(newGuests);
  };

  const handleSubmit = async () => {
    if (!isReadyToContinue || !nameOwner || !emailOwner) {
      showToast(t("fillAllFields"), "error");
      return;
    }

    const tripPayload: ICreateTrip = {
      city: inputValue.split(",")[0]?.trim(),
      country: inputValue.split(",")[1]?.trim(),
      startDate: calendarValue[0]!.toISOString(),
      endDate: calendarValue[1]!.toISOString(),
      owner: {
        name: nameOwner,
        email: emailOwner,
      },
      members: guests.map((email) => ({ email: email })),
    };

    try {
      const newTrip = await createTrip({ formData: tripPayload });

      if (newTrip) {
        showToast(t("tripCreatedSuccess"), "success");
        router.push(`/trip/${newTrip.id}`);
      }
    } catch (error) {
      showToast(t("tripCreatedError"), "error");
      console.error(error);
    }
  };

  const continueButton = (
    <Button
      size="sm"
      colorScheme="secondary"
      className="w-fit"
      onClick={
        isContinued ? handleAlterDateAndLocationClick : handleContinueClick
      }
      disabled={!isContinued && !isReadyToContinue}
    >
      {isContinued ? (
        <>
          {t("alterLocation")} <Settings2 width={20} />
        </>
      ) : (
        <>
          {t("continue")} <ArrowRight width={20} />
        </>
      )}
    </Button>
  );

  const calendarComponent = (
    <Calendar
      onChange={handleCalendarChange}
      value={calendarValue}
      selectRange
      disabled={isContinued}
    />
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">{t("title")}</p>
        </div>

        <div className="space-y-4">
          <SelectWithSearch
            onInputValue={handleInput}
            options={options}
            calendar={calendarComponent}
            cta={continueButton}
            defaultValue={inputValue}
            newStyle="z-[1]"
            disabled={isContinued}
          />

          {isContinued && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Input
                  Icon={User}
                  placeholder={t("yourName")}
                  value={nameOwner}
                  onChange={(e) => setNameOwner(e.target.value)}
                />
                <Input
                  Icon={Mail}
                  placeholder={t("yourEmail")}
                  type="email"
                  value={emailOwner}
                  onChange={(e) => setEmailOwner(e.target.value)}
                />
                <Input
                  Icon={UsersRound}
                  placeholder={
                    guests.length > 0
                      ? `${guests.length} ${t("membersInvited")}`
                      : t("whoGoing")
                  }
                  onFocus={() => setIsModalOpen(true)}
                  readOnly
                  value={
                    guests.length > 0
                      ? `${guests.length} ${t("membersInvited")}`
                      : ""
                  }
                />
              </div>

              <Button
                className="w-full max-w-sm mx-auto"
                colorScheme="primary"
                disabled={!nameOwner || !emailOwner || isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? t("confirming") : t("confirmTrip")}
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-500 mt-auto pb-4 px-6 text-center">
        {t("termsAgreement")}
        <a className="text-zinc-300 underline mx-1" href="#">
          {t("termsOfUse")}
        </a>{" "}
        {t("and")}
        <a className="text-zinc-300 underline mx-1" href="#">
          {t("privacyPolicy")}
        </a>
        .
      </p>

      <InviteMembers
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onGuestsChange={handleGuestsChange}
        guests={guests}
        hideTrigger={true}
      />
    </div>
  );
}
