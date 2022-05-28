import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import getAccessToken from '../utilities/getAccessToken';
import auth from './../../firebase.init';
import Loading from './Loading/Loading';

const GoogleSignIn = () => {
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if (loading) {
        return <Loading />
    }
    if (user) {
        getAccessToken(user);
        navigate(from, { replace: true });
    }


    return (

        <div className='text-center'>


            {
                error ? <p className="pb-4 text-red-500 text-center"><code>{error.message}</code></p> : ""
            }

            <button
                onClick={() => signInWithGoogle()}
                className="btn btn-wide btn-outline">
                CONTINUE WITH GOOGLE
            </button>
        </div>
    );
};

export default GoogleSignIn;