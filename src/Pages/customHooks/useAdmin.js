import axios from "axios";
import { useEffect, useState } from "react";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const email = user?.email;
        if (email) {
            const testAdmin = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/admin/${email}`);
                    // console.log(data);
                    setAdmin(data.admin);
                    setAdminLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
            testAdmin();
        }
    }, [user])
    return [admin, setAdmin,adminLoading, setAdminLoading];
};

export default useAdmin;