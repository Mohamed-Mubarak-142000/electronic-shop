'use client';

import { useEffect, useState, useMemo } from 'react';
import Map, { Marker, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapSelectorProps {
    value: { lat: number, lng: number };
    onChange: (v: { lat: number, lng: number }) => void;
}

export default function MapSelector({ value, onChange }: MapSelectorProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const initialViewState = useMemo(() => ({
        latitude: value.lat || 30.0444,
        longitude: value.lng || 31.2357,
        zoom: 13
    }), []); // Only on initial load

    if (!isMounted) {
        return <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />;
    }

    const handleMapClick = (e: any) => {
        const { lng, lat } = e.lngLat;
        onChange({ lat, lng });
    };

    return (
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner relative">
            <Map
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12" // Detailed street view for selector
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
            >
                {value.lat !== 0 && (
                    <Marker
                        latitude={value.lat}
                        longitude={value.lng}
                        anchor="bottom"
                        draggable
                        onDragEnd={(e: any) => {
                            onChange({ lat: e.lngLat.lat, lng: e.lngLat.lng });
                        }}
                    >
                        <div className="text-red-500 transform transition-transform hover:scale-110 cursor-move">
                            <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                location_on
                            </span>
                        </div>
                    </Marker>
                )}
            </Map>

            <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] text-slate-500 border border-slate-200 dark:border-slate-800">
                Click map or drag marker to select location
            </div>

            {/* Map selection tool */}
        </div>
    );
}
