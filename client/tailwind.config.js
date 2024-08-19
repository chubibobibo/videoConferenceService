/** material tailwind */
import withMT from "@material-tailwind/react/utils/withMT";

/**@withMt wraps around the tailwind config */
/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
