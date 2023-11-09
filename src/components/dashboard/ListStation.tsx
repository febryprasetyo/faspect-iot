import { useState, useEffect } from "react"
import { Card, Typography } from "@material-tailwind/react";
import { db } from "../../firebase/config";
import { getDocs, collection } from "firebase/firestore"
import { Link } from "react-router-dom";

export default function ListStation() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [stations, setStations] = useState<any[]>([])
    const stationCollectionRef = collection(db, "watermonitoring")
    const getStationsList = async()=>{
        try {
            const data = await getDocs(stationCollectionRef)
            const respStation = data.docs.map((doc)=> ({ ...doc.data(), id: doc.id}))

            setStations(respStation)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getStationsList()
    }, [])
    return <div>
        <Card className="p-8">
            <Typography className="text-xl font-semibold">Stasiun</Typography>
            <div>
                {
                    stations.map(station => (
                        <Link key={station.id} to={`/monitoring/${station.uuid}`}>
                            <div className="w-full border rounded p-2 flex gap-x-3 mt-4 cursor-pointer">
                                <img src="/iott.jpg" className="w-36 rounded-sm" alt="auu" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">ID Station : {station.uuid}</h3>
                                    <p className="text-gray-500">Description</p>
                                </div>
                            </div>  
                        </Link>
                                  
                    ))
                }
            </div>
            
        </Card>
    </div>
}