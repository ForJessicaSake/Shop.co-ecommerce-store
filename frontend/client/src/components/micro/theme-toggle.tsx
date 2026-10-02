import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../lib/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const nextLabel = isDark ? "Light" : "Dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextLabel.toLowerCase()} mode`}
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors duration-200 hover:text-ink"
    >
      {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
      {nextLabel}
    </button>
  );
};

export default ThemeToggle;
