const { format } = require("date-fns");
const { ptBR } = require("date-fns/locale");

interface IFormattedDate {
  label: string;
  date: Date;
}

interface IFormattedDateRange {
  startDate: Date;
  endDate: Date;
}

interface IDate {
  date: Date;
}

export const formattedDate = ({ label, date }: IFormattedDate) => {
  return format(date, label, {
    locale: ptBR,
  });
};

export const formattedDateSimple = ({ date }: IDate) => {
  return format(date, "dd/MM/yyyy", {
    locale: ptBR,
  });
};

export const formattedHour = ({ date }: IDate) => {
  return format(date, "HH:mm'h'", {
    locale: ptBR,
  });
};

export const formattedDateRange = ({
  startDate,
  endDate,
}: IFormattedDateRange) => {
  const startDay = format(startDate, "d", { locale: ptBR });
  const endDay = format(endDate, "d", { locale: ptBR });
  const month = format(startDate, "MMMM", { locale: ptBR });

  return `${startDay} à ${endDay} de ${month}`;
};
