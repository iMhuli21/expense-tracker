/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        "lightBlack": "#353535"
      },
      fontFamily:{
        "poppins":["Poppins", "sans-serif"],
        "shoju": ["Shojumaru", "cursive"]
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}

