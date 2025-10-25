import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SailingIcon from '@mui/icons-material/Sailing';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import InfoIcon from '@mui/icons-material/Info';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Layout = ({ children }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Close mobile menu when switching to desktop
            if (!mobile && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);

        // Prevent body scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavClick = (path) => {
        setMobileMenuOpen(false);
        navigate(path);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    const navItems = [
        { path: '/', label: 'Home', icon: <HomeIcon /> },
        { path: '/book-series', label: 'Book Series', icon: <MenuBookIcon /> },
        { path: '/about', label: 'About', icon: <InfoIcon /> },
        { path: '/donation', label: 'Support the Crew', icon: <LocalAtmIcon />, highlight: true }
    ];

    const socialLinks = [
        {
            href: 'https://www.facebook.com/profile.php?id=61569913277354',
            icon: <FacebookIcon />,
            label: 'Facebook'
        },
        {
            href: 'https://www.instagram.com/the_voyages_of_victora/profilecard/?igsh=eHUxd2J5MDNsMmh4',
            icon: <InstagramIcon />,
            label: 'Instagram'
        },
        {
            href: 'https://www.youtube.com/@only_pirates',
            icon: <YouTubeIcon />,
            label: 'YouTube'
        }
    ];

    return (
        <div className="app-container">
            {/* Header */}
            <header className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="nav-container">
                    <nav className="nav">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="logo"
                            onClick={closeMobileMenu}
                        >
                            <SailingIcon className="logo-icon" />
                            <span className="logo-text">
                                The Voyages of Victora
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="nav-menu">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        style={{ textDecoration: 'none', color: 'white' }}
                                        className={`nav-link ${location.pathname === item.path ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                                    >
                                        {!isMobile && <span>{item.icon}</span>}&nbsp;
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={toggleMobileMenu}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </nav>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-nav-content">
                        {/* Mobile Navigation */}
                        <nav className="mobile-nav">
                            <ul className="mobile-nav-menu">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <button
                                            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
                                            onClick={() => handleNavClick(item.path)}
                                        >
                                            <span className="nav-link-icon">{item.icon}</span>
                                            <span className="nav-link-text">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Social Links in Mobile Menu */}
                            <div className="mobile-social-links">
                                <h4>Follow the Voyage</h4>
                                <div className="social-links-grid">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link-mobile"
                                            onClick={closeMobileMenu}
                                        >
                                            {social.icon}
                                            <span>{social.label}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Copyright in Mobile Menu */}
                            <div className="mobile-footer">
                                <p>© 2024 The Voyages of Victora</p>
                                <p>Embark on a thrilling adventure with Captain Bartley and his eclectic crew.</p>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        {/* Brand Section */}
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <SailingIcon className="logo-icon" />
                                <span className="logo-text">The Voyages of Victora</span>
                            </div>
                            <p className="footer-tagline">
                                Embark on a thrilling adventure with Captain Bartley and his eclectic crew.
                            </p>
                            <div className="footer-social-links">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link-footer"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            to={item.path}
                                            className="footer-link"
                                            onClick={closeMobileMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Author Info */}
                        <div className="footer-author">
                            <h4>About the Author</h4>
                            <p>Christopher Feveck</p>
                            <a
                                href="https://chris-feveck.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="author-website"
                            >
                                Visit Author Website
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="footer-bottom">
                        <div className="footer-copyright">
                            <p>© 2024 The Voyages of Victora. All rights reserved.</p>
                            <p>Created with passion for adventure and storytelling.</p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to Top Button */}
            {isScrolled && (
                <button
                    className="back-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                >
                    <span>↑</span>
                </button>
            )}
        </div>
    );
};

export default Layout;