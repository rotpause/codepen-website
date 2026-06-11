'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.css';

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mode');
        let isDark = false;
        
        if (savedTheme) {
            isDark = savedTheme === 'dark';
        } else {
            isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        setIsDarkMode(isDark);
    }, []);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    };

    const navLinks = [
        { href: '/works', label: 'Works' },
        { href: '/bio', label: 'Bio' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' }
    ];

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="main-header" id="header">
            <nav className="nav-container">
                <Link
                    href="/"
                    className="nav-brand"
                    onClick={closeMenu}
                >
                    Living Archive
                </Link>

                {/* Hamburger Button - Mobile Only */}
                <button 
                    className="burger-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Off-canvas Menu */}
                <div className={`nav-menu-offcanvas ${isMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="nav-link"
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Menu */}
                <div className="nav-menu" id="navMenu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="nav-link"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-controls">
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
