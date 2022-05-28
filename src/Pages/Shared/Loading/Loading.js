import './Loading.css'
import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Loading;