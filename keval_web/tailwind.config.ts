// keval_web/tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        kevalgreen: {
          500: '#00A69C',
        },
        kevalgray: {
          500: '#7F7F7F',
        },
        kevalorange: {
          500: '#F6921E',
        },
      }
    }
  }
}