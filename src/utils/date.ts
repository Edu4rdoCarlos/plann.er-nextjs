const { format } = require("date-fns");
const { ptBR } = require("date-fns/locale");

interface IDate {
  date: Date;
}

export const getHour = ({ date }: IDate) => {
  return format(date, "HH:mm'h'", {
    locale: ptBR,
  });
};

export const getDay = ({ date }: IDate) => {
  return format(date, "D", {
    locale: ptBR,
  });
};

export const getDayOfWeek = ({ date }: IDate) => {
  return format(date, "D", {
    locale: ptBR,
  });
};
