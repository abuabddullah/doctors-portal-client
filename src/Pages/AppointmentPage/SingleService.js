// import React from 'react';
// import PrimaryButton from '../Shared/PrimaryButton';
// import AppoinmentModal from './AppoinmentModal';

// const SingleService = ({service,treatment,setTreatment}) => {

//     const {_id, name, slots} = service || {};
//     return (
//         <div className="card bg-base-100 shadow-xl">
//             <div className="card-body text-center">
//                 <h2 className="card-title text-secondary flex justify-center">{name}</h2>
//                 <p className='font-bold'>{slots[0]}</p>
//                 <p className='font-bold'>
//                     {
//                         slots.length>0 ? `${slots.length} SPACES AVAILABLE` : <span className='text-red-500'>NO SLOT AVAILABLE</span>
//                     }
//                 </p>
//                 <div className="card-actions justify-center">
//                     <AppoinmentModal
//                     name={name}
//                     slots={slots}
//                     setTreatment={setTreatment}
//                     treatment={treatment}
//                     >Book Appoinment</AppoinmentModal>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SingleService;







import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
import AppoinmentModal from './AppoinmentModal';

const SingleService = ({ service, treatment, setTreatment }) => {

    const { _id, name, availableSlots : slots,price } = service || {};


    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="card-title text-secondary flex justify-center">{name}</h2>
                <p className='font-bold'>{slots[0]}</p>
                <p className='font-bold'>
                    {
                        slots.length > 0 ? `${slots.length} SPACES AVAILABLE` : <span className='text-red-500'>NO SLOT AVAILABLE</span>
                    }
                </p>
                <p className='font-bold'>Price : ${price}</p>
                <div className="card-actions justify-center">
                    <label
                        onClick={()=>setTreatment(service)}
                        htmlFor="my-modal-3"
                        className="btn modal-button btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary"
                        disabled={slots.length === 0}
                    >Book Appoinment</label>
                </div>
            </div>
        </div>
    );
};

export default SingleService;