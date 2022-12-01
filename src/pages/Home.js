import React, { useState } from "react"
import Navbar from "../components/Navbar"

export default function Home() {
    const [isCreator, setIsCreator] = useState(true);

    return (
        <React.Fragment>
            <Navbar isCreator={isCreator}/>
            <p>Home page</p>
        </React.Fragment>
    )
}