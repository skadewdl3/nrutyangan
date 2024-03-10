import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#283C27',
      },
    },
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
    },
  },
}
