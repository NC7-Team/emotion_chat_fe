import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        const headerStyle = {
            background: 'linear-gradient(to bottom, #B5E8EE, rgba(255, 255, 255, 0.8))',
        };

        return (
            <header className="app-header" style={headerStyle}>
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">Mood Canvas</Link>
                    </div>
                    <div className="app-branding">
                        <Link to="/test" className="app-title">test</Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            {this.props.authenticated ? (
                                <ul>
                                    <li>
                                        <NavLink to="/myPage">Record</NavLink>
                                    </li>
                                    <li>
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a href="#" onClick={this.props.onLogout}>Logout</a>
                                    </li>
                                </ul>
                            ) : (
                                <ul>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/myPage">Record</NavLink>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;
