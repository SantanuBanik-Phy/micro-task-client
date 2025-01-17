
import { useEffect, useState } from "react"

const useWorker = email => {
    const [isWorker, setIsWorker] = useState(false);
    const [isWorkerLoading, setIsWorkerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://b10-a12-server.vercel.app/api/users/worker/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsWorker(data.isWorker);
                    setIsWorkerLoading(false);
                })
        }
    }, [email])
    return [isWorker, isWorkerLoading]
}

export default useWorker;