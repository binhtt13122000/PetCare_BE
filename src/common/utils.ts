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
