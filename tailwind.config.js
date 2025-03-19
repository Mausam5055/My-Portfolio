/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AMOLED Theme Palette
        'amoled-black': '#000000',
        'amoled-white': '#FFFFFF',
        'amoled-gray': '#B0B0B0',
        'amoled-accent': '#7C3AED', // Primary accent
        'amoled-accent-light': '#9F7AEA', // Secondary accent
        'amoled-border': 'rgba(255, 255, 255, 0.1)',
        'amoled-overlay': 'rgba(0, 0, 0, 0.7)',

        // Existing color palettes
        pink: {
          50: '#fdf2f8',
          // ... keep existing pink scale
        },
        green: {
          50: '#f0fdf4',
          // ... keep existing green scale
        },
      },
      boxShadow: {
        'amoled': '0 4px 24px -2px rgba(124, 58, 237, 0.15)',
        'amoled-section': '0 0 20px 2px rgba(124, 58, 237, 0.1)',
        'amoled-inner': 'inset 0 2px 4px 0 rgba(124, 58, 237, 0.1)'
      },
      animation: {
        'neon-pulse': 'neonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'amoled-glow': 'amoledGlow 3s ease-in-out infinite'
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': { 
            opacity: '1', 
            filter: 'drop-shadow(0 0 4px rgba(124, 58, 237, 0.5))' 
          },
          '50%': { 
            opacity: '0.8', 
            filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.7))' 
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        amoledGlow: {
          '0%, 100%': { 
            opacity: '0.4',
            backgroundPosition: '0% 50%'
          },
          '50%': { 
            opacity: '0.6',
            backgroundPosition: '100% 50%'
          }
        }
      },
      backgroundImage: {
        'amoled-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(0,0,0,0) 50%, rgba(124,58,237,0.1) 100%)'
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.amoled-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.05)'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(124, 58, 237, 0.3)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(124, 58, 237, 0.5)'
            }
          }
        }
      })
    }
  ]
};