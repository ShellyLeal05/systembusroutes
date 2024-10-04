module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Inclui todos os arquivos da pasta src para purgar CSS não utilizado
    './src/index.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#28a745',
        secondary: '#1f2937',
        background: '#f8fafc',
      },
      fontFamily: {
        sans: ['Ubuntu', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'city-logo': "url('/path/to/logo_boa_vista.png')",
      },
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 15px rgba(0, 0, 0, 0.3)',
      },
      screens: {
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
