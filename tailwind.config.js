/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#248BDA",
          "secondary": "#BD93F9",
          "accent": "#FFB86C",
          "neutral": "#8C9AA9",
          "base-100": "#293440",
          "base-200": "#202932",
          "base-300": "#293440",
          "info": "#8BE9FD",
          "success": "#50FA7B",
          "warning": "#F1FA8C",
          "error": "#FF5555",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}
