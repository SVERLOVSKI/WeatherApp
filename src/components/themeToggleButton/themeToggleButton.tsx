import { useState } from 'react';
import './themeToggleButton.css'; // Импортируем CSS файл для стилей

interface ThemeToggleButtonProps {
  darkTheme: boolean
  setDarkTheme: (value: boolean) => void
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ darkTheme, setDarkTheme }) => {
  const [isToggled, setIsToggled] = useState<boolean>(!darkTheme);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    setDarkTheme(!darkTheme)

    document.body.classList.toggle('dark')
  };

    return (
        <div className="theme-toggle-button">
            <div className={isToggled ? "toggle-button light" : 'toggle-button dark'} onClick={handleToggle}>
                <div className={`circle ${isToggled ? 'active' : ''}`}></div>
            </div>
            <div className="active-theme">{isToggled ? 'Светлая тема' : 'Темная тема'}</div>
        </div>
    );
};

export default ThemeToggleButton