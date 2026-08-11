/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F8F6F2',
          soft: '#F2EFE8',
          deep: '#EDE8DE',
        },
        olive: {
          DEFAULT: '#556B4F',
          light: '#7C8F6F',
          dark: '#3E4E3A',
          50: '#F1F4EF',
        },
        ink: {
          DEFAULT: '#171717',
          soft: '#3A3A38',
          faint: '#6B6A64',
        },
        line: '#DFDACD',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1440px',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(23,23,23,0.04), 0 12px 32px -12px rgba(23,23,23,0.12)',
        cardHover: '0 1px 2px rgba(23,23,23,0.06), 0 24px 48px -16px rgba(23,23,23,0.2)',
        glass: '0 8px 32px rgba(23,23,23,0.08)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
