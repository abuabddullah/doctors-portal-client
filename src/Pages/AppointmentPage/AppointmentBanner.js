import React from 'react';
import { DayPicker } from 'react-day-picker';
import chair from '../../assets/images/chair.png'

const AppointmentBanner = ({ date, setDate }) => {
    return (
        <section className="homeBanner">
            <div className="container mx-auto md:flex md:flex-row-reverse justify-center items-center py-16">
                <div className='md:w-1/2 md:ml-8 lg:ml-16'>
                    <img src={chair} className="max-w-full rounded-lg shadow-2xl" alt='' />
                </div>
                <div className='flex justify-center'>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>
            </div>
        </section>
    );
};

export default AppointmentBanner;