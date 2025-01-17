
import { useEffect, useState } from "react"

const useWorker = email => {
    const [isWorker, setIsWorker] = useState(false);
    const [isWorkerLoading, setIsWorkerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:3000/api/users/worker/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsWorker(data.isWorker);
                    setIsWorkerLoading(false);
                })
        }
    }, [email])
    return [isWorker, isWorkerLoading]
}

export default useWorker;