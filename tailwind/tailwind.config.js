module.exports = {
  purge: ["./src/css/*.css", "./src/templates/**/*.html", "./src/js/*.js"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        'grey': '#555'
      })
    },
  },
  variants: {
    extend: {},
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [],
}
