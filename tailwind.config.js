/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0F0F12',
        card: '#1A1A1F',
        lavender: '#C4B5FD',
        mint: '#9EF0D5',
        coral: '#FFB4A2',
        blue: '#9FD8FF',
        peach: '#FFD3B4',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(196, 181, 253, 0.35)',
        mint: '0 0 30px rgba(158, 240, 213, 0.35)',
        coral: '0 0 30px rgba(255, 180, 162, 0.35)',
        soft: '0 20px 60px rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(18px)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 0.8 },
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        floatSlow: 'float 12s ease-in-out infinite',
        drift: 'drift 10s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
