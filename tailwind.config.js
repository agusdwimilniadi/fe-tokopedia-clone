/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      primaryTPlay: '#E373FF',
      secondaryTPlay: '#1C1D1F',
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('flowbite/plugin')],
};
