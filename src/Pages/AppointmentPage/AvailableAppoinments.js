import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import SingleService from './SingleService';
import AppoinmentModal from './AppoinmentModal';
import { useQuery } from 'react-query'
import Loading from '../Shared/Loading/Loading';


const AvailableAppoinments = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    const formatDate = format(date, 'PP');

    // // GET all services
    // useEffect(() => {
    //     const getServices = async () => {
    //         const url = `http://localhost:5000/services`;
    //         try {
    //             const { data } = await axios.get(url);
    //             // console.log(data);
    //             setServices(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getServices();
    // }, [services])


    // // GET all availble non booked services
    // useEffect(() => {
    //     const getServices = async () => {
    //         const url = `http://localhost:5000/availableServices?date=${formatDate}`;
    //         try {
    //             const { data } = await axios.get(url);
    //             // console.log(data);
    //             setServices(data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getServices();
    // }, [services,formatDate])

    // GET all availble non booked services by useQuery
    const { isLoading, error, data: services, refetch } = useQuery(['availableServices', formatDate], () =>
        fetch(`http://localhost:5000/availableServices?date=${formatDate}`)
            .then(res =>
                res.json()
            )
    )

    if (isLoading) {
        return <Loading />
    }

    return (
        <section className='py-12'>
            <div className="container mx-auto">
                <h4 className='py-8 text-center text-xl text-secondary'>Available Appointments on {format(date, 'PP')}.</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">



                    {
                        services?.map(service => <SingleService
                            key={service._id}
                            service={service}
                            setTreatment={setTreatment}
                            treatment={treatment}
                        />)
                    }

                    {
                        treatment && <AppoinmentModal
                            treatment={treatment}
                            setTreatment={setTreatment}
                            date={date}
                            refetch={refetch}
                        />
                    }

                </div>
            </div>
        </section>
    );
};

export default AvailableAppoinments;