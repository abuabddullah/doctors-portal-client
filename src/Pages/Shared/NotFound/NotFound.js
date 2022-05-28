import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section className='md:p-8'>
            <div className="container mx-auto flex justify-center items-center">
            <img onClick={() => navigate(`/home`)} src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif" alt="notFound" className='max-w-full shadow-lg m-8 md:p-8' />
            </div>
        </section>
    );
};

export default NotFound;