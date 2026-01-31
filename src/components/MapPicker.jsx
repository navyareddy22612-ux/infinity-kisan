import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../styles/MapPicker.module.css';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ setPos }) => {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            setPos(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const MapPicker = ({ onLocationSelect, onClose }) => {
    const [selectedPos, setSelectedPos] = useState(null);

    const handleConfirm = () => {
        if (selectedPos) {
            onLocationSelect(selectedPos);
            onClose();
        } else {
            alert("Please tap on the map to select a location.");
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    <h3>Pick a Location</h3>
                    <button onClick={onClose} className={styles.closeBtn}>&times;</button>
                </div>

                <div className={styles.mapWrapper}>
                    <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker setPos={setSelectedPos} />
                    </MapContainer>
                </div>

                <div className={styles.footer}>
                    <p className={styles.hint}>
                        {selectedPos ? `Selected: ${selectedPos.lat.toFixed(4)}, ${selectedPos.lng.toFixed(4)}` : "Tap anywhere on the map"}
                    </p>
                    <button className="btn btn-primary" onClick={handleConfirm} disabled={!selectedPos}>
                        Confirm Location
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapPicker;
