/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-dark': '#46A302',
          'green-light': '#D7FFB8',
          blue: '#1CB0F6',
          'blue-dark': '#1899D6',
          'blue-light': '#DDF4FF',
          yellow: '#FFC800',
          'yellow-dark': '#E5A400',
          'yellow-light': '#FFF5CC',
          red: '#FF4B4B',
          'red-dark': '#EA2B2B',
          'red-light': '#FFDFE0',
          purple: '#CE82FF',
          'purple-dark': '#A558D6',
          'purple-light': '#F4E3FF',
          orange: '#FF9600',
          'orange-dark': '#E08200',
          gray: '#E5E5E5',
          'gray-dark': '#AFAFAF',
          'gray-border': '#E5E7EB',
          'dark-bg': '#131F24',
          'dark-card': '#202F36',
          'dark-border': '#37464F',
          'dark-text': '#FFFFFF',
          'dark-muted': '#9CA3AF'
        }
      },
      boxShadow: {
        'duo': '0 4px 0 #E5E5E5',
        'duo-green': '0 4px 0 #46A302',
        'duo-blue': '0 4px 0 #1899D6',
        'duo-yellow': '0 4px 0 #E5A400',
        'duo-red': '0 4px 0 #EA2B2B',
        'duo-purple': '0 4px 0 #A558D6',
        'duo-orange': '0 4px 0 #E08200',
        'duo-dark': '0 4px 0 #37464F',
        'duo-pressed': '0 0 0 #000'
      },
      borderRadius: {
        'duo': '16px'
      }
    },
  },
  plugins: [],
}

