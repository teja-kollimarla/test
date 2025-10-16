module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        secondary: '#003C46',
        accent1: '#00E0FF',
        accent2: '#00FF9C',
        accent3: '#FF7A00',
        darkGray: '#1A1A2E',
        lightGray: '#E5E5E5',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
