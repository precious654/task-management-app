"use client"

import React from 'react'
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent = () => {
    const [value, onChange] = React.useState<Value>(new Date());

    return (
        <div>
            <Calendar onChange={onChange} value={value} className="react-calendar" />
        </div>
    )
}
export default CalendarComponent
