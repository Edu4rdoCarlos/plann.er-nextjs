"use client";

import { useTripProps } from "@/src/hooks/trip/useTripProps";
import { useTrip } from "@/src/hooks/useTrip";
import { useToast } from "@/src/providers/ToastProvider";
import { ITrip, IUpdateTrip } from "@/src/types/trip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../primitives/Button/Button";
import { Calendar, CalendarValue } from "../../primitives/Calendar/Calendar";
import { SelectWithSearch } from "../../primitives/Select/SelectWithSearch";

const editTripSchema = z.object({
    destination: z.string().min(3, "O destino é obrigatório."),
    dates: z.custom<CalendarValue>(
        (val) => Array.isArray(val) && val[0] && val[1],
        "Selecione um período de datas válido."
    ),
});

type EditTripFormData = z.infer<typeof editTripSchema>;

interface EditTripFormProps {
    trip: ITrip;
    onSuccess: () => void;
}

export const EditTripForm = ({ trip, onSuccess }: EditTripFormProps) => {
    const t = useTranslations("tripDetails");
    const { showToast } = useToast();
    const { mutateAsync: updateTrip, isLoading } = useTrip.Update();
    const { handleInput, options } = useTripProps();

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<EditTripFormData>({
        resolver: zodResolver(editTripSchema),
        defaultValues: {
            destination: `${trip.city}, ${trip.country}`,
            dates: [new Date(trip.startDate), new Date(trip.endDate)],
        },
    });

    const handleUpdateTrip = async (data: EditTripFormData) => {
        if (!Array.isArray(data.dates) || !data.dates[0] || !data.dates[1]) {
            return;
        }
        const payload: IUpdateTrip = {
            city: data.destination.split(',')[0]?.trim(),
            country: data.destination.split(',')[1]?.trim(),
            startDate: data.dates[0].toISOString(),
            endDate: data.dates[1].toISOString(),
        };
        try {
            await updateTrip({ formData: payload, id: trip.id });
            showToast("Viagem atualizada com sucesso!", "success");
            onSuccess();
        } catch (error) {
            showToast("Erro ao atualizar a viagem.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleUpdateTrip)} className="space-y-4">
            <Controller
                name="destination"
                control={control}
                render={({ field: destinationField }) => (
                    <Controller
                        name="dates"
                        control={control}
                        render={({ field: datesField }) => (
                            <SelectWithSearch
                                defaultValue={destinationField.value}
                                options={options}
                                onInputValue={(value) => {
                                    destinationField.onChange(value);
                                    handleInput(value);
                                }}
                                calendar={
                                    <Calendar
                                        key={JSON.stringify(datesField.value)}
                                        value={datesField.value}
                                        onChange={datesField.onChange}
                                        selectRange
                                    />
                                }
                            />
                        )}
                    />
                )}
            />

            {errors.destination && <p className="text-sm text-red-400 -mt-2">{errors.destination.message}</p>}
            {errors.dates && <p className="text-sm text-red-400 -mt-2">{errors.dates.message}</p>}

            <div className="pt-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("saving") : t("saveEdit")}
                </Button>
            </div>
        </form>
    );
};