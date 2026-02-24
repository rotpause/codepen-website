'use client';

import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
    const [language, setLanguage] = useState<'en' | 'de'>('en');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mode');
        let isDark = false;
        
        if (savedTheme) {
            isDark = savedTheme === 'dark';
        } else {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        setIsDarkMode(isDark);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    };

    const navLinks = [
        { href: '#works', section: 'works', textEn: 'Works', textDe: 'Arbeiten' },
        { href: '#about', section: 'about', textEn: 'About', textDe: 'Über mich' }
    ];

    const getNavText = (textEn: string, textDe: string) => {
        return language === 'en' ? textEn : textDe;
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'de' : 'en');
    };

    return (
        <header className="main-header" id="header">
            <nav className="nav-container">
                <a 
                    href="#home" 
                    className="nav-brand"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    main(logo)
                </a>

                <div className="nav-menu" id="navMenu">
                    {navLinks.map((link) => (
                        <a
                            key={link.section}
                            href={link.href}
                            className="nav-link"
                            data-section={link.section}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(link.section);
                                element?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {getNavText(link.textEn, link.textDe)}
                        </a>
                    ))}
                </div>

                <div className="nav-controls">
                    <button className="lang-toggle" id="langToggle" title="Toggle Language" onClick={toggleLanguage}>
                        <i className="fas fa-language"></i>
                        <span className="lang-text">{language === 'en' ? 'DE' : 'EN'}</span>
                    </button>
                    <div className="theme-toggle-switch" id="themeToggle" title="Toggle Theme" onClick={toggleTheme}>
                        <button 
                            className={`theme-option ${!isDarkMode ? 'active' : ''}`}
                            title="Light Mode"
                        >
                            <i className="fas fa-sun"></i>
                        </button>
                        <button 
                            className={`theme-option ${isDarkMode ? 'active' : ''}`}
                            title="Dark Mode"
                        >
                            <i className="fas fa-moon"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
