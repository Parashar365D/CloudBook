import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    let location = useLocation();


    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand mx-auto" to="/CloudBook">
                    <img src={"/assets/cloudbook.png"} alt="Logo" width="35" height="30" className="d-inline-block align-text-top mx-2" />
                    CloudBook
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mx-auto mb-b mb-lg-0">
                        <li className="nav-item ">
                            <Link className={`nav-link ${location.pathname === "/CloudBook" ? "active" : ""}`} aria-current="page" to="/CloudBook">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about_us" ? "active" : ""}`} to="/about_us">About Us</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? (<form className="d-flex">
                        <Link className="btn btn-default border border-secondary" style={{ width: "90px" }} to="/login" role="button">login</Link>
                    </form>) : (<button className="btn btn-default border border-secondary" style={{ width: "90px" }} onClick={handleLogout}>logout</button>)}
                </div>
            </div>
        </nav>
    );
}
