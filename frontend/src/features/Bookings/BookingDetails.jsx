// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { useParams, useNavigate, Link } from 'react-router-dom'

function BookingDetails() {
    const [booking, setBooking] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchCurrentBooking = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_KEY}/${id}`)
                if (response.ok) {
                    const json = await response.json()
                    setBooking(json)
                    setLoading(false)
                } else {
                    throw response
                }
            } catch (e) {
                console.log("An error occured 2")
            } 
        }
        fetchCurrentBooking()
    },[id])

    const deleteBooking = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_KEY}/${id}`, {
            method: "DELETE"
          });
          if (response.ok) {
            navigate("/")
          } else {
            throw response
          }
        } catch(e) {
          console.log(e)
        }
      } 

    if (loading) return <h2>Loading...</h2>
    return (
        <div className='booking-details'>
            <h2>Booking Details</h2>
            <div className='booking-details-content'>
                <div className="personal-content">
                    <h3>Personal Information:</h3>
                    <h4>{booking.name}</h4>
                    <h4>{booking.email}</h4>
                    <h4>{booking.phone}</h4>
                </div>
                <div className="personal-content">
                    <h3>Booking Information:</h3>
                    <h4>Date: {booking.date}</h4>
                    <h4>Time: {booking.time}</h4>
                    <h4>Number of people: {booking.quantity}</h4>
                </div>
                <div className="booking-details-instructions ">
                    <h3>Instructions:</h3>
                    <h4>{booking.note}</h4>
                </div>
            </div>
            <div>
                <Link to="/bookings"><button className='details-buttons'>Back to bookings</button></Link>
                <Link to={`/bookings/${booking.id}/edit`}><button className='details-buttons'>Edit booking</button></Link>
                <button onClick={deleteBooking} className='delete-button'>Delete</button>
            </div>
        </div>
    )
}

export default BookingDetails 