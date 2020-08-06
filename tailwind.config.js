const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.liquid', './src/**/*.md'],
  theme: {},
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
