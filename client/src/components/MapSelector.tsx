'use client';
/// <reference types="node" />

import { useEffect, useState, useMemo } from 'react';
import Map, { Marker, useControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface MapSelectorProps {
    value: { lat: number, lng: number };
    onChange: (v: { lat: number, lng: number }) => void;
}

export default function MapSelector({ value, onChange }: MapSelectorProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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

    if (!MAPBOX_TOKEN) {
        return (
            <div className="h-[300px] w-full rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-900/30 flex flex-col items-center justify-center p-6 text-center">
                <span className="material-symbols-outlined text-4xl text-red-500 mb-2">map</span>
                <p className="text-red-700 dark:text-red-400 font-bold mb-1">Map Cannot Be Loaded</p>
                <p className="text-sm text-red-600 dark:text-red-300">
                    Mapbox configuration is missing. Please add <code className="bg-red-100 dark:bg-red-900/30 px-1 py-0.5 rounded">NEXT_PUBLIC_MAPBOX_TOKEN</code> to your environment variables.
                </p>
            </div>
        );
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
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                onClick={handleMapClick}
                onError={(e) => {
                    console.error("Mapbox Error:", e);
                    setMapError(e.error?.message || "Failed to load map");
                }}
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

            {mapError && (
                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                    <div className="text-center p-4">
                        <p className="text-red-500 font-bold">Map Error</p>
                        <p className="text-sm">{mapError}</p>
                    </div>
                </div>
            )}

            <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] text-slate-500 border border-slate-200 dark:border-slate-800 pointer-events-none">
                Click map or drag marker to select location
            </div>
        </div>
    );
}
