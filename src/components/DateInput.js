import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({ selected, onChange }) {
    return (
        <DatePicker selected={selected} onChange={onChange} />
    )
}
