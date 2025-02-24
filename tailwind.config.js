/** @type {import('tailwindcss').Config} */

import x from "flowbite/plugin";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    x,
    flowbite.plugin(),
  ],
}

