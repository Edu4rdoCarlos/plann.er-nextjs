'use client'

import { ConfirmTrip } from "@/src/components/compounds/Modal/ConfirmTrip/ConfirmTrip";
import { InviteMembers } from "@/src/components/compounds/Modal/InviteMember/InviteMember";
import { Button } from "@/src/components/primitives/Button/Button";
import { Calendar } from "@/src/components/primitives/Calendar/Calendar";
import { Input } from "@/src/components/primitives/Input/Input";
import { SelectWithSearch } from "@/src/components/primitives/Select/SelectWithSearch";
import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { ArrowRight, Settings2, User } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const { handleCalendarChange, calendarValue, handleInput, options, inputValue } = useTripProps();
    const [isContinued, setIsContinued] = useState(false);
    const [guests, setGuests] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleContinueClick = () => {
        if (inputValue && calendarValue) {
            setIsContinued(true);
        }
    };

    const handleAlterDateAndLocationClick = () => {
        setIsContinued(false);
        setGuests([]);
        setIsModalOpen(false);
        setIsConfirmModalOpen(false);
    };

    const handleGuestsChange = (newGuests: string[]) => {
        setGuests(newGuests);
    };

    const handleConfirmClick = () => {
        if (guests.length >= 2) {
            setIsConfirmModalOpen(true);
        }
    };

    const button = (
        <Button
            size="sm"
            colorScheme="secondary"
            className="w-fit"
            onClick={isContinued ? handleAlterDateAndLocationClick : handleContinueClick}
            disabled={!inputValue || !calendarValue}
        >
            {isContinued ? (
                <>
                    Alterar local/data <Settings2 width={20} />
                </>
            ) : (
                <>
                    Continuar <ArrowRight width={20} />
                </>
            )}
        </Button>
    );

    const calendar = (
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
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <div className="space-y-4">
                    <SelectWithSearch
                        onInputValue={handleInput}
                        options={options}
                        calendar={calendar}
                        cta={button}
                        defaultValue={inputValue}
                        newStyle="z-[1]"
                        disabled={isContinued}
                    />
                    {isContinued && (
                        <div className="mt-6">
                            <Input
                                Icon={User}
                                placeholder="Quem estará na viagem?"
                                onFocus={() => setIsModalOpen(true)}
                                readOnly
                                cta={
                                    <Button
                                        className="w-1/2"
                                        colorScheme="primary"
                                        onClick={handleConfirmClick}
                                        disabled={guests.length < 2} 
                                    >
                                        Confirmar viagem
                                    </Button>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>

            <p className="text-sm text-zinc-500 mt-6">
                Ao planejar sua viagem pela plann.er você automaticamente concorda com nossos 
                <a className="text-zinc-300 underline mx-1" href="#">termos de uso</a> e 
                <a className="text-zinc-300 underline mx-1" href="#">políticas de privacidade</a>.
            </p>

            <InviteMembers
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                onGuestsChange={handleGuestsChange}
                guests={guests}
                hideTrigger={true}
            />

            <ConfirmTrip
                location={inputValue || "local não definido"} 
                date={calendarValue?.toString() || "data não definida"} 
                open={isConfirmModalOpen}
                onOpenChange={setIsConfirmModalOpen}
            />
        </div>
    );
}
