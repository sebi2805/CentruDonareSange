import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    body: "Montserrat",
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: "darkThemeGrey.600",
        color: props.colorMode === "dark" ? "darkThemeGrey.100" : "black",
      },

      "*": {
        ".slick-prev:before,.slick-next:before": {
          color:
            props.colorMode === "dark"
              ? "darkThemeGrey.100"
              : "darkThemeGrey.700",
          margin: "5px",
        },

        ".slick-track": {
          marginLeft: 0,
          display: "flex",
        },

        "input[type=file]::-webkit-file-upload-button": {
          cursor: "pointer",
        },
        "::placeholder": {
          color:
            props.colorMode === "dark" ? "darkThemeGrey.700" : "neutralGrey",
        },
        "&::-webkit-scrollbar": {
          width: "5px",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          background:
            props.colorMode === "dark" ? "darkThemeGrey.700" : "white",
          border: `1px solid ${
            props.colorMode === "dark" ? "darkThemeGrey.700" : "neutralGrey"
          }`,
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          background:
            props.colorMode === "dark" ? "blue.400" : "darkThemeGrey.700",
          borderRadius: "10px",
        },
      },
    }),
  },
  colors: {
    neutralGrey: "#94A3B8",
    neutralDarkGrey: "#64748B",
    notificationsColor: {
      green: "#538135",
      yellow: "#c09206",
      red: "#ff0000",
      purple: "#7030a0",
    },
    blue: {
      100: "#eaecf8",
      200: "#c0c6e9",
      300: "#96a1db",
      400: "#6c7bcc",
      500: "#4255bd",
      600: "#334293",
      700: "#242f69",
      800: "#161c3f",
      900: "#070915",
    },
    danger: {
      100: "#fde5e9",
      200: "#f8b1be",
      300: "#f47d92",
      400: "#ef4967",
      500: "#ea153b",
      600: "#b6102e",
      700: "#820b21",
      800: "#4e0714",
      900: "#1a0207",
    },
    green: {
      100: "#e8faf3",
      200: "#b9f0dc",
      300: "#8be6c4",
      400: "#5cdcad",
      500: "#2dd296",
      600: "#23a374",
      700: "#197453",
      800: "#0f4632",
      900: "#051711",
    },
    warning: {
      100: "#fff8e3",
      200: "#feeaab",
      300: "#fddd74",
      400: "#fccf3c",
      500: "#fbc104",
      600: "#c39603",
      700: "#8b6b02",
      800: "#544001",
      900: "#1c1500",
    },
    darkThemeGrey: {
      100: "#f3f3f3",
      200: "#dcdcdc",
      300: "#c5c5c5",
      400: "#aeaeae",
      500: "#404040",
      600: "#282828",
      700: "#181818",
      800: "#121212",
    },
  },
});
