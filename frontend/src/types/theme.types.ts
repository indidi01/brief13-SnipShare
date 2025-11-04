export type ThemeName = 'light' | 'dark' | 'nord' | 'cyber' | 'nature' | 'sunset';

export interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}