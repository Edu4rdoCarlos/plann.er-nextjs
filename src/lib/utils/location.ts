interface IFormatLocation {
  city: string;
  acronym: string;
}

export const FormatLocation = ({ city, acronym }: IFormatLocation) => {
  const formattedCity =
    city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  const formattedAcronym = acronym.toUpperCase();
  return [formattedCity, formattedAcronym].join(", ");
};
