module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      screens: {
        'small-device': { max: '786px' },
        phone: { max: '550px' },
      },
      fontSize: {
        tiny: ['10px', '15px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      colors: {
        'pure-red': '#B20230',
        'dark-purple': '#2A2231',
        'light-blue': '#DDF0FF',
        'medium-blue': '#3E6E99',
        'header-below': 'rgba(68,55,79,0.6)',
        'signing-label': '#11A770',
        'selected-button': '#B7CFE5',
        'light-green': '#11A770',
        'greyish-blue': '#718BA3',
        'attention-orange': '#F06543',
        'silver-blue': '#CEE8FF',
      },
      animation: {
        reveal: 'reveal 0.5s ease-in forwards',
        unreveal: 'unreveal 0.5s ease forwards',
      },
      keyframes: {
        reveal: {
          '100%': {
            transform: 'translateY(-125%)',
          },
        },
        unreveal: {
          '100%': {
            transform: 'translateY(90%)',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
