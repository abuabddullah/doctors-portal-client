import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import NotFound from './Pages/Shared/NotFound/NotFound';
import Footer from './Pages/Home/Footer';
import Register from './Pages/Login/Register';
import RequireAuth from './Pages/Login/RequireAuth';
import Appointment from './Pages/AppointmentPage/Appointment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/DashboardPage/Dashboard';
import MyAppoinment from './Pages/DashboardPage/MyAppoinment';
import MyReviews from './Pages/DashboardPage/MyReviews';
import MyHistory from './Pages/DashboardPage/MyHistory';
import AllUsers from './Pages/DashboardPage/AllUsers';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddDoctors from './Pages/DashboardPage/AddDoctors';
import AllDoctors from './Pages/DashboardPage/AllDoctors';
import MyPayment from './Pages/DashboardPage/MyPayment';

function App() {

  const location = useLocation();
  const { pathname } = location;
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="about" element={
          <About />
        } />
        <Route path="/appointment" element={
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        } />


        <Route path="/dashboard" element={<RequireAuth> <Dashboard /> </RequireAuth>} >
          <Route index element={<MyAppoinment />} />
          <Route path='payment/:_id' element={<MyPayment />} />
          <Route path='myReviews' element={<MyReviews />} />
          <Route path='myHistory' element={<MyHistory />} />
          <Route path='allUsers' element={ <RequireAdmin> <AllUsers /> </RequireAdmin> } />
          <Route path='allDoctors' element={ <RequireAdmin> <AllDoctors /> </RequireAdmin> } />
          <Route path='addDoctors' element={ <RequireAdmin> <AddDoctors /> </RequireAdmin> } />
        </Route>


        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {
        (pathname.includes('login') || pathname.includes('register') || pathname.includes('addDoctors') || pathname.includes('dashboard')) || <Footer />
      }


      <ToastContainer />
    </div>
  );
}

export default App;









// import './App.css';
// import Navbar from './Pages/Shared/Navbar';
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import Home from './Pages/Home/Home';
// import About from './Pages/About/About';
// import Login from './Pages/Login/Login';
// import NotFound from './Pages/Shared/NotFound/NotFound';
// import Footer from './Pages/Home/Footer';
// import Register from './Pages/Login/Register';
// import RequireAuth from './Pages/Login/RequireAuth';
// import Appointment from './Pages/AppointmentPage/Appointment';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Dashboard from './Pages/DashboardPage/Dashboard';
// import MyAppoinment from './Pages/DashboardPage/MyAppoinment';
// import MyReviews from './Pages/DashboardPage/MyReviews';
// import MyHistory from './Pages/DashboardPage/MyHistory';
// import AllUsers from './Pages/DashboardPage/AllUsers';
// import RequireAdmin from './Pages/Login/RequireAdmin';
// import AddDoctors from './Pages/DashboardPage/AddDoctors';
// import AllDoctors from './Pages/DashboardPage/AllDoctors';
// import MyPayment from './Pages/DashboardPage/MyPayment';

// function App() {

//   const location = useLocation();
//   const { pathname } = location;
//   return (
//     <div>
//       <Navbar></Navbar>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="/appointment" element={<Appointment />} />


//         <Route path="/dashboard" element={<Dashboard />} >
//           <Route index element={<MyAppoinment />} />
//           <Route path='payment/:_id' element={<MyPayment />} />
//           <Route path='myReviews' element={<MyReviews />} />
//           <Route path='myHistory' element={<MyHistory />} />
//           <Route path='allUsers' element={<RequireAdmin> <AllUsers /> </RequireAdmin>} />
//           <Route path='allDoctors' element={<RequireAdmin> <AllDoctors /> </RequireAdmin>} />
//           <Route path='addDoctors' element={<RequireAdmin> <AddDoctors /> </RequireAdmin>} />
//         </Route>


//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>

//       {
//         (pathname.includes('login') || pathname.includes('register') || pathname.includes('addDoctors') || pathname.includes('dashboard')) || <Footer />
//       }


//       <ToastContainer />
//     </div>
//   );
// }

// export default App;
