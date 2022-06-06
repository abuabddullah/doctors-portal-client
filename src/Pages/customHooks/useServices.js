import { useQuery } from "react-query";

const useServices = () => {
    const { isLoading, error, data, refetch } = useQuery(['availableServices', ], () =>
        fetch(`https://bddoctorsportal.herokuapp.com/services`)
            .then(res =>
                res.json()
            )
    )
    return [isLoading, error, data, refetch];
};

export default useServices;