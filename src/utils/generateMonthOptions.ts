export const generateMonthOptions = (): { label: string; value: number }[] => {
  const options = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(0, i);
    options.push({
      label: date.toLocaleString("default", { month: "long" }),
      value: i + 1,
    });
  }
  return options;
};
