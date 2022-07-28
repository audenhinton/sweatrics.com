const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}", "./styles/**/*"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rubik', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}