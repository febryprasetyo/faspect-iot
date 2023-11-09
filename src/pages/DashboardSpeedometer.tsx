import { useEffect, useState } from "react"
import ReactSpeedometer from "react-d3-speedometer"
import { Card } from "@material-tailwind/react";
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
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
    console.log(id);
    
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
    }, [])
    return (
        <div className={`grid ${user?.role_id == "adm" ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 '} gap-2.5 w-full`}>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Suhu</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={50}
                        value={dataMonitoring.temperature.toFixed(2)}
                        currentValueText={
                            dataMonitoring.temperature.toFixed(2) + "\u00B0C"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>    
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">pH</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={14}
                        value={dataMonitoring.ph.toFixed(2)}
                        currentValueText={
                            dataMonitoring.ph.toFixed(2) + " pH"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">DO</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={15}
                        value={dataMonitoring.do_.toFixed(2)}
                        currentValueText={
                            dataMonitoring.do_.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">BOD</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={60}
                        value={dataMonitoring.bod.toFixed(2)}
                        currentValueText={
                            dataMonitoring.bod.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">COD</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={500}
                        value={dataMonitoring.cod.toFixed(2)}
                        currentValueText={
                            dataMonitoring.cod.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">TDS</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={1000}
                        value={dataMonitoring.ct.toFixed(2)}
                        currentValueText={
                            dataMonitoring.ct.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Kedalaman</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div  className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={1}
                        value={dataMonitoring.depeth}
                        currentValueText={
                            dataMonitoring.depeth + " m"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Amonia</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={100}
                        value={dataMonitoring.n.toFixed(2)}
                        currentValueText={
                            dataMonitoring.n.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Nitrit</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={50}
                        value={dataMonitoring.no2.toFixed(2)}
                        currentValueText={
                            dataMonitoring.no2.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Nitrat</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={50}
                        value={dataMonitoring.no3_3.toFixed(2)}
                        currentValueText={
                            dataMonitoring.no3_3.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">ORP</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={50}
                        value={dataMonitoring.orp.toFixed(2)}
                        currentValueText={
                            dataMonitoring.orp.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">TSS</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={500}
                        value={dataMonitoring.tss.toFixed(2)}
                        currentValueText={
                            dataMonitoring.tss.toFixed(2) + " mg/L"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={10}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />                    
                </div>
            </Card>  
            <Card className="p-2">
                <p className="text-sm text-strokedark">Parameter</p>
                <h2 className="text-lg font-bold mb-2">Turbidity</h2>
                <hr className="mb-4.5 text-blue-gray-200"/>
                <div className="w-full flex justify-center">
                    <ReactSpeedometer
                        maxValue={50}
                        value={dataMonitoring.tur.toFixed(2)}
                        currentValueText={
                            dataMonitoring.tur.toFixed(2) + " NTU"
                        }
                        needleColor="red"
                        startColor="green"
                        maxSegmentLabels={100}
                        segments={5}
                        endColor="blue"
                        width={240}
                        height={160}
                    />
                </div>
            </Card>  
        </div>
    )
}