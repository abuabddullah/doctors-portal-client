
// const getAccessToken = (user) => {
//     const email = user?.user?.email;
//     const currentUser = {email: email};
//     if(email){
//         fetch(`http://localhost:5000/login/${email}`, {
//             method:'PUT',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body:JSON.stringify(currentUser)
//         })
//         .then(res=>res.json())
//         .then(data => {
//             console.log('data inside useToken', data);
//             const accessToken = data.token;
//             localStorage.setItem('accessToken', accessToken);
//         })
//     }
// };


// export default getAccessToken;


import axios from "axios";


const getAccessToken = async (user) => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    const url = `http://localhost:5000/login/${email}`;

    if (email) {
        const { data } = await axios.put(url, currentUser);
        console.log('data inside useToken', data);
        const accessToken = data.token;
        localStorage.setItem('accessToken', accessToken);
    }
};

export default getAccessToken;