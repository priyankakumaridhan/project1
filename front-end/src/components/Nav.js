import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.js';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/signup');
    }

    const user = auth ? JSON.parse(auth) : null;

    return (
        <nav className="nav">
            <div className="nav-inner">
                <Link to={auth ? '/product' : '/login'} className="nav-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                        <rect width="24" height="24" rx="6" fill="var(--accent)" />
                        <path d="M6 9h12l-1.2 7.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 9Zm3-2a3 3 0 0 1 6 0"
                              stroke="var(--on-accent)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                    </svg>
                    E-Dashboard
                </Link>

                {auth && (
                    <ul className="nav-links">
                        <li><NavLink to="/product" className="nav-link">Products</NavLink></li>
                        <li><NavLink to="/add-product" className="nav-link">Add Product</NavLink></li>
                        <li><NavLink to="/about" className="nav-link">About</NavLink></li>
                    </ul>
                )}

                <div className="nav-right">
                    <ThemeToggle />
                    {auth ? (
                        <>
                            <span className="nav-user">
                                <span className="avatar" aria-hidden="true">
                                    {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                                </span>
                                {user.name}
                            </span>
                            <button type="button" className="btn btn--ghost btn--sm" onClick={logout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <ul className="nav-links">
                            <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                            <li><NavLink to="/signup" className="nav-link">Sign Up</NavLink></li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
