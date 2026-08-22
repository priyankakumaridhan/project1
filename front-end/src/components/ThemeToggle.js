import React, { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

const readStored = () => {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const systemTheme = () =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => readStored() || systemTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (readStored() || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const onChange = (event) => setTheme(event.matches ? 'dark' : 'light');
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const toggle = useCallback(() => {
        setTheme((current) => {
            const next = current === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch {
                /* storage unavailable — the attribute still updates for this session */
            }
            return next;
        });
    }, []);

    const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;

    return (
        <button
            type="button"
            className="btn btn--icon"
            onClick={toggle}
            aria-label={label}
            title={label}
        >
            <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span>
        </button>
    );
};

export default ThemeToggle;
