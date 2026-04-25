export const getYAxisConfig = (colors: any) => ({
  labels: getLabel(colors),
});

export const getXAxisConfig = (colors: any) => ({
  categories: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  labels: getLabel(colors),
  axisBorder: {
    show: false,
  },
  axisTicks: {
    show: false,
  }

});

export const getLabel = (colors: any) => ({
  style: {
    colors: colors,
    fontFamily: "Inter",
  },
});

export const getGridConfig = (colors: any) => ({
  show: true,
  borderColor: colors,
  strokeDashArray: 10,
  position: "back",
});
