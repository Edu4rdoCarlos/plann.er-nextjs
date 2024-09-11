'use client';

import { InviteMembers } from "@/src/components/compounds/Modal/InviteMember/InviteMember";
import { Button } from "@/src/components/primitives/Button/Button";
import { Calendar } from "@/src/components/primitives/Calendar/Calendar";
import { Input } from "@/src/components/primitives/Input/Input";
import { SelectWithSearch } from "@/src/components/primitives/Select/SelectWithSearch";
import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { ArrowRight, Mail, Settings2, User, UsersRound } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const { handleCalendarChange, calendarValue, handleInput, options, inputValue } = useTripProps();
    const [isContinued, setIsContinued] = useState(false);
    const [guests, setGuests] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nameOwner, setNameOwner] = useState<string>();
    const [emailOwner, setEmailOwner] = useState<string>();

    const handleContinueClick = () => {
        if (inputValue && calendarValue) {
            setIsContinued(true);
        }
    };

    const handleAlterDateAndLocationClick = () => {
        setIsContinued(false);
        setGuests([]);
        setIsModalOpen(false);
    };

    const handleGuestsChange = (newGuests: string[]) => {
        setGuests(newGuests);
    };

    const handleSubmit = async () => {
        
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
                        <>
                        <div className="mt-6">
                            <Input
                                Icon={User}
                                placeholder="Seu nome completo"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameOwner(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <Input
                                Icon={Mail}
                                placeholder="Seu e-mail"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailOwner(e.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                        <Input
                            Icon={UsersRound}
                            placeholder={guests.length > 0 ? `${guests.length} membro(s) adicionado(s)` : "Quem estará na viagem?"}
                            onFocus={() => setIsModalOpen(true)}
                            readOnly
                            cta={
                                <Button
                                className="w-1/2"
                                colorScheme="primary"
                                disabled={guests.length < 1}
                                onClick={handleSubmit}  // Add this line
                                >
                                Confirmar viagem
                                </Button>
                            }
                        />
                        </div>
                        </>
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
        </div>
    );
}
