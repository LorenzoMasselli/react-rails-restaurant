import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './Bookings.css'


function NewBookingForm() {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    const [note, setNote] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [isValid, setIsValid] = useState(false);

    // This effect runs when 'data' changes
    useEffect(() => {
    // If there is data, the form is valid
    setIsValid(quantity && time);
    }, [quantity, time]);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setConfirmed(false)

        const bookingData = { name, quantity, phone, email, confirmed, time, date, note }

        const response = await fetch(import.meta.env.VITE_API_KEY, {
            method: "Post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(bookingData)
        })

        if (response.ok) {
            const { id } = await response.json()
            navigate(`/bookings/${id}`)
        } else {
            console.log("An error occured")
        }
    }

    return (
        <div className="align-form">
           <div className="form-container">
           <h2>Request a new booking</h2>
           <form onSubmit={handleSubmit}>
                <input type="hidden" name="confirmed" value={confirmed} />
                <div className="name">
                    {/* <label htmlFor="nameInput">Full name: </label> */}
                    <input 
                        type="text" 
                        id="nameInput"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Full Name*"
                        />
                </div>
                <div className="phone">
                    {/* <label htmlFor="phoneInput">Phone: </label> */}
                    <input 
                        type="text" 
                        id="phoneInput"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="Phone Number*"
                        />
                </div>
                <div className="email">
                    {/* <label htmlFor="emailInput">Email: </label> */}
                    <input 
                        type="text" 
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email Address*"
                        />
                </div>
                <div className="date-time">
                    <div className="date">
                        {/* <label htmlFor="dateInput">Date (format: yyyy/mm/dd): </label> */}
                        <input 
                            type="date" 
                            id="dateInput"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            />
                    </div>
                    <div className="quantity">
                    {/* <label htmlFor="quantityInput">Number of people: </label> */}
                        <select 
                            id="quantityInput"
                            value={quantity || "Number of people*"}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                            
                        >
                            <option disabled>Number of people*</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        {/* {!quantity && <p>Please select a number of people.</p>} */}
                </div>
                    <div className="time">
                        {/* <label htmlFor="timeInput">Time: </label> */}
                            <select 
                                type="text" 
                                id="timeInput"
                                value={time || "time"}
                                onChange={(e) => setTime(e.target.value)}
                                required
                                
                            >
                                <option value="time" disabled>Time*</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="13:30">13:30</option>
                                <option value="14:00">14:00</option>
                                <option value="14:30">14:30</option>
                                <option value="15:00">15:00</option>
                                <option value="15:30">15:30</option>
                                <option value="16:00">16:00</option>
                                <option value="16:30">16:30</option>
                                <option value="17:00">17:00</option>
                                <option value="17:30">17:30</option>
                                <option value="18:00">18:00</option>
                                <option value="18:30">18:30</option>
                                <option value="19:00">19:00</option>
                                <option value="19:30">19:30</option>
                                <option value="20:00">20:00</option>
                                <option value="20:30">20:30</option>
                                <option value="21:00">21:00</option>
                            </select>
                            {/* {!time && <p>Please select a time.</p>} */}
                    </div>
                </div>
                <div className="note">
                    {/* <label htmlFor="noteInput">notes: </label> */}
                    <textarea 
                        id="noteInput"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Dietary Restrictions / Reservation Notes"
                        />
                </div>
                <div>
                    <button className="form-button" type="submit" disabled={!isValid}>Create a booking</button>
                </div>
           </form>
        </div>
        </div>
    )
}

export default NewBookingForm