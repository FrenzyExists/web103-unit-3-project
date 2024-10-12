import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import EventsAPI from '../services/EventsAPI'
import dates from '../utils/dates'

const Event = (props) => {
    const [event, setEvent] = useState([])
    const [time, setTime] = useState('')
    const [remaining, setRemaining] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(props.id)
                setEvent(eventData)
            } catch (error) {
                throw error
            }
        })()
    }, [props.id])

    useEffect(() => {
        if (event.time) {
            (async () => {
                try {
                    console.log(event);
                    
                    const result = event.date
                    setTime(result)
                } catch (error) {
                    throw error
                }
            })()
        }
    }, [event.time])

    useEffect(() => {
        if (event.remaining) {
            (async () => {
                try {
                    const timeRemaining = dates.formatRemainingTime(event.remaining)
                    setRemaining(timeRemaining)
                    dates.formatNegativeTimeRemaining(timeRemaining, event.id)
                } catch (error) {
                    throw error
                }
            })()
        }
    }, [event.remaining, event.id])

    return (
        <article className='event-information'>
            <img src={event.image} alt="Event" />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.title}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {time} <br /></p>
                    <p id={`remaining-${event.id}`}>{remaining}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
