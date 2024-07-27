import type { Config } from 'tailwindcss';

const createPxObject = (range: number): Record<string, string> => {
  return Array.from({ length: range + 1 }).reduce<Record<string, string>>(
    (acc, _, i) => {
      acc[`${i}`] = `${i}px`;
      return acc;
    },
    {},
  );
};

const PX0_50 = createPxObject(50);
const PX0_100 = createPxObject(100);
const PX0_200 = createPxObject(200);
const PX0_1920 = createPxObject(1920);

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: PX0_50,
      fontSize: {
        ...PX0_100,
        // 3xl
        '3xl-bold': ['32px', { lineHeight: '42px', fontWeight: '700' }],
        '3xl-semibold': ['32px', { lineHeight: '42px', fontWeight: '600' }],

        // 2xl
        '2xl-bold': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        '2xl-semibold': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '2xl-medium': ['24px', { lineHeight: '32px', fontWeight: '500' }],
        '2xl-regular': ['24px', { lineHeight: '32px', fontWeight: '400' }],

        // xl
        'xl-bold': ['20px', { lineHeight: '32px', fontWeight: '700' }],
        'xl-semibold': ['20px', { lineHeight: '32px', fontWeight: '600' }],
        'xl-medium': ['20px', { lineHeight: '32px', fontWeight: '500' }],
        'xl-regular': ['20px', { lineHeight: '32px', fontWeight: '400' }],

        // 2lg
        '2lg-bold': ['18px', { lineHeight: '26px', fontWeight: '700' }],
        '2lg-semibold': ['18px', { lineHeight: '26px', fontWeight: '600' }],
        '2lg-medium': ['18px', { lineHeight: '26px', fontWeight: '500' }],
        '2lg-regular': ['18px', { lineHeight: '26px', fontWeight: '400' }],

        // lg
        'lg-bold': ['16px', { lineHeight: '26px', fontWeight: '700' }],
        'lg-semibold': ['16px', { lineHeight: '26px', fontWeight: '600' }],
        'lg-medium': ['16px', { lineHeight: '26px', fontWeight: '500' }],
        'lg-regular': ['16px', { lineHeight: '26px', fontWeight: '400' }],

        // md
        'md-bold': ['14px', { lineHeight: '24px', fontWeight: '700' }],
        'md-semibold': ['14px', { lineHeight: '24px', fontWeight: '600' }],
        'md-medium': ['14px', { lineHeight: '24px', fontWeight: '500' }],
        'md-regular': ['14px', { lineHeight: '24px', fontWeight: '400' }],

        // sm
        'sm-semibold': ['13px', { lineHeight: '22px', fontWeight: '600' }],
        'sm-medium': ['13px', { lineHeight: '22px', fontWeight: '500' }],

        // xs
        'xs-semibold': ['12px', { lineHeight: '18px', fontWeight: '600' }],
        'xs-medium': ['12px', { lineHeight: '18px', fontWeight: '500' }],
        'xs-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
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
      screens: {
        sm: { min: '375px' },
        md: { min: '744px' },
        lg: { min: '1200px' },
      },
    },
  },
  plugins: [],
};
export default config;
