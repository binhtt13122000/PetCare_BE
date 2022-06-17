export const getStartAndEndDateInCurrentMonth = (): {
  firstDate: Date;
  lastDate: Date;
} => {
  const currentDate = new Date();
  return {
    firstDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    lastDate: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ),
  };
};

//add 7 hours(server GMT +0, local GMT +7)
export const getSpecificDateAgoWithNumberDays = (days: number): Date => {
  return new Date(
    new Date().getTime() + 7 * 60 * 60 * 1000 - days * 24 * 60 * 60 * 1000,
  );
};

export const getSpecificDateFutureWithNumberDays = (days: number): Date => {
  return new Date(
    new Date().getTime() + 7 * 60 * 60 * 1000 + days * 24 * 60 * 60 * 1000,
  );
};

export const formatDateCustomDateMonthYear = (date: Date): string => {
  const dateCustom = [
    ("0" + date.getDate()).slice(-2),
    ("0" + (date.getMonth() + 1)).slice(-2),
    date.getFullYear(),
  ].join("-");
  return dateCustom;
};
