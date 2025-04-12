import React, { useContext, useEffect, useState } from 'react';
import { GigDataContext } from '../contexts/GigDataContext'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BasicInfoForm from './BasicInfoForm';
import FestivalInfoForm from './FestivalInfoForm';
import TravelExpensesForm from './TravelExpensesForm';
import NotesForm from './NotesForm';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export default function AddGig({ addGigClicked, setAddGigClicked, hasGigs, setHasGigs }) {
    const [value, setValue] = useState(0);
    const { gigData, setGigData } = useContext(GigDataContext)

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    //Recoge los datos de los inputs para introducirlos a gigData
    const handleDataChange = (e) => {
        const { name, type, value, checked } = e.target;

        // Capitalize Words for artist, venue, city and festival artists
        const capitalizeWords = (str) =>
            str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        let newValue = value;

        // Capitalize if the field is one of the following
        if (name === 'artist' || name === 'venue' || name === 'city') {
            newValue = capitalizeWords(value);
        }

        // If festivalArtists is being updated, capitalize each artist name in the array
        if (name === 'festivalArtists') {
            newValue = value.map(artist => capitalizeWords(artist));
        }

        // Update the state
        setGigData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : newValue
        }));
    };

    //sube gigData a local storage
    const uploadGigDataOnLocalStorage = (e) => {
        e.preventDefault();
        const exsitingGigs = JSON.parse(localStorage.getItem('gigData')) || [];
        const updatedGigs = [...exsitingGigs, gigData]
        localStorage.setItem('gigData', JSON.stringify(updatedGigs));
        let loadedGig = JSON.parse(localStorage.getItem('gigData'))
        console.log('gig has been loaded to local storage. This is the result: ' + loadedGig)
        const gigsFromStorage = updatedGigs;
        setHasGigs(gigsFromStorage.length > 0); // Update the `hasGigs` state
        setAddGigClicked(false); // Close the form after saving
        setGigData(
            {
                artist: '',
                venue: '',
                city: '',
                ticketPrice: 0,
                startDate: '',
                endDate: '',
                isFestival: false,
                haveTickets: false,
                isAbroad: false,
                festivalArtists: [],
                transportCosts: 0,
                accommodationCosts: 0,
                otherCosts: 0,
                notes: ''
            })
    }

    const closeForm = () => {
        setAddGigClicked(!addGigClicked)
        setGigData(
            {
                artist: '',
                venue: '',
                city: '',
                ticketPrice: 0,
                startDate: '',
                endDate: '',
                isFestival: false,
                haveTickets: false,
                isAbroad: false,
                festivalArtists: [],
                transportCosts: 0,
                accommodationCosts: 0,
                otherCosts: 0,
                notes: ''
            })
    }

    //if gig is abroad, travel expenses tab opens
    useEffect(() => {
        if (gigData.isAbroad) {
            setValue(2)
        }
    }, [gigData.isAbroad])

    return (
        <>
            <div className="form-container">
                <h3>Add gig</h3>
                <Box sx={{ borderColor: 'divider', width: '100%', scrollBehavior: 'auto' }} className="box1">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className='tabs'
                    >
                        <Tab
                            label="Basic info"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Festival Artists"
                            {...a11yProps(1)} disabled={!gigData.isFestival} />
                        <Tab
                            label="Travel Expenses"
                            {...a11yProps(2)} disabled={!gigData.isAbroad}
                        />
                        <Tab
                            label="Notes"
                            {...a11yProps(3)}
                        />
                    </Tabs>
                </Box>
                <Box >
                    <CustomTabPanel value={value} index={0}>
                        <BasicInfoForm
                            handleDataChange={handleDataChange}
                            gigData={gigData}
                            value={value}
                            setValue={setValue} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <FestivalInfoForm
                            handleDataChange={handleDataChange}
                            gigData={gigData}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <TravelExpensesForm
                            handleDataChange={handleDataChange}
                            gigData={gigData} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <NotesForm
                            handleDataChange={handleDataChange}
                            gigData={gigData} />
                    </CustomTabPanel>
                </Box >
                <section id="button-container">
                    <button
                        type="button"
                        id='cancel-btn'
                        onClick={closeForm}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        id='save-gig-btn'
                        onClick={uploadGigDataOnLocalStorage}>
                        Save Gig
                    </button>
                </section>
            </div>
        </>
    );
}
