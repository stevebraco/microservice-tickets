// import type { Config } from "tailwindcss";

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          100: '#FFFFFF',
          200: '#33D69F',
          300: '#FF8F00',
          400: '#888EB0',
          500: '#FFF1E6',
          600: '#7C5DFA',
          700: '#373B53',
          800: '#FFF1E6',
        },
        dark: {
          100: '#000000',
          200: '#0F1117',
          300: '#151821',
          400: '#212734',
          500: '#101012',
          600: '#1E2139',
          700: '#DFE3FA',
        },
        light: {
          200: '#7E88C3',
          300: '#858BB2',
          400: '#F8F8FB',
        },
        danger: '#EC5757',
        'accent-blue': '#1DA1F2',
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        spaceGrotesk: ['var(--font-spaceGrotesk)'],
      },
      boxShadow: {
        'light-100': '0px -35px 73px -1px rgba(204,204,204,0.63)',
        'dark-100': '0px -35px 73px -1px rgb(15 15 15 / 63%)',
      },
      backgroundImage: {
        'auth-dark': "url('/assets/images/auth-dark.png')",
        'auth-light': "url('/assets/images/auth-light.png')",
      },
      // screens: {
      //   xs: "420px",
      // },
      keyframes: {
        'accordion-down': {
          // @ts-ignore
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          // @ts-ignore
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  //   plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
export default config;
