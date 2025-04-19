import React, { useEffect, useState, useContext } from 'react';
import { TicketCheck, TicketSlash, Guitar, X, ReceiptText, ChevronDown, ChevronUp } from "lucide-react";
import { GigDataContext } from '../contexts/GigDataContext';

const Gig = ({ filterFn, setSelectedGig, selectedGig, isClicked, setIsClicked, filterText }) => {
    const [gigs, setGigs] = useState([]);
    const [expandedGigIndex, setExpandedGigIndex] = useState(null);
    const { gigData, setGigData } = useContext(GigDataContext);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('gigData')) || [];
        if (JSON.stringify(data) !== JSON.stringify(gigs)) {
            setGigs(data);
        }
    }, [gigData]);

    const filteredGigs = gigs.filter((gig) => {
        const matchesFilter = filterFn ? filterFn(gig) : true;
        const text = filterText?.toLowerCase() || '';
        const matchesText = gig.artist.toLowerCase().includes(text);
        return matchesFilter && matchesText;
    });

    const handleCheckboxChange = (gigToUpdate) => {
        const updatedGigs = gigs.map((gig) =>
            gig === gigToUpdate ? { ...gig, haveTickets: !gig.haveTickets } : gig
        );
        localStorage.setItem('gigData', JSON.stringify(updatedGigs));
        setGigs(updatedGigs);
        setGigData(updatedGigs);
    };

    const handleClickDeleteButton = (gigToUpdate) => {
        const updatedGigs = gigs.filter((gig) => gig !== gigToUpdate);
        localStorage.setItem('gigData', JSON.stringify(updatedGigs));
        setGigs(updatedGigs);
        setGigData(updatedGigs);
    };

    const handleClickModal = (gig) => {
        setIsClicked(!isClicked);
        setSelectedGig(gig);
    };

    const handleClickArrow = (index) => {
        setExpandedGigIndex(prev => prev === index ? null : index);
    };

    return (
        <>
            {filteredGigs.map((gig, index) => (
                <tr key={index}>
                    <td id='artist-data'>
                        <div id="artist-header">
                            <h4>Artists / Festival</h4>
                            {expandedGigIndex === index ? (
                                <ChevronUp
                                    className="arrow-icon"
                                    size={35}
                                    onClick={() => handleClickArrow(index)}
                                />
                            ) : (
                                <ChevronDown
                                    className="arrow-icon"
                                    size={35}
                                    onClick={() => handleClickArrow(index)}
                                />
                            )}

                        </div>
                        <div className='is-festival-status'>
                            <p>{gig.artist}</p>
                            {gig.isFestival && <div>festival</div>}
                            {gig.festivalArtists?.length > 0 && (
                                <div>
                                    <p>{gig.festivalArtists.length}</p>
                                    <Guitar />
                                </div>
                            )}
                        </div>
                    </td>
                    {expandedGigIndex === index && (
                        <>
                            <td id='venue-data'>
                                <h4>Venue</h4>
                                <p>{gig.venue}</p>
                            </td>
                            <td id='city-data'>
                                <h4>City</h4>
                                <div className="is-abroad-status">
                                    <p>{gig.city}</p>
                                    {gig.isAbroad && <div>Travel</div>}
                                </div>
                            </td>
                            <td id='date-data'>
                                <h4>Date</h4>
                                <p>{gig.startDate}</p>
                                {gig.endDate && <p> - {gig.endDate}</p>}
                            </td>
                            <td id='price-data'>
                                <h4>Price</h4>
                                <div className='is-abroad-status'>
                                    <p>{gig.ticketPrice}€</p>
                                    {gig.isAbroad && (
                                        <p id='total-with-tickets'>
                                            Total with tickets: {(gig.accommodationCosts || 0) + (gig.otherCosts || 0) + (gig.transportCosts || 0) + (gig.ticketPrice || 0)}€
                                        </p>
                                    )}
                                </div>
                            </td>
                            <td id='ticket-data'>
                                <h4>Have tickets</h4>
                                <div className="ticket-status">
                                    <input
                                        type="checkbox"
                                        checked={gig.haveTickets}
                                        onChange={() => handleCheckboxChange(gig)}
                                    />
                                    {gig.haveTickets ? <TicketCheck color="#47d040" /> : <TicketSlash color="#cc0000" />}
                                </div>
                            </td>
                        </>
                    )}
                    <td id='details-modal' onClick={() => handleClickModal(gig)}>
                        <ReceiptText color='#06b6d4' />
                        <p>Details</p>
                    </td>
                    <td id="delete-btn" onClick={() => handleClickDeleteButton(gig)}>
                        <X color="#f20202" strokeWidth={1.75} />
                    </td>
                </tr>
            ))}
        </>
    );
};

export default Gig;
