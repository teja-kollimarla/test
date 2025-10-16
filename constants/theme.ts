export const ForiqenTheme = {
  colors: {
    primary: '#0A2540',
    secondary: '#003C46',
    accent1: '#00E0FF',
    accent2: '#00FF9C',
    accent3: '#FF7A00',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#C4C4C4',
    darkGray: '#1A1A2E',
    lightGray: '#E5E5E5',
  },
  gradients: {
    hero: ['#0A2540', '#003C46'],
    button: ['#00E0FF', '#FF7A00'],
    card: ['rgba(10, 37, 64, 0.6)', 'rgba(0, 60, 70, 0.4)'],
    glow: ['rgba(0, 224, 255, 0.3)', 'rgba(255, 122, 0, 0.3)'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    hero: 40,
  },
  shadows: {
    glow: {
      shadowColor: '#00E0FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 8,
    },
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
  },
} as const;

export type ForiqenThemeType = typeof ForiqenTheme;
