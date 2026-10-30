/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'jk-deep': '#140c08',
        'jk-mid': '#2a160f',
        'jk-card': '#fff6ea',
        'jk-gold': '#b45309',
        'jk-gold-soft': '#e8b86d',
        'jk-muted': '#7a5b45',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

