/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/frontend-web/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
