/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        canvas:         'var(--color-bg)',
        surface:        'var(--color-bg-card)',
        accent:         'var(--color-accent)',
        'accent-subtle':'var(--color-accent-bg)',
        'accent-ring':  'var(--color-accent-border)',
        line:           'var(--color-border)',
        ink:            'var(--color-text)',
        'ink-muted':    'var(--color-text-muted)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({ '.scrollbar-none': { '-ms-overflow-style': 'none', 'scrollbar-width': 'none', '&::-webkit-scrollbar': { display: 'none' } } });
    },
  ],
};
