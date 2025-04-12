import { X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Details from './Details';
import FestivalArtistDetails from './FestivalArtistsDetails'
import TravelExpensesDetails from './TravelExpensesDetails'
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

const DetailsModal = ({ gig, isClicked, setIsClicked }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    const closeModal = () => {
        setIsClicked(!isClicked);
    };

    // Generar tabs y paneles dinámicamente
    const tabs = [
        { label: 'Details', component: <Details gig={gig} /> }
    ];

    if (gig.isFestival) {
        tabs.push({ label: 'Festival Artists', component: <FestivalArtistDetails gig={gig} /> });
    }

    if (gig.isAbroad) {
        tabs.push({ label: 'Travel Expenses', component: <TravelExpensesDetails gig={gig} /> });
    }

    return (
        <>
            <section id="details-modal-overlay">
                <section id="details-modal-box">
                    <section id="modal-header">
                        <div>
                            <h4>{gig.artist}</h4>
                            <p>{gig.venue}, {gig.city}</p>
                        </div>
                        <div onClick={closeModal}>
                            <X />
                        </div>
                    </section>

                    <Box sx={{ borderColor: 'divider', width: '100%', minWidth: '50%', scrollBehavior: 'auto', margin: '0 auto' }} className="box1">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="gig details tabs"
                            className='tabs'
                        >
                            {tabs.map((tab, index) => (
                                <Tab label={tab.label} key={index} {...a11yProps(index)} />
                            ))}
                        </Tabs>
                    </Box>

                    <Box>
                        {tabs.map((tab, index) => (
                            <CustomTabPanel value={value} index={index} key={index}>
                                {tab.component}
                            </CustomTabPanel>
                        ))}
                    </Box>
                </section>
            </section>
        </>
    );
};


export default DetailsModal