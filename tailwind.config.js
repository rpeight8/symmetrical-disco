/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          200: "#FFE7E3",
          300: "#F9E1D9",
          400: "#F4D2C7",
          500: "#EDC7B7",
          550: "#DCC1BD",
          600: "#CBA59F",
          700: "#B08B7D",
        },
        secondary: {
          200: "#F6F0E3",
          300: "#EAE0C9",
          400: "#F1E9D7",
          500: "#EEE2CD",
          600: "#C9B6A9",
          700: "#8F6F55",
          disabled: {
            500: "#F3EAD4",
            600: "#D9CEB9",
          },
        },
        tertiary: "#BAB2B5",
        "primary-complimentary": {
          400: "#3D6B8E",
          500: "#123C69",
          600: "#0F2F4A",
          700: "#0A2232",
        },
        "secondary-comlimentary": "#AC3B61",
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        slideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: "slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        slideUp: "slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
