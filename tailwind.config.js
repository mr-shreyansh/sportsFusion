/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
      extend: {
          boxShadow: {
              'dark-shadow': ' 1px 20px 500px -70px rgba(9,165,127,0)',
          },
          width: {
              78: '19.5rem',
              90: '23.5rem',
              100: '25rem',
              default: '73.5rem',
              '60rem': '60rem',
          },
          space: {},

          borderRadius: {
              '32px': '32px',
              '20px': '20px',
          },
          colors: {
              'primary-black': '#1B2022',
              primary: '#31C1BF',
              'primary-hover': '#3ab1ab',
              'primary-blue': '#2D9CDB',
              'primary-Blue/neutral': '#EBFFFE',
              'primary-gray': '#707E85',
              'primary-dark': '#1B2022',
              'Primary-Blue/50': '#D6F3F2',
              'secondary-gray': '#404B51',
              'disable-gray': '#abb7bd',
              'disable-gray-bg': '#e7ecef',
              'blue-sky-light': '#D0EEFF',
              'blue-sky-dark': '#2783B8',
              'sky-blue-main': '#2D9CDB',
              discord: '#4860B9',
              'light-gray': '#F4F4F4',
              'gray-1': '#E2E2E2',
              'medium-gray': '#8D8F90',
              'text-gray1': '#1B2022',
              'bg-gray': '#F8FAFA',
              'greys-100': '#F4F4F4',
              'greys-500': '#8D8F90',
              'greys-200': '#E2E2E2',
              'greys-900': '#323638',
              'greys-600': '#76797A',
              'primary-border': '#E7ECEF',
              'primary-border-2': '#C8CFD3',
              'light-yellow': '#FFFACF',
              'dark-yellow': '#FFB400',
              'dark-blue': '#2783B8',
              'light-blue': '#D0EEFF',
              'sky-blue-neutral': '#EAF5FB',
              'warning-dark': '#BE8600',
              green1: '#09A57F',
              'primary-main': {
                  50: 'var(--primary-main-50)',
                  100: 'var(--primary-main-100)',
                  200: 'var(--primary-main-200)',
                  300: 'var(--primary-main-300)',
                  400: 'var(--primary-main-400)',
                  500: 'var(--primary-main-500)',
                  600: 'var(--primary-main-600)',
                  700: 'var(--primary-main-700)',
                  800: 'var(--primary-main-800)',
                  900: 'var(--primary-main-900)',
                  950: 'var(--primary-main-950)',
              },
              'neutral-greys': {
                  950: 'var(--neutral-greys-950)',
                  900: 'var(--neutral-greys-900)',
                  800: 'var(--neutral-greys-800)',
                  700: 'var(--neutral-greys-700)',
                  600: 'var(--neutral-greys-600)',
                  500: 'var(--neutral-greys-500)',
                  400: 'var(--neutral-greys-400)',
                  300: 'var(--neutral-greys-300)',
                  200: 'var(--neutral-greys-200)',
                  100: 'var(--neutral-greys-100)',
                  50: 'var(--neutral-greys-50)',
                  0: 'var(--neutral-greys-0)',
                  tooltip: 'var(--neutral-greys-tooltip)',
              },
              'system-success': {
                  50: 'var(--system-success-50)',
                  500: 'var(--system-success-500)',
                  950: 'var(--system-success-950)',
              },
              'system-error': {
                  50: 'var(--system-error-50)',
                  500: 'var(--system-error-500)',
                  950: 'var(--system-error-950)',
                  100: 'var(--system-error-100)',
                  200: 'var(--system-error-200)',
                  300: 'var(--system-error-300)',
              },
              'system-warning': {
                  50: 'var(--system-warning-50)',
                  500: 'var(--system-warning-500)',
                  550: 'var(--system-warning-550)',
                  950: 'var(--system-warning-950)',
              },
              dark: {
                  primary: '#101010',
                  secondary: '#323638',
                  tertiary: '#494D4E',
                  text: '#FFFFFF',
                  shadow: '#09A57F',
              },
              error: {
                  color: '#FFE3E1',
                  color2: '#DF320C',
              },
              success: {
                  light: '#E4FFF2',
                  normal: '#09A57F',
              },
          },
          fontFamily: {
              sbold: 'MessinaSans-SemiBold',
              smedium: 'MessinaSans-Regular',
              sansBold: 'MessinaSans-Bold',
          },

          screens: {
              'demeter-sm': '390px',
              'demeter-md': '688px',
              'demeter-lg': '1040px',
              'demeter-xl': '1120px',
          },
      },
  },
  plugins: [require('tailwind-scrollbar')],
}
