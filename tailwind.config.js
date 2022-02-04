module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  
  theme: {
    extend: {
        screens: {
            'phone': {'max':'320px'},
            'big-phone': {'max':'480px'},

            'sm': '640px',
            // => @media (min-width: 640px) { ... }
      
            'md': '768px',
            // => @media (min-width: 768px) { ... }
      
            'lg': '1020px',
            // => @media (min-width: 1024px) { ... }
      
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
      
            '2xl': '1530px',
            // => @media (min-width: 1536px) { ... }
            '3xl': '1920px',

            '4xl': '2600px',
          },
        fontSize: {
            tiny: ['10px', '15px'],
            sm: ['14px', '20px'],
            base: ['16px', '24px'],
            lg: ['20px', '28px'],
            xl: ['24px', '32px'],
          },
          colors: {
              'mid-body':'#CEE8FF',
              'header':'#2A2231',
              'bottom-body':'#DDF0FF',
              'header-below':'rgba(68,55,79,0.6)'
          },
    },
  },
  plugins: [],
}
