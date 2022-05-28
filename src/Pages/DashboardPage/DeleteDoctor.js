import React from 'react';
import { GoAlert } from "react-icons/go";
import { toast } from 'react-toastify';

const DeleteDoctor = ({ doctor, refetch }) => {
    const { _id, name } = doctor || {};

    const handleDelete = (email) => {
        fetch(`http://localhost:5000/doctors/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor: ${name} is deleted.`)
                    refetch();
                }
            })
    }
    return (
        <>

            <label
                for="delete-doctor-modal" class="btn btn-xs btn-error modal-button">Remove</label>


            <input type="checkbox" id="delete-doctor-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="delete-doctor-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 class="font-bold text-lg">Sure to remove Doctor!</h3>
                    <div className='p-8 flex justify-center items-center flex-col'>
                        <GoAlert
                            className='text-7xl text-red-500 border-2 border-red-500 p-1 rounded-full'
                        />
                        <p className='mt-4'>id : {_id}</p>
                        <p className='mt-4'>Name : {name}</p>
                    </div>
                    <div class="modal-action">
                        <label
                            onClick={() => handleDelete(doctor?.email)}
                            for="delete-doctor-modal"
                            class="btn btn-error">Remove</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteDoctor;