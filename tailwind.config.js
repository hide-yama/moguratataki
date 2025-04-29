/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gold-glow-ring': 'gold-glow 1s ease-in-out infinite',
      },
      keyframes: {
        'gold-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(234, 179, 8, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(234, 179, 8, 0)' },
        }
      }
    },
  },
  plugins: [],
};
