import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060910',
        brass: '#ad8f56',
        ivory: '#f5eee2',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(214,184,120,0.32), 0 16px 60px rgba(0,0,0,0.6)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
