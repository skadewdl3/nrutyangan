import type { Config } from 'tailwindcss'

export const stylusVars = {
  accentColor: '#10ac84',
  accentBlue: '#2980b9',
  bodyColor: '#000',
  textColor: '#d2dae2',
  headingFont: `'Montserrat', 'Roboto', sans-serif`,
  textFont: `'Inter', 'Open Sans', sans-serif`,
  serifFont: `'Noto Serif', 'Georgia', serif`,
}

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        accent: stylusVars.accentColor,
        text: stylusVars.textColor,
        body: stylusVars.bodyColor,
      },
    },
    fontFamily: {
      heading: [stylusVars.headingFont],
      body: [stylusVars.textFont],
      serif: [stylusVars.serifFont],
    },
  },
}
