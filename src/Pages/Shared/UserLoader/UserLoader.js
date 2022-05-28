import './UserLoader.css'

import React from 'react';

const UserLoader = () => {
    return (
        <section className='flex justify-center items-center'>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </section>
    );
};

export default UserLoader;