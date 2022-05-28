import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AllUsers = () => {
    const { isLoading, error, data: users, refetch } = useQuery(['allUsers'], () => fetch('http://localhost:5000/allUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }


    const handleAdmin = (email4Admin) => {
        // console.log(email4Admin);
        const url = `http://localhost:5000/admin/${email4Admin}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast.error(data.error);
                } else {
                console.log(data);
                toast.success(data.success);
                refetch();
                }
            })


        }

    return (
            <div>
                AllUsers : {users?.length}
                <div className="overflow-x-auto">
                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr>
                                    <th>{index + 1}</th>
                                    <td>{user?.email}</td>
                                    <td>
                                        {
                                            user?.role !== "admin" && <button
                                                onClick={() => handleAdmin(user?.email)}
                                                className="btn  btn-xs">Make Admin</button>
                                        }
                                    </td>
                                    <td>
                                        <button className="btn btn-error text-white btn-xs">Remove</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>

            </div>
        );
    };

    export default AllUsers;