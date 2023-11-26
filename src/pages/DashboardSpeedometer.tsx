import { useEffect, useState } from "react"
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import Parameter from "../components/Parameter";
const initSpeedometer = {
    bod: 0,
    cod: 0,
    ct: 0,
    depeth: 0,
    do_: 0,
    id: "",
    n: 0,
    no2: 0,
    no3_3: 0,
    orp: 0,
    ph: 0,
    temperature: 0,
    time: "",
    tss: 0,
    tur: 0,
    uuid: ""
}

export default function DashboardSpeedometer() {
    const { id } = useParams()
    const { user } = useAuth()
    const [dataMonitoring, setDataMonitoring] = useState(initSpeedometer)
    const stationCollectionRef = collection(db, `watermonitoring`)
    
    useEffect(()=>{   
        const unsub = onSnapshot(stationCollectionRef, (snapshot) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any[] = []
            snapshot.docs.forEach((doc)=>{
                data.push({ ...doc.data(), id: doc.id})
            })
            const filterById = data.filter(val => val.uuid == id)
            if (filterById.length > 0) {   
                setDataMonitoring(filterById[0])
            }
          });
          return ()=> unsub()
    }, [id, stationCollectionRef])
    
    return (
        <div className={`grid ${user?.role_id == "adm" ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '} gap-2.5 w-full`}>  
            <Parameter satuan="C" name="Temperature" value={dataMonitoring.temperature} time={dataMonitoring.time}/>
            <Parameter satuan="pH" value={+dataMonitoring.ph.toFixed(2)} name="pH" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.do_.toFixed(2)} name="DO" time={dataMonitoring.time}/>
            <Parameter satuan="mg/L" value={+dataMonitoring.bod.toFixed(2)} name="BOD" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.cod.toFixed(2)} name="COD" time={dataMonitoring.time}/>
            <Parameter satuan="mg/L" value={+dataMonitoring.ct.toFixed(2)} name="TDS" time={dataMonitoring.time} />
            <Parameter satuan="m" value={+dataMonitoring.depeth.toFixed(2)} name="Kedalaman" time={dataMonitoring.time}/> 
            <Parameter satuan="mg/L" value={+dataMonitoring.n.toFixed(2)} name="Amonia" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.no2.toFixed(2)} name="Nitrit" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.no3_3.toFixed(2)} name="Nitrat" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.orp.toFixed(2)} name="ORP" time={dataMonitoring.time} />
            <Parameter satuan="mg/L" value={+dataMonitoring.tss.toFixed(2)} name="TSS" time={dataMonitoring.time} />
            <Parameter satuan="NTU" value={+dataMonitoring.tur.toFixed(2)} name="Turbidity" time={dataMonitoring.time} />
        </div>
    )
}