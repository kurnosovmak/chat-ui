/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF9447',
        'black-light': '#2C2C2C',
        // 'primary': '#ff8229',
        'primary-dark': '#ec6b0d',
        'field-primary': '#EFF1F3',
        'field-primary-border': '#e8e8e8',

        'white-dark': '#F4F7F9',

        'error': '#FF4B4B',
      },
    },
  },
  plugins: [],
}

