import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import FilterGigs from '../components/FilterGigs'
import AddGig from '../components/AddGig'
import { CirclePlus } from "lucide-react";


/* SE TRATA DE UNA PREVIEW, LOS DATOS SE PIERDEN AL RECARGAR */
const DashboardPreview = () => {
    const [addGigClicked, setAddGigClicked] = useState(false)
    const [hasGigs, setHasGigs] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        setAddGigClicked(true)
    }
    const navigateToHome = () => {
        navigate('/')
    }

    useEffect(() => {
        // Check if there are any gigs when the component mounts
        const gigsFromStorage = JSON.parse(localStorage.getItem('gigData')) || [];
        setHasGigs(gigsFromStorage.length !== 0); // Set `hasGigs` based on length of gigs
    }, []);
    return (
        <>
            <div className="dashboard-wrapper">
                <header>
                    <section id="upper-heading">
                        <h2 id='dashboard-h1'>Gig Organizer Preview</h2>
                        <button onClick={navigateToHome}>back to home</button>
                    </section>
                    <section id="description">
                        <p>This is a preview of the Gig Organizer app. Your data will be stored locally in your browser.</p>
                    </section>
                </header>
                <main>
                    <FilterGigs
                        hasGigs={hasGigs}
                        setHasGigs={setHasGigs}

                    />
                    {!addGigClicked ?
                        <button
                            id='add-gig-btn'
                            onClick={handleClick}
                        >
                            <CirclePlus />Add gig</button> :
                        <AddGig
                            hasGigs={hasGigs}
                            setHasGigs={setHasGigs}
                            addGigClicked={addGigClicked}
                            setAddGigClicked={setAddGigClicked}

                        />}
                </main>
                {/* Componente footer */}
            </div>
        </>
    )
}

export default DashboardPreview