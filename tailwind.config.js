/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF7",
          100: "#FAF8F5",
          200: "#F4EFEA",
          300: "#EAE3D9",
          border: "#E8E1D7",
        },
        navy: {
          dark: "#03111F",
          deep: "#061A2B",
          surface: "#0A243D",
          card: "#081D33",
          border: "#1E3A5F",
          muted: "#CBD5E1",
        },
        brand: {
          green: "#62C914",
          lime: "#A8E600",
          emerald: "#10B981",
          light: "#F8FAFC",
          silver: "#E2E8F0",
          dark: "#17212B",
        },
        light: {
          bg: "#F8FAFC",
          card: "#FFFFFF",
          border: "#CBD5E1",
          primary: "#17212B",
          secondary: "#475569",
          muted: "#64748B",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(98, 201, 20, 0.4)',
        'glow-green-sm': '0 0 15px -3px rgba(98, 201, 20, 0.3)',
        'card-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'card-hover': '0 25px 50px -12px rgba(98, 201, 20, 0.15)',
        'focus-ring': '0 0 0 3px rgba(98, 201, 20, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
