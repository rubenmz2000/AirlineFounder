import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import {useState,useEffect} from "react";
import {getAircraftPosition} from '../services/flightMapService.ts'
import type AircraftPosition from '../types/aircraftPosition.ts'

function FlightMap() {
    const [position, setPosition] = useState<AircraftPosition>({latitude: 0, longitude: 0});
    
    const getData = async () => {
        const aircraftPosition: AircraftPosition = await getAircraftPosition();
        setPosition(aircraftPosition);
    }
    
    useEffect(() => {
        getData();
        
        const interval = setInterval(() => {
            getData();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    return <>
        <MapContainer
            center={[39.4883, -0.4816]}
            zoom={15}
            minZoom={2}
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[39.4892, -0.4816]}>
                <Popup>LEVC</Popup>
            </Marker>

            <Marker position={[position.latitude, position.longitude]}>
                <Popup>EC-RMZ</Popup>
            </Marker>
        </MapContainer>
    </>
}

export default FlightMap;