import { useState, useEffect } from 'react';

function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });

    useEffect(() => {
        const theme = dark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [dark]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setDark(prev => !prev)}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
        >
            {dark ? '\u2600' : '\uD83C\uDF19'}
        </button>
    );
}

export default ThemeToggle;
