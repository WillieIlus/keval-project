// keval_web/tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        kevalgreen: {
          DEFAULT: '#00A69C',
          50: '#e6f7f5',
          100: '#ccf0ed',
          200: '#99e1db',
          300: '#66d2c9',
          400: '#33c3b6',
          500: '#00A69C',
          600: '#008e86',
          700: '#00766f',
          800: '#005e58',
          900: '#004641'
        },
        kevalgray: {
          DEFAULT: '#7F7F7F',
          400: '#9b9b9b',
          500: '#7F7F7F',
          600: '#666666'
        },
        kevalorange: {
          DEFAULT: '#F6921E',
          50: '#fff3e6',
          100: '#ffe1bf',
          200: '#ffc784',
          300: '#ffac4a',
          400: '#f79d33',
          500: '#F6921E',
          600: '#d97d12',
          700: '#b8680f',
          800: '#8f520c',
          900: '#6a3e09'
        },
      }
    }
  }
}