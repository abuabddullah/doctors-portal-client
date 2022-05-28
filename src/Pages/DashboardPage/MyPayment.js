import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm ';

const stripePromise = loadStripe('pk_test_51L0mz8C4IDVrgcznLbqLXXayVFuiBQhNv7ouT1ZJjcOqjQTXzqDrYklOGJ956Ure0V1KHUekdi7Hz4TweBSmQdNb00LFLHFL41');


const MyPayment = () => {
    const { _id } = useParams()
    const { isLoading, error, data: appointedTreatment, refetch } = useQuery(['apponintment', _id], () =>
        fetch(`http://localhost:5000/apponintment/${_id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res =>
                res.json()
            )
    )
    if (isLoading) {
        return <Loading />
    }


    return (
        <div class="hero min-h-screen">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Your Payment</h1>
                    <p class="py-6">Your are appointed for <strong>{appointedTreatment?.treatment}</strong> on <strong>{appointedTreatment?.date}</strong> at <strong>{appointedTreatment?.slot}</strong></p>

                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">



                            <Elements stripe={stripePromise}>
                                <CheckoutForm appointedTreatment={appointedTreatment} />
                            </Elements>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPayment;