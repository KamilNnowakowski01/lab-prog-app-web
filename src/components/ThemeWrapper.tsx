import { useThemeStore } from '../store/useThemeStore';

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  const bgClass = theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark';

  return (
    <div data-bs-theme={theme} className={`min-vh-100 ${bgClass}`}>
      {children}
    </div>
  );
};
