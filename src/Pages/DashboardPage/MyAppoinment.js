import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-day-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading/Loading';

const MyAppoinment = () => {
    const navigate = useNavigate();
    const [user, loading, error4User] = useAuthState(auth);

    // Normal JWT less fetch
    // const { isLoading, error, data: apponintments, refetch } = useQuery(['availableServices'], () =>
    //     fetch(`http://localhost:5000/apponintments?email=${user?.email}`)
    //         .then(res =>
    //             res.json()
    //         )
    // )

    // if (isLoading) {
    //     return <Loading />
    // }



    // //get data with JWT  fetch
    // const { isLoading, error, data: apponintments, refetch } = useQuery(['availableServices', user], () =>
    //     fetch(`http://localhost:5000/apponintments?email=${user?.email}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     })
    //         .then(res =>
    //             res.json()
    //         )
    // )

    // if (isLoading) {
    //     return <Loading />
    // }
    



    // // get data with JWT axios
    const [apponintments, setApponintments] = useState([]);
    useEffect(() => {
        const getAppoinments = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/apponintments?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                })
                setApponintments(data);
            } catch (error) {
                console.log(error)
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/home')
                }
            }
        }
        getAppoinments();
    }, [user, apponintments])

    return (
        <section>
My Appoinments: {apponintments?.length}
            <div className="overflow-x-auto">
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>SL</th>
                            <th>treatment</th>
                            <th>date</th>
                            <th>slot</th>
                            <th>patientName</th>
                            <th>patientNumber</th>
                            <th>patientEmail</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apponintments?.map((apponintment, index) => (
                            <tr
                                key={index}
                                className="hover">
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>{index + 1}</th>
                                <td>{apponintment?.treatment}</td>
                                <td>{apponintment?.date}</td>
                                <td>{apponintment?.slot}</td>
                                <td>{apponintment?.patientName}</td>
                                <td>{apponintment?.patientNumber}</td>
                                <td>{apponintment?.patientEmail}</td>
                                <td>
                                {(apponintment?.price && !apponintment.paid) && <Link to={`/dashboard/payment/${apponintment?._id}`}><button className='btn btn-xs btn-success'>Pay</button></Link>}
                                {(apponintment?.price && apponintment.paid) && <span className='text-success'>Paid</span>}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>SL</th>
                            <th>treatment</th>
                            <th>date</th>
                            <th>slot</th>
                            <th>patientName</th>
                            <th>patientNumber</th>
                            <th>patientEmail</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </section>
    );
};

export default MyAppoinment;