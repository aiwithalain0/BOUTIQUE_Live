import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: '#FDFBF7',
        sage: {
          light: '#E8EFE9',
          DEFAULT: '#8DA399',
          dark: '#2D4A3E',
        },
        forest: '#2D4A3E',
        charcoal: '#1C2826',
        slate: '#5A6B65',
        burgundy: '#6E2A32',
        mustard: '#C89B3C',
        plum: '#5C4A5E',
        terracotta: '#B5623A',
        stone: '#EDE6D6',
        brass: '#A47C48',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse at center, #E8EFE9 0%, #FDFBF7 70%)',
        'cta-green': 'linear-gradient(135deg, #2D4A3E 0%, #3E6152 100%)',
        'card-hover': 'linear-gradient(135deg, #6E2A32 0%, #C89B3C 100%)',
        'accent-hover': 'linear-gradient(90deg, #8DA399 0%, #2D4A3E 100%)',
        'footer-gradient': 'linear-gradient(180deg, #2D4A3E 0%, #1C2826 100%)',
        'divider': 'linear-gradient(90deg, transparent 0%, #A47C48 50%, transparent 100%)',
        'mustard-cta': 'linear-gradient(135deg, #C89B3C 0%, #A47C48 100%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-right': 'slide-right 0.6s ease-out forwards',
        'slide-left': 'slide-left 0.6s ease-out forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(45, 74, 62, 0.08)',
        'card-hover': '0 8px 32px rgba(45, 74, 62, 0.16)',
        'nav': '0 1px 24px rgba(28, 40, 38, 0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
