/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F7F9',
        'secondary-background': '#F5F7FB',
        surface: '#FFFFFF',
        'surface-muted': '#F3F4F6',
        primary: '#000000',
        secondary: 'rgba(0, 0, 0, 0.6)',
        accent: '#111111',
        'accent-muted': '#E3C393',
        destructive: '#C00000',
        success: '#2E7D32',
        'warning-bg': '#FFF3C4',
        'success-bg': '#D8F5D4',
        overlay: 'rgba(0, 0, 0, 0.35)',
        brand: {
          50: '#f5f7fa',
          100: '#e4e7eb',
          200: '#cbd2d9',
          300: '#9aa5b1',
          400: '#7b8794',
          500: '#616e7c',
          600: '#52606d',
          700: '#3e4c59',
          800: '#323f4b',
          900: '#1f2933',
        }
      }
    },
  },
  plugins: [],
}
