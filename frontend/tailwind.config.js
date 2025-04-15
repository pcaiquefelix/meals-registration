/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      navtransition: "950px",
      maintransition: "860px",
    },
    extend: {
      width: {
        "form-default": "42rem"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        "navbar-max": "20% 60% 20%",
        "navbar-mobile": "20% 80%",
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '-webkit-appearance': 'none',
          'margin': '0',
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
          },
          '&': {
            '-moz-appearance': 'textfield',
          },
        },
      });
    }),
  ],
};
