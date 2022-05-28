import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../customHooks/useAdmin';

const Dashboard = () => {
    const [user, error, loading] = useAuthState(auth)
    const [admin, setAdmin, adminLoading, setAdminLoading] = useAdmin(user);
    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">


                {/* <!-- Page content here --> */}
                <h2 className="text-3xl text-center text-secondary py-8">Welcome to dashboard</h2>
                <Outlet />


            </div>
            <div className="drawer-side border-r-2">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">


                    {/* <!-- Sidebar content here --> */}


                    <li><Link to="/dashboard">My Appoinments</Link></li>
                    <li><Link to="/dashboard/myReviews">My reviews</Link></li>
                    <li><Link to="/dashboard/myHistory">My history</Link></li>
                    {
                        admin && <>
                        <li><Link to="/dashboard/allUsers">All users</Link></li>
                        <li><Link to="/dashboard/addDoctors">Add Doctors</Link></li>
                        <li><Link to="/dashboard/allDoctors">All Doctors</Link></li>
                        </>
                    }

                </ul>

            </div>
        </div>
    );
};

export default Dashboard;