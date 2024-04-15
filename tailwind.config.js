/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/bg.jpg')",
      },
      aspectRatio: {
        ratioxl: "483 / 483",
      },
    },
  },
  plugins: [],
};
