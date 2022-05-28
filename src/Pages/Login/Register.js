import React, { useState } from 'react';
import GoogleSignIn from '../Shared/GoogleSignIn';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from './../Shared/Loading/Loading'
import getAccessToken from '../utilities/getAccessToken';

const Register = () => {
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [regError, setRegError] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        createUserWithEmailAndPassword(email, password, { sendEmailVerification: true })
    }

    // if (error) {
    //     setRegError(error?.message)
    // } 

    if (loading) {
        return <Loading />
    }
    if (user) {
        getAccessToken(user);
        navigate(from, { replace: true });
    }
    return (
        <section>
            <div className="container mx-auto py-12">
                <div className="card mx-auto md:w-3/4 lg:w-1/2  shadow-xl">
                    <div className="card-body">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-bold">Register now!</h1>
                        </div>


                        <form onSubmit={handleSubmit(onSubmit)}>

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
                                        maxLength: {
                                            value: 15,
                                            message: 'type nickname only less than 16 char'
                                        }
                                    })}
                                />
                                <label className="label">
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
                                <label htmlFor='password' className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id='password'
                                    type="password"
                                    placeholder="Type password"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'password is required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'password must be 6 digit'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt  text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt  text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>


                            {
                                error ? <p className="pb-4 text-red-500 text-center"><code>{error.message}</code></p> : ""
                            }

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-wide btn-outline">
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="text-center">Already have accaount? <Link className='text-secondary' to="/login">Login now</Link></p>

                        <div className="divider">OR</div>

                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;