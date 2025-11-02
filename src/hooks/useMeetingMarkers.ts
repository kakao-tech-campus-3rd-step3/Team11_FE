import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import type { Meeting } from '@/types/meeting';
import MeetingIcon from '@/components/home_page/MeetingIcon';

export const useMeetingMarkers = (
  map: any,
  meetings: Meeting[],
  onMarkerClick: (meeting: Meeting) => void,
) => {
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    //markersRef.current = [];

    if (!map || !window.kakao || !Array.isArray(meetings)) return;

    const newMarkers = meetings.map((meeting) => {
      const position = new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude);
      const markerContainer = document.createElement('div');
      markerContainer.className = 'custom-div-icon';
      markerContainer.style.cursor = 'pointer';
      markerContainer.onclick = () => onMarkerClick(meeting);

      const pinElement = document.createElement('div');
      pinElement.className = 'marker-pin';
      markerContainer.appendChild(pinElement);

      ReactDOM.createRoot(pinElement).render(
        React.createElement(MeetingIcon, {
          category: meeting.category,
          className: 'marker-icon',
        }),
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerContainer,
        yAnchor: 1,
      });
      customOverlay.setMap(map);
      return customOverlay;
    });

    markersRef.current = newMarkers;
  }, [map, meetings, onMarkerClick]);
};
