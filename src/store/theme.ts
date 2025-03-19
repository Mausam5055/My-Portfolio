import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

const defaultTheme = true; // Default to dark mode

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: defaultTheme,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Ensure theme is properly initialized
        if (state) {
          document.documentElement.classList.toggle('dark', state.isDark);
        }
        return state;
      },
    }
  )
);