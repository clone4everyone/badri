/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 12s linear infinite',
          'pulse-slow': 'pulse 5s ease-in-out infinite',
          'drawing': 'draw 4s ease-in-out forwards',
          'infinite-glow': 'glow 5s infinite',
          'shift': 'colorShift 3s ease infinite',
          'shock': 'shockwave 1.5s ease-out infinite',
          'scale-up': 'scaleUp 2s ease-out',
        },
        keyframes: {
          spin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          scaleUp: {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(5)' },
          },
          pulse: {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.1)' },
            '100%': { transform: 'scale(1)' },
          },
          draw: {
            '0%': { strokeDashoffset: 2000 },
            '100%': { strokeDashoffset: 0 },
          },
          glow: {
            '0%': { filter: 'blur(0px)', opacity: '1' },
            '50%': { opacity: '0.8' },  // Increased blur and opacity
            '100%': { filter: 'blur(0px)', opacity: '1' },
          },
          colorShift: {
            '0%': { stroke: '#F4BE85' },
            '25%': { stroke: '#FF007F' },
            '50%': { stroke: '#00FF7F' },
            '75%': { stroke: '#7FFF00' },
            '100%': { stroke: '#F4BE85' },
          },
          shockwave: {
            '0%': { transform: 'scale(1)', opacity: '1' },
            '50%': { transform: 'scale(1.2)', opacity: '0.5' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
      }
    },
    plugins: [],
  };
  