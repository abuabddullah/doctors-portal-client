import { useQuery } from "react-query";

const useServices = () => {
    const { isLoading, error, data, refetch } = useQuery(['availableServices', ], () =>
        fetch(`http://localhost:5000/services`)
            .then(res =>
                res.json()
            )
    )
    return [isLoading, error, data, refetch];
};

export default useServices;