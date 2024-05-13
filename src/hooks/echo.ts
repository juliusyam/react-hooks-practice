import { useEffect, useMemo, useState } from 'react';
import Echo from 'laravel-echo';
import { Flight, FlightResponse, UserResponse } from '../models/apiModel.ts';

export function useEcho(userResponse: UserResponse | null) {
// State variable to store the latest event
  const [newFlightEvent, setNewFlightEvent] = useState<Flight | null>(null);
  const [updatedFlightEvent, setUpdatedFlightEvent] = useState<Flight | null>(null);
  const [deletedFlightEvent, setDeletedFlightEvent] = useState<Flight | null>(null);
  const [newPrivateFlightEvent, setNewPrivateFlightEvent] = useState<Flight | null>(null);
  const [updatedPrivateFlightEvent, setUpdatedPrivateFlightEvent] = useState<Flight | null>(null);
  const [deletedPrivateFlightEvent, setDeletedPrivateFlightEvent] = useState<Flight | null>(null);

  const options = {
    broadcaster: 'reverb',
    key: 'my-app-key',
    wsHost: 'localhost',
    wsPort: '8080',
    wssPort: '8080',
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  }

  const echo = useMemo(() => new Echo(userResponse ? {
    ...options,
    auth: {
      headers: {
        Authorization: `Bearer ${ userResponse.token }`,
        Accept: 'application/json',
      },
    }
  } : options), [userResponse]);

  useEffect(() => {
    const publicFlightsChannel = echo.channel('flights')
      .listen('NewFlightAdded', (e: FlightResponse) => {
        console.log(e.flight);
        // Update the latest event in state
        setNewFlightEvent(e.flight);
        setUpdatedFlightEvent(null);
        setDeletedFlightEvent(null);
      })
      .listen('FlightUpdated', (e: FlightResponse) => {
        console.log(e.flight);
        // Update the latest event in state
        setUpdatedFlightEvent(e.flight);
        setNewFlightEvent(null);
        setDeletedFlightEvent(null);
      })
      .listen('FlightDeleted', (e: FlightResponse) => {
        console.log(e.flight);
        // Update the latest event in state
        setDeletedFlightEvent(e.flight);
        setNewFlightEvent(null);
        setUpdatedFlightEvent(null);
      });

    return () => {
      // Unsubscribe from the channel when the component unmounts
      publicFlightsChannel
        .stopListening('NewFlightAdded')
        .stopListening('FlightUpdated')
        .stopListening('FlightDeleted');
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (userResponse) {
      const newFlightsPrivateChannel = echo.private(`flights-private.${ userResponse.user.id }`)
        .listen('NewFlightAdded', (e: FlightResponse) => {
          console.log('Private channel', e.flight);
          setNewPrivateFlightEvent(e.flight);
          setUpdatedPrivateFlightEvent(null);
          setDeletedPrivateFlightEvent(null);
        });

        const flightUpdatedPrivateChannel = echo.private(`flights-private.${ userResponse.user.id }`)
        .listen('FlightUpdated', (e: FlightResponse) => {
          console.log('Private channel', e.flight);
          setUpdatedPrivateFlightEvent(e.flight);
          setNewPrivateFlightEvent(null);
          setDeletedPrivateFlightEvent(null);
        });

        const flightDeletedPrivateChannel = echo.private(`flights-private.${ userResponse.user.id }`)
        .listen('FlightDeleted', (e: FlightResponse) => {
          console.log('Private channel', e.flight);
          setDeletedPrivateFlightEvent(e.flight);
          setNewPrivateFlightEvent(null);
          setUpdatedPrivateFlightEvent(null);
        });

      return () => {
        // Unsubscribe from the channel when the component unmounts
        newFlightsPrivateChannel.stopListening('NewFlightAdded');
        flightUpdatedPrivateChannel.stopListening('FlightUpdated');
        flightDeletedPrivateChannel.stopListening('FlightDeleted');
      };
    }
  }, [userResponse]);

  return {
    newFlightEvent,
    updatedFlightEvent,
    deletedFlightEvent,
    newPrivateFlightEvent,
    updatedPrivateFlightEvent,
    deletedPrivateFlightEvent,
  }
}
