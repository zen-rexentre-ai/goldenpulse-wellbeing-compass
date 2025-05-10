
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [location, setLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Temporary function to get token from user input
  const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  // Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lng: position.coords.longitude,
            lat: position.coords.latitude
          });
          setLoading(false);
        },
        (err) => {
          console.error("Error getting location:", err);
          setError("Unable to access your location. Please check your browser permissions.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // Initialize map when we have location and token
  useEffect(() => {
    if (!mapContainer.current || !location || !mapboxToken) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add marker for user location
      marker.current = new mapboxgl.Marker({ color: "#FF0000" })
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
        
      // Cleanup on unmount
      return () => {
        map.current?.remove();
      };
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Error initializing map. Please check your Mapbox token.");
    }
  }, [location, mapboxToken]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-50 p-4 rounded-lg text-center ${className}`}>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <div className={`bg-primary/5 p-4 rounded-lg ${className}`}>
        <p className="text-center mb-4">Please enter your Mapbox public token to display the map</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Enter Mapbox token" 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            onChange={handleTokenInput}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          You can find your token at <a href="https://mapbox.com/" className="underline" target="_blank" rel="noreferrer">mapbox.com</a> in the tokens section.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="h-64 rounded-lg shadow-sm"></div>
      {location && (
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 p-2 rounded-md text-xs">
          Your current location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
};

export default LocationMap;
