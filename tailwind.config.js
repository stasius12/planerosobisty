module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        '2xl': '10rem',
      },
    },
    fontFamily: {
      header: ['"Bebas Neue"'],
      body: ['"Raleway"'],
    },
    extend: {
      colors: {
        primary: '#fff72e',
      },
    },
    borderWidth: {
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
