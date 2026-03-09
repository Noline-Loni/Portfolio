/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#353535',
          deep: '#1F1F1F',
          secondary: '#2A2A2A',
          tertiary: '#404040',
          elevated: '#4A4A4A',
        },
        content: {
          DEFAULT: '#F5F5EF',
          secondary: '#D5D5D5',
          tertiary: '#8A8A8A',
        },
        accent: {
          DEFAULT: '#FB7751',
          hover: '#E8603A',
          light: 'rgba(251, 119, 81, 0.15)',
        },
        stroke: {
          DEFAULT: '#4A4A4A',
          subtle: '#3D3D3D',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.5rem', { lineHeight: '1.3' }],
        '2xl': ['2rem', { lineHeight: '1.2' }],
        '3xl': ['3rem', { lineHeight: '1.1' }],
        '4xl': ['4rem', { lineHeight: '1.05' }],
        'display': ['clamp(2.5rem, 7vw, 6rem)', { lineHeight: '1.0' }],
        'display-lg': ['clamp(3rem, 10vw, 9rem)', { lineHeight: '0.95' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
