import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  isChanging: boolean;
  toggleTheme: () => void;
}

const defaultTheme = true; // Default to dark mode

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: defaultTheme,
      isChanging: false,
      toggleTheme: () => {
        set({ isChanging: true });
        setTimeout(() => {
          set((state) => ({ isDark: !state.isDark }));
          setTimeout(() => {
            set({ isChanging: false });
          }, 300); // Duration slightly longer than animation
        }, 100);
      },
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