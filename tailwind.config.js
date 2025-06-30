/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant neutral base
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf4e8',
          300: '#f5ead5',
          400: '#eddbb8',
          500: '#e3c89a',
          600: '#d4b07a',
          700: '#c19660',
          800: '#a67c4a',
          900: '#8a653c',
        },
        // Soft sage green
        sage: {
          50: '#f7f9f7',
          100: '#eef2ee',
          200: '#dde5dd',
          300: '#c4d2c4',
          400: '#a5b8a5',
          500: '#8a9d8a',
          600: '#708270',
          700: '#5a6a5a',
          800: '#4a564a',
          900: '#3e473e',
        },
        // Blush pink
        blush: {
          50: '#fdf7f7',
          100: '#fbeaea',
          200: '#f6d5d5',
          300: '#efb5b5',
          400: '#e58a8a',
          500: '#d86464',
          600: '#c54747',
          700: '#a53838',
          800: '#8a3030',
          900: '#742d2d',
        },
        // Rose gold accent
        rosegold: {
          50: '#fdf8f6',
          100: '#fbeee8',
          200: '#f6ddd1',
          300: '#efc4b0',
          400: '#e5a082',
          500: '#d97d56',
          600: '#c8633a',
          700: '#a8502f',
          800: '#8a422a',
          900: '#713826',
        },
        // Soft lavender
        lavender: {
          50: '#faf9fc',
          100: '#f3f1f7',
          200: '#e8e4ef',
          300: '#d6cfe2',
          400: '#bfb2d1',
          500: '#a594bd',
          600: '#8d78a6',
          700: '#756289',
          800: '#625270',
          900: '#52455c',
        },
        // Charcoal for text
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
        },
        // Updated primary to sage
        primary: {
          50: '#f7f9f7',
          100: '#eef2ee',
          200: '#dde5dd',
          300: '#c4d2c4',
          400: '#a5b8a5',
          500: '#8a9d8a',
          600: '#708270',
          700: '#5a6a5a',
          800: '#4a564a',
          900: '#3e473e',
        },
        // Success in soft sage
        success: {
          50: '#f7f9f7',
          100: '#eef2ee',
          200: '#dde5dd',
          300: '#c4d2c4',
          400: '#a5b8a5',
          500: '#8a9d8a',
          600: '#708270',
          700: '#5a6a5a',
          800: '#4a564a',
          900: '#3e473e',
        },
        // Warning in soft gold
        warning: {
          50: '#fdf8f6',
          100: '#fbeee8',
          200: '#f6ddd1',
          300: '#efc4b0',
          400: '#e5a082',
          500: '#d97d56',
          600: '#c8633a',
          700: '#a8502f',
          800: '#8a422a',
          900: '#713826',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}