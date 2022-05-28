import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { compareAsc, format } from 'date-fns'
import axios from 'axios';
import { toast } from 'react-toastify';

const AppoinmentModal = ({ treatment, setTreatment, date, refetch }) => {
    const [user, loading, error] = useAuthState(auth);

    const { _id, name, slots, price } = treatment || {};
    const formatDate = format(date, 'PP');
    const handleSubmit = e => {
        e.preventDefault();
        const date = e.target.date.value;
        const treatment = e.target.treatment.value;
        const slot = e.target.slot.value;
        const patientName = e.target.userName.value;
        const patientNumber = e.target.number.value;
        const patientEmail = e.target.email.value;
        const bookingInfo = {
            treatmentId: _id,
            treatment,
            date,
            slot,
            price,
            patientName,
            patientNumber,
            patientEmail
        };
        // console.log(bookingInfo);


        const postBooking = async () => {
            const url = 'https://bddoctorsportal.herokuapp.com/bookings';
            try {
                const { data } = await axios.post(url, bookingInfo);
                if (data.error) {
                    toast.error(`Already have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)
                    // toast.error(`Already have and appointment`)
                    console.log(data);
                } else {
                    console.log(data);
                    toast(`Appointment is set, ${formatDate} at ${slot}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
        postBooking();
        refetch();
        setTreatment(null)
    }


    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <h3 className="text-2xl mb-8 font-bold text-primary">Confirm Booking : {name}</h3>
                    <p className="text-center">
                        <small>${price}</small>
                    </p>

                    <form
                        className='flex flex-col justify-center items-center'
                        onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="date"
                            value={formatDate}
                            readOnly
                            disabled
                            placeholder="Type here"
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        />
                        <input
                            type="text"
                            name="treatment"
                            value={name}
                            readOnly
                            disabled
                            placeholder="Type here"
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        />

                        <select
                            name='slot'
                            defaultValue={slots[0]}
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        >
                            {
                                slots.map(slot => <option
                                    key={slot}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>

                        <input
                            type="text"
                            name="userName"
                            value={user.displayName}
                            readOnly
                            disabled
                            placeholder="Type Your Name"
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        />

                        <input
                            type="number"
                            name="number"
                            placeholder="Type Your Number"
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        />

                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            readOnly
                            disabled
                            placeholder="Type Your email"
                            className="mb-4 input input-bordered input-accent w-full max-w-xs"
                        />


                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-wide">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AppoinmentModal;