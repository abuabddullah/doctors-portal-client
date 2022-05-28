import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useServices from '../customHooks/useServices';
import Loading from '../Shared/Loading/Loading';
import getUploadPic from '../utilities/getUploadPic';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddDoctors = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    
    // get all service from useServices custom hook
    const [isLoading, error, services, refetch] = useServices()
    if (isLoading) {
        return <Loading />
    }
    
    const imgBBStorageAPIKey = '872cf09ad55d045e268a6ea6143e86c3'

    const onSubmit = data => {
        const doctorName = data.name;
        const doctorEmail = data.email;
        const doctorImageFile = data.image[0];
        const doctorSpecialization = data.specialization;

        // step-1: upload the pic in third party websiste
        const formData = new FormData();
        formData.append('image', doctorImageFile);
        const url = `https://api.imgbb.com/1/upload?key=${imgBBStorageAPIKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const doctorImgUrl = result.data.url;
                    // console.log(doctorImgUrl);

                    // step-2: create doctor obj
                    const doctorInfo = {
                        name: doctorName,
                        email: doctorEmail,
                        image: doctorImgUrl,
                        specialization: doctorSpecialization,
                    }
                    // console.log(doctorInfo);
                    // step-3: create or post doctor in db
                    fetch('http://localhost:5000/doctors', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctorInfo)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            console.log(inserted);
                            if (inserted.result.insertedId) {
                                toast.success('Doctor added successfully')
                                reset();
                            } else if (inserted.error) {
                                toast.error(inserted.error)
                            }
                            else {
                                toast.error('Failed to add the doctor');
                            }
                        })
                }
            })

        // trying to use utilities function but failed
        // const doctorImgUrl = getUploadPic(doctorImageFile,imgBBStorageAPIKey)
        // console.log(doctorImgUrl);




    }

    return (
        <section>
            <h2 className="text-5xl text-center font-bold mb-8">Add Doctors</h2>


            <form className='w-3/4 mx-auto shadow-xl p-8 rounded-lg' onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label htmlFor='name' className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        id='name'
                        type="text"
                        placeholder="Type name"
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'name is required'
                            },
                            maxLength: {
                                value: 15,
                                message: 'type nickname only less than 16 char'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        {errors.name?.type === 'maxLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label htmlFor='email' className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        id='email'
                        type="email"
                        placeholder="Type email"
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'provide a valid email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label htmlFor='specialization' className="label">
                        <span className="label-text">Specialization</span>
                    </label>

                    <select
                        id='specialization'
                        defaultValue="In which field specialized are you?"
                        className="select select-success w-full max-w-xs"
                        {...register("specialization")}
                    >
                        <option disabled>In which field specialized are you?</option>
                        {
                            services?.map(service =>
                                <option
                                    key={service._id}
                                >{service?.name}</option>)
                        }
                    </select>
                </div>

                <div className="form-control mx-auto w-full max-w-xs">
                    <label htmlFor='image' className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input
                        id='image'
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'image is required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt  text-red-500">{errors.image.message}</span>}
                    </label>
                </div>


                <div className="text-center">
                    <button
                        type="submit"
                        className="btn btn-wide">
                        Add Doctor
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddDoctors;