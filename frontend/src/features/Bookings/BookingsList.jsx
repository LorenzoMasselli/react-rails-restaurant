// API comes from .env.development file 
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import './BookingsList.css'

function BookingsList() {
    const [bookings, setBookings] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null)
    //  fetch bookings from API
    useEffect(() => {
        async function loadBookings() {
            try {
                const response = await fetch(import.meta.env.VITE_API_KEY)
                if (response.ok) {
                    const json = await response.json()
                    setBookings(json)
                } else {
                    throw response
                } 
            } catch (e) {
                setError("An error occured 1");
                console.log("An error occured 2")
            } finally {
                setLoading(false)
            }
        }
        loadBookings()
    }, [])
    return (
        <div>
            {bookings.map((booking) => (
                <div key={booking.id} className='booking-container'>
                    <h2>{booking.name}</h2>
                    <h2>{booking.quantity} people</h2>
                    <h3>{booking.email}</h3>
                </div>
            ))}
        </div>
    )

}

export default BookingsList