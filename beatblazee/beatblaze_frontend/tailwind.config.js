/** @type {import('tailwindcss').Config} */
export default {
  content: [// it indicates where it will look for tailwind config here it's index.html and all the files inside src directory with the given extensions
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "1/10": "10%",
        "9/10": "90%",
    },
    },
  },
  plugins: [],
}