/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        fa: "#fafafa",
        brand: "#514B23",
        "brand-accent": "#CBC9AD",
        chat: "#F6F7F3",
        "chat-accent": "#F0F1E5",
      },
    },
  },
  plugins: [],
};
