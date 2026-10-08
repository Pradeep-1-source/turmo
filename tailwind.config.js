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
        terracotta: {
          DEFAULT: "#B05D41",
          hover: "#984C34",
          dark: "#7E3B25",
          light: "#F7EFEA",
        },
        navy: {
          dark: "#FAF8F5",
          deep: "#F5F0E8",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          border: "#E8E1D7",
          muted: "#78716C",
        },
        brand: {
          green: "#B05D41",
          lime: "#C86E53",
          emerald: "#10B981",
          light: "#FAF8F5",
          silver: "#292524",
          terracotta: "#B05D41",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'glow-green': '0 8px 25px -4px rgba(176, 93, 65, 0.35)',
        'glow-green-sm': '0 4px 15px -2px rgba(176, 93, 65, 0.25)',
        'card-dark': '0 10px 30px -10px rgba(40, 30, 20, 0.08)',
        'card-hover': '0 20px 40px -12px rgba(176, 93, 65, 0.16)',
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
