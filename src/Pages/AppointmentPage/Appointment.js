import React, { useState } from 'react';
import AppointmentBanner from './AppointmentBanner';
import 'react-day-picker/dist/style.css';

import AvailableAppoinments from './AvailableAppoinments';

const Appointment = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className=' lg:px-12'>
            <AppointmentBanner
                date={date}
                setDate={setDate}
            />
            <AvailableAppoinments
            date={date}
            />
            
        </div>
    );
};

export default Appointment;