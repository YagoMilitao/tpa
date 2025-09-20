/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111827',
          accent: '#F59E0B' // amarelo para "NEW"
        }
      },
      keyframes: {
        avatarIn: {
          '0%': { opacity: 0, transform: 'translateY(12px) scale(.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' }
        }
      },
      animation: {
        avatarIn: 'avatarIn 420ms cubic-bezier(.2,.9,.2,1)'
      }
    }
  },
  plugins: []
}
