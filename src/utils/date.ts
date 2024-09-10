const { format, isBefore } = require("date-fns");
const { ptBR } = require("date-fns/locale");

interface IDate {
  date: Date;
}

interface IRangeDate {
  startDate: Date;
  endDate: Date;
}

export const getHour = ({ date }: IDate) => {
  return format(date, "HH:mm'h'", {
    locale: ptBR,
  });
};

export const getDayOfWeek = ({ date }: IDate) => {
  return format(date, "EEEE", {
    locale: ptBR,
  });
};

export const getRangeDate = ({ startDate, endDate }: IRangeDate) => {
  if (!(startDate && endDate)) return "";
  const initialDate = new Date(startDate);
  const finalDate = new Date(endDate);

  const formattedStartDate = format(initialDate, "d", { locale: ptBR });
  const formattedEndDate = format(finalDate, "d 'de' MMMM", { locale: ptBR });

  return `${formattedStartDate} a ${formattedEndDate}`;
};

export const getDate = ({ date }: IDate) => {
  if (!date) return "";

  const formattedEndDate = format(new Date(date), "d 'de' MMMM", {
    locale: ptBR,
  });

  return formattedEndDate;
};

export const hasDatePassed = (dateDay: string): boolean => {
  const today = new Date();
  const targetDate = new Date(dateDay);

  return isBefore(targetDate, today);
};
