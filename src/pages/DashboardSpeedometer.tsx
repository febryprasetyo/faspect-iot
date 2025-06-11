import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import Parameter from "../components/Parameter";

const initSpeedometer = {
  BOD: 0,
  COD: 0,
  CT: 0,
  DEPTH: 0,
  DO: 0,
  id: "",
  N: 0,
  NO2: 0,
  "NO3-3": 0,
  ORP: 0,
  PH: 0,
  Temperature: 0,
  time: "",
  TSS: 0,
  TUR: 0,
  uuid: "",
};

export default function DashboardSpeedometer() {
  const { id } = useParams();
  const { user } = useAuth();
  const [dataMonitoring, setDataMonitoring] = useState(initSpeedometer);
  const [dataIsLoad, setDataIsLoad] = useState(false);

  const topic = "mqtt_ccb3aad79fe5";
  useEffect(() => {
    // Connect to the MQTT broker
    const client = mqtt.connect("ws://103.84.206.53:9001");

    // Subscribe to the MQTT topic
    client.subscribe(topic);

    // Handle incoming messages
    client.on("message", (_topic, message) => {
      // Handle the incoming message
      const jsonString = JSON.parse(message.toString());
      const uuidx = jsonString["uuid"];
      if (uuidx == id) {
        //   setUuid(id);
        setDataMonitoring(jsonString.data[jsonString.data.length - 1]);
        setDataIsLoad(true);
      }
    });
    console.log("topic:", topic);
    // Cleanup on component unmount
    return () => {
      client.end(); // Close the MQTT connection
      setDataIsLoad(false);
    };
  }, [id]);

  if (!dataIsLoad) {
    return (
      <p className="text-center text-lg font-bold mt-4">Waiting Resources...</p>
    );
  }
  return (
    <div
      className={`grid ${
        user?.role_id == "adm"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 "
      } gap-2.5 w-full`}
    >
      <Parameter
        satuan="C"
        name="Temperature"
        value={dataMonitoring.Temperature}
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="pH"
        value={+dataMonitoring.PH.toFixed(2)}
        name="pH"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.DO.toFixed(2)}
        name="DO"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.BOD.toFixed(2)}
        name="BOD"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.COD.toFixed(2)}
        name="COD"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.CT.toFixed(2)}
        name="TDS"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="m"
        value={+dataMonitoring.DEPTH.toFixed(2)}
        name="Kedalaman"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.N.toFixed(2)}
        name="Amonia"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.NO2.toFixed(2)}
        name="Nitrit"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring["NO3-3"].toFixed(2)}
        name="Nitrat"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.ORP.toFixed(2)}
        name="ORP"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="mg/L"
        value={+dataMonitoring.TSS.toFixed(2)}
        name="TSS"
        time={dataMonitoring.time}
      />
      <Parameter
        satuan="NTU"
        value={+dataMonitoring.TUR.toFixed(2)}
        name="Turbidity"
        time={dataMonitoring.time}
      />
    </div>
  );
}
