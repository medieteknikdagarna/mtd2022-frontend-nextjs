import React, { useState } from 'react'
import BookerSVG from '../public/images/platsbokaren.svg'
import { useEffect } from 'react';
import useFetch from './utilities/useFetch';
import Button from './Button';
import {useTransition, animated, config} from 'react-spring'

function setStatusOfSeats(arr, selected){


    const STATUS_COLORS = {
        "available": "#97FF86",
        "reserved": "#FF7C7C",
        "selected": "#FFF280"
    }
    arr.forEach(seat => {
        
        var element = document.getElementById(seat.id)
        if(element === null) return

        if(selected === seat.id && seat.status === "available"){
            element.classList.add("active-seat");
            var color  = "selected"
        }
        else{
            element.classList.remove("active-seat");
            var color  = seat.status;
        }
        element.style.fill = STATUS_COLORS[color];
    });
}


export default function SeatBooker() {
    
    const {data, loading, error} = useFetch("/api/seats")
    const [activeSeat, setSeat] = useState(null);
    const [activeLevel, setLevel] = useState(5);
    const [showPlane5, setShow5] = useState(true);
    const [showPlane4, setShow4] = useState(false);


    const onSeatSelect = (e) =>{
        const id = e.path[0].id;
        setStatusOfSeats(data,id);
        data.forEach((seat) =>{
            if(seat.id === id){
                setSeat(seat)
            }
        })
    }

    const handleOnChange = (e) =>{
        let n = e.target.value-1
        if(n < 0){
            n = 0
        }
        else if (n >= data.length){
            n = data.length-1
        }

        const seat = data[n]

        
        setSeat(seat)
        setStatusOfSeats(data,seat.id)
    }

    useEffect(() => {

        if(data !== null){
            setSeat(data[0])
            setStatusOfSeats(data,data[0].id)
            for(var i = 0; i< data.length; i++){
                document.getElementById(data[i].id).addEventListener("click", onSeatSelect);
            }
        }
    }, [data])
    return (
        <section className="seat-booking-section">
        <div className="seat-booker">
        <BookerSVG className="booker"/>
            {activeSeat && data &&
            <div className="form-info">
                <h2>{"Plats #" + activeSeat.seat}</h2>
                <div className="indicator">
                    <div style={{backgroundColor: activeSeat.status === "reserved" ? "#FF7C7C" : "#97FF86"}} className="indicator--icon"></div>
                    <h4>{activeSeat.status === "reserved" ? "Reserverad" : "Ledig"}</h4>
                </div>
                    <div className="seat-info">
                        <span>{activeSeat.type}</span>
                        <span>{"Plan " + activeLevel}</span>
                        <span>fr. 14 999 SEK</span>
                    </div>
                    <div className="booking-form">
                        <div className="flex-input">
                            <div >
                                <label>Plats</label><br/>
                                <input onChange={handleOnChange} type="number" min={1} max={data.length} value={activeSeat.seat} />
                            </div>
                            <div className="div-radio">
                                <label>Plan 4</label>
                                <input className="input-radio" type="radio" checked={activeLevel===4} onClick={() => setLevel(4)}/>
                                <label>Plan 5</label>
                                <input className="input-radio" type="radio" checked={activeLevel===5} onClick={() => setLevel(5)}/>
                            </div>
                        </div>
                        <label>Kontaktperson</label>
                        <input type="text"/>
                        <label>Företag</label>
                        <input type="text"/>
                        <label>Email</label>
                        <input type="email"/>
                        <label>Telefonnummer</label>
                        <input type="tel"/>
                        <span>Denna reservation är inte bindande. Vi kommer att kontakta er för att bekräfta bokningen så fort vi kan</span>
                        <Button style={{width: "100%", fontSize: "1.5rem"}} type="primary" size="medium">RESERVERA</Button>
                    
                </div>
            </div>}

        </div>
        </section>
    )
}
