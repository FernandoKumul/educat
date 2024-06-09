/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import tailwindcssForms from '@tailwindcss/forms'
import headlessui from '@headlessui/tailwindcss'

const primaryColor = {
  '50': '#f7f6fc',
  '100': '#f0eef9',
  '200': '#e3dff5',
  '300': '#cec6ec',
  '400': '#b5a4e1',
  '500': '#9a7fd3', 
  '600': '#845ec2', //Este es el dafeult
  '700': '#7751b0',
  '800': '#644394',
  '900': '#533979',
  '950': '#352451',
}

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      colors: {
        primary: {
          '50': '#f7f6fc',
          '100': '#f0eef9',
          '200': '#e3dff5',
          '300': '#cec6ec',
          '400': '#b5a4e1',
          '500': '#9a7fd3',
          '600': '#845ec2',
          '700': '#7751b0',
          '800': '#644394',
          '900': '#533979',
          '950': '#352451',
      },
      'secundary-text': '#E3DFE7',
      'details': '#FF87DD',
      'black-auth': '#312F35',
        tremor: {
          brand: {
            faint: '#0B1229',
            muted: primaryColor[950],
            subtle: primaryColor[800],
            DEFAULT: primaryColor[600],
            emphasis: primaryColor[400],
            inverted: "#FFF",
          },
          background: {
            muted: '#131A2B',
            subtle: colors.gray[800],
            DEFAULT: colors.gray[900],
            emphasis: colors.gray[300],
          },
          border: {
            DEFAULT: colors.gray[800],
          },
          ring: {
            DEFAULT: colors.gray[800],
          },
          content: {
            subtle: colors.gray[600],
            DEFAULT: colors.gray[500],
            emphasis: colors.gray[200],
            strong: colors.gray[50],
            inverted: colors.gray[950],
          },
        },
      },
      boxShadow: {
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'tremor-small': '0.375rem',
        'tremor-default': '0.5rem',
        'tremor-full': '9999px',
      },
      fontSize: {
        'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
        'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
        'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
        'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ['hover', 'ui-selected'],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    // ...["primary"].flatMap((customColor) => [
    //   `bg-${customColor}`,
    //   `border-${customColor}`,
    //   `hover:bg-${customColor}`,
    //   `hover:border-${customColor}`,
    //   `hover:text-${customColor}`,
    //   `fill-${customColor}`,
    //   `ring-${customColor}`,
    //   `stroke-${customColor}`,
    //   `text-${customColor}`,
    //   `ui-selected:bg-${customColor}`,
    //   `ui-selected:border-${customColor}`,
    //   `ui-selected:text-${customColor}`,
    // ]),    
  ],
  plugins: [headlessui, tailwindcssForms],
}
