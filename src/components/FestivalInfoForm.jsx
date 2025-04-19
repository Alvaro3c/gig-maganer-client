import React, { useState } from 'react';
import { Music } from "lucide-react";

const FestivalInfoForm = ({ handleDataChange, gigData }) => {
    const [addArtistIsClicked, setAddArtistIsClicked] = useState(false);

    // Only add a new input if the last artist is not empty
    const addInputs = (e) => {
        e.preventDefault();
        const lastArtist = gigData.festivalArtists[gigData.festivalArtists.length - 1];

        if (lastArtist && lastArtist.trim() !== '') {
            const updatedArtists = [...gigData.festivalArtists, ''];
            handleDataChange({
                target: {
                    name: 'festivalArtists',
                    type: 'text',
                    value: updatedArtists
                }
            });
        }
    };

    const handleArtistChange = (index, value) => {
        const updatedArtists = [...gigData.festivalArtists];
        updatedArtists[index] = value;
        handleDataChange({
            target: {
                name: 'festivalArtists',
                type: 'text',
                value: updatedArtists
            }
        });
    };


    const handleCancel = () => {
        // Reset festivalArtists to an empty array
        handleDataChange({
            target: {
                name: 'festivalArtists',
                type: 'text',
                value: [] // Set it back to an empty array
            }
        });

        // Hide the input form and set it to one empty input
        setAddArtistIsClicked(false);
    };

    const handleClickAddArtist = () => {
        if (!addArtistIsClicked && gigData.festivalArtists.length === 0) {
            handleDataChange({
                target: {
                    name: 'festivalArtists',
                    type: 'text',
                    value: [''] // Start with one empty input
                }
            });
        }
        setAddArtistIsClicked(!addArtistIsClicked);
    };
    const festivalArtists = gigData.festivalArtists || [];
    const isAddButtonDisabled = festivalArtists > 0 &&
        gigData.festivalArtists[gigData.festivalArtists.length - 1].trim() === '';

    const noFestivalArtistAddedMessage = (
        <article id="no-festival-artist-added-message">
            <Music className='icon' />
            <h4>No artists added yet</h4>
            <p>Click "Add Artists" to add performers you want to see</p>
        </article>
    );

    const addFestivalArtistsForm = (
        <article>
            <h4>Add festival Artist</h4>
            <p>Fill in the artist's name to add another performer.</p>
            <form onSubmit={(e) => e.preventDefault()}>
                {gigData.festivalArtists.map((artist, index) => (
                    <div key={index}>
                        <label htmlFor={`artist-${index}`} className='festival-artists-labels'>
                            Artist Name
                        </label>
                        <input
                            type="text"
                            id={`artist-${index}`}
                            className='festival-artists-inputs'
                            placeholder='Enter Artist name'
                            value={artist}
                            onChange={(e) => handleArtistChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <div id='festival-artists-buttons'>
                    <button
                        id='cancel-btn'
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        id='add-artist-input'
                        type="button"
                        onClick={addInputs}
                        disabled={isAddButtonDisabled} // Disable if last input is empty
                    >
                        Add Another Artist
                    </button>
                </div>
            </form>
        </article>
    );

    return (
        <>
            <section id="header">
                <h4>Festival artists</h4>
                <button
                    id='add-festival-artist-btn'
                    type="button"
                    onClick={handleClickAddArtist}
                >
                    {addArtistIsClicked ? 'Hide Form' : 'Add Festival Artist'}
                </button>
            </section>
            <section id="festival-artists">
                {addArtistIsClicked ? addFestivalArtistsForm : noFestivalArtistAddedMessage}
            </section>
        </>
    );
};

export default FestivalInfoForm;
