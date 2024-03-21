/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    backgroundImage: {
      'hero-pattern': "url('herobg.png')",
      'footer-texture': "url('/img/footer-texture.png')",
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'light gray': '#D9D9D9',
      'black':'#000000',
      darkslateblue: {
        "100": "#24306e",
        "200": "rgba(36, 48, 110, 0.7)",
      },
      gainsboro: "#d9d9d9",
      whitesmoke: "#f5f5f5",
      lightslategray: "#8f9bba",
      ghostwhite: "#f4f7fe",
    },
    spacing: {},
    fontFamily: {
      poppins: "Poppins",
      "dm-sans": "'DM Sans'",
    },
    borderRadius: {
      "6xl": "25px",
      "14xl-1": "33.1px",
      xl: "20px",
      "11xl": "30px",
    },
    fontSize: {
      base: "16px",
      "13xl": "32px",
      lgi: "19px",
      "7xl": "26px",
      inherit: "inherit",
    },
    screens: {
      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  }
};
export const plugins = [];
