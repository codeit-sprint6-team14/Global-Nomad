import type { Config } from 'tailwindcss'

const createPxObject = (range: number): Record<string, string> => {
  return Array.from({ length: range + 1 }).reduce<Record<string, string>>(
    (acc, _, i) => {
      acc[`${i}`] = `${i}px`
      return acc
    },
    {},
  )
}

const PX0_50 = createPxObject(50)
const PX0_100 = createPxObject(100)
const PX0_200 = createPxObject(200)
const PX0_1920 = createPxObject(1920)

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: PX0_50,
      fontSize: PX0_100,
      spacing: PX0_200,
      width: PX0_1920,
      height: PX0_1920,
      padding: PX0_1920,
      colors: {
        // 색상은 연한 순서부터(100) ~ 진한 순서로
        gray: {
          100: '#FAFAFA',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#CBC9CF',
          500: '#ADAEB8',
          600: '#A4A1AA',
          700: '#79747E',
          800: '#4B4B4B',
        },
        black: {
          DEFAULT: '#1B1B1B',
          100: '#112211', // Nomad black
        },
        green: {
          100: '#CED8D5',
          200: '#00AC07',
          300: '#0B3B2D',
        },
        red: {
          100: '#FFE4E0',
          200: '#FF472E',
        },
        orange: {
          100: '#FFF4E8',
          200: '#FF7C1D',
        },
        yellow: '#FFC23D',
        blue: {
          100: '#E5F3FF',
          200: '#2EB4FF',
          300: '#0085FF',
        },
      },
    },
  },
  plugins: [],
}
export default config
