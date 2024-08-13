import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../../App.css';

mapboxgl.accessToken = 'pk.eyJ1IjoicnVtaXJ1bWkiLCJhIjoiY2x6c29rdjlwMGt5bzJrb250emZjdTMwYyJ9.-6GZ8d2ldrKN-2xhPo8S8Q'; 

function MapboxMap ({ city, zoom = 8 }) {
    const [center, setCenter] = useState([0, 0]);

    useEffect(() => {
        if (city) {
        // Fetch coordinates for the city using Mapbox Geocoding API
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapboxgl.accessToken}`)
            .then(response => response.json())
            .then(data => {
            if (data.features.length > 0) {
                const [lng, lat] = data.features[0].geometry.coordinates;
                setCenter([lng, lat]);
            }
            })
            .catch(error => console.error('Error fetching city coordinates:', error));
        }
    }, [city]);

    useEffect(() => {
        if (center[0] !== 0) {
        const map = new mapboxgl.Map({
            container: 'map', // ID of the HTML element
            style: 'mapbox://styles/mapbox/streets-v11', // Map style
            center, // [longitude, latitude]
            zoom, // Initial zoom level
        });

        // Add a marker for the city
        new mapboxgl.Marker()
            .setLngLat(center)
            .setPopup(new mapboxgl.Popup().setText(city))
            .addTo(map);

        // Clean up the map on component unmount
        return () => map.remove();
        }
    }, [center, city, zoom]);

    return <div id="map" className="map-container" />;
};

export default MapboxMap;
