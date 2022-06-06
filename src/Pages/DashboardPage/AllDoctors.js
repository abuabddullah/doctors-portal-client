import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';
import DeleteDoctor from './DeleteDoctor';

const AllDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('https://bddoctorsportal.herokuapp.com/doctors', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            AllDoctors : {doctors?.length}
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, index) => <tr
                                key={doctor?._id}
                            >
                                <th>{index + 1}</th>
                                <td><div class="avatar">
                                    <div class="w-8 rounded">
                                        <img src={doctor?.image} alt={doctor?.name} />
                                    </div>
                                </div></td>
                                <td>{doctor?.name}</td>
                                <td>{doctor?.specialization}</td>
                                <td>
                                    {/* <label 
                                    // onClick={() => setDeletingDoctor(doctor)}
                                    // for="delete-confirm-modal" 
                                    class="btn btn-xs btn-error">Delete</label> */}
                                    <DeleteDoctor
                                        doctor={doctor}
                                        refetch={refetch}
                                    />
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDoctors;