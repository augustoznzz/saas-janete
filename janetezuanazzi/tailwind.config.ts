import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pinkLight: '#F9F4F4',
          pink: '#D99898',
          pinkMuted: '#D9B3B3',
          text: '#121212',
          cream: '#FFF8F5',
          white: '#FFFFFF',
        }
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '3rem',
        },
      },
    },
    fontFamily: {
      serif: ['var(--font-serif)'],
      sans: ['var(--font-sans)'],
    },
  },
  plugins: [],
};

export default config;

