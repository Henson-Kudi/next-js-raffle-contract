/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            mine: "rgba(210,210,210,0.2)",
            mine2: "red",
        },
    },
    plugins: [],
}
