import React, { useEffect, useState, useContext } from 'react'
import { TicketCheck, TicketSlash, Guitar, X, ReceiptText } from "lucide-react";
import { GigDataContext } from '../contexts/GigDataContext';


const Gig = ({ filterFn, setSelectedGig, selectedGig, isClicked, setIsClicked, filterText }) => {
    //Los datos que se guardan en el local storage
    const [gigs, setGigs] = useState([]);
    //conexto que se usa en AddGig, datos del formulario
    const { gigData, setGigData } = useContext(GigDataContext);

    //Gets items from local storage everytime gigData is changed
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('gigData')) || [];
        if (JSON.stringify(data) !== JSON.stringify(gigs)) {
            setGigs(data)
        }
    }, [gigData]);

    //Filters data based on the selected tab
    //const filteredGigs = filterFn ? gigs.filter(filterFn) : gigs;
    const filteredGigs = gigs.filter((gig) => {
        const matchesFilter = filterFn ? filterFn(gig) : true;
        const text = filterText?.toLowerCase() || ''; // fallback para evitar el error
        const matchesText = gig.artist.toLowerCase().includes(text);
        return matchesFilter && matchesText;
    });


    //Checkbox thats inside the table to showcase if user has tickets or not
    const handleCheckboxChange = (gigToUpdate) => {
        const updatedGigs = gigs.map((gig) => {
            if (gig === gigToUpdate) {
                return { ...gig, haveTickets: !gig.haveTickets };
            }
            return gig;
        });

        localStorage.setItem('gigData', JSON.stringify(updatedGigs));
        setGigs(updatedGigs);
        setGigData(updatedGigs); // también actualiza el contexto si lo necesitas
    }

    const handleClickDeleteButton = (gigToUpdate) => {
        const updatedGigs = gigs.filter((gig) => gig !== gigToUpdate); // Ensure you return the filtered array

        localStorage.setItem('gigData', JSON.stringify(updatedGigs));
        setGigs(updatedGigs);
        setGigData(updatedGigs);
    }

    const handleClickModal = (gig) => {
        setIsClicked(!isClicked)
        setSelectedGig(gig)
    }
    return (
        <>
            {filteredGigs.map((gig, index) =>
                <tr key={index}>
                    <td>
                        <h4>Artists / Festival</h4>
                        <div className='is-festival-status'>
                            {gig.artist}
                            {gig.isFestival ? <div>festival</div> : null}
                            {gig.festivalArtists?.length > 0 ? ( // Use optional chaining here
                                <div>
                                    <p>{gig.festivalArtists.length}</p>
                                    <Guitar />
                                </div>
                            ) : null}
                        </div>
                    </td>
                    <td>
                        <h4>Venue</h4>
                        {gig.venue}</td>
                    <td className='check-status'>
                        <h4>City</h4>
                        <div className="is-abroad-status ">
                            {gig.city}
                            {gig.isAbroad
                                ? <div>Travel</div>
                                : null
                            }
                        </div>
                    </td>
                    <td>
                        <h4>Date</h4>
                        {gig.startDate} {gig.endDate ? ' - ' + gig.endDate : null}</td>

                    <td>
                        <h4>Price</h4>
                        <div className='is-abroad-status '>
                            {gig.ticketPrice}€
                            {gig.isAbroad
                                ? <p id='total-with-tickets'>
                                    Total with tickets: {(gig.accommodationCosts || 0) + (gig.otherCosts || 0) + (gig.transportCosts || 0) + (gig.ticketPrice || 0)}€
                                </p>
                                : null}
                        </div>
                    </td>
                    <td>
                        <h4>I have tickets</h4>
                        <div className="ticket-status">
                            <input
                                type="checkbox"
                                checked={gig.haveTickets}
                                onChange={() => handleCheckboxChange(gig)}
                            />
                            {gig.haveTickets
                                ? <TicketCheck color="#47d040" />
                                : <TicketSlash color="#cc0000" />}
                        </div>
                    </td>
                    <td
                        id='details-modal'
                        onClick={() => { handleClickModal(gig) }}
                    >
                        <ReceiptText color='#06b6d4' />
                    </td>
                    <td
                        id="delete-btn"
                        onClick={() => { handleClickDeleteButton(gig) }}>
                        <X color="#f20202" strokeWidth={1.75} />
                    </td>
                </tr>
            )}

        </>
    )
}

export default Gig