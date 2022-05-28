import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import { FaAlignRight } from "react-icons/fa";

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);

    const logout = () => {
        localStorage.removeItem('accessToken');
        signOut(auth);
    };

    const location = useLocation();
    const { pathname } = location;

    const menuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>
        <li><Link to="/review">Review</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        {
            user && <>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </>
        }
        {
            user ? <li>
                <span
                    onClick={logout}
                >Logout</span>
            </li> : <li><Link to="/login">Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 border border-bottom sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Doctors Portal</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>

            {
                pathname.includes('dashboard') && <div className="navbar-end">
                    <label htmlFor="my-drawer-2" className="btn btn-outline border-0 text-lg hover:bg-stone-300 hover:text-black drawer-button lg:hidden"><FaAlignRight /></label>
                </div>
            }


        </div>
    );
};

export default Navbar;