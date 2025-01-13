const THEME = {
  colors: {
    while: "#fff",
    grayBy: "#e5e5e5",

    primary: "#2A4D50",
    secondary: "#DDF0FF",
    tertiary: "#FF7754",

    gray: "#83829A",
    gray2: "#C1C0C8",

    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: "#5B4",
    green2: "#00C135",
    green3: "#0e8e16",
    lightWhite: "#FAFAFC",

    // neutral
    neutral: (opacity: any) => `rgba(10, 10, 10, ${opacity})`,
  },

  font_weights: { 
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  sizes: { 
    xSmall: 10,
    small: 14,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 44,
  },
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  }
}

export const themes = { THEME, SHADOWS };
