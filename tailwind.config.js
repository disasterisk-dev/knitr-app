/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#ECBCC5",
          200: "#E094A3",
          300: "#D46B80",
          400: "#C9455F",
          500: "#AA3149",
        },
        bold: "#3D3D3D",
        subtle: "#707070",
        disabled: "#A8A8A8",
        "inverse-subtle": "#DBDBDB",
        inverse: "#FDFDFD",
      },
      fontFamily: {
        brand: ["Poppins", "serif"],
        body: ["Open Sans", "sans-serif"],
      },
      borderRadius: {
        inner: "8px",
        outer: "16px",
      },
      spacing: {
        sm: "8px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};
