import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

const BasicInfoForm = ({ handleDataChange, gigData, value, setValue }) => {
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);

    // Manejar cambio en fecha de inicio
    const handleStartDateChange = (newDate) => {
        const formattedDate = newDate.format('MMM D, YYYY');
        handleDataChange({
            target: {
                name: 'startDate',
                value: formattedDate
            }
        });
        setShowStartCalendar(false);
    };

    // Manejar cambio en fecha de finalización
    const handleEndDateChange = (newDate) => {
        const formattedDate = newDate.format('MMM D, YYYY');
        handleDataChange({
            target: {
                name: 'endDate',
                value: formattedDate
            }
        });
        setShowEndCalendar(false);
    };



    return (
        <form action="">
            <label>Artist/Festival Name</label>
            <input
                type="text"
                name='artist'
                value={gigData.artist || ''}
                onChange={handleDataChange} />
            <label>Venue</label>
            <input
                type="text"
                name='venue'
                value={gigData.venue}
                onChange={handleDataChange} />
            <label>City</label>
            <input
                type="text"
                name='city'
                value={gigData.city}
                onChange={handleDataChange} />
            <label>Ticket price ($)</label>
            <input
                type="number"
                name='ticketPrice'
                value={gigData.ticketPrice}
                onChange={(e) => {
                    // Convert the string to a number
                    handleDataChange({
                        target: {
                            name: e.target.name,
                            value: Number(e.target.value)
                        }
                    });
                }} />

            {/* Start Date */}
            <section id="calendar-input-container">
                <div className='label-calendar-group'>
                    <label>{gigData.isFestival ? 'Start Date' : 'Date'}</label>
                    <div
                        onClick={() => setShowStartCalendar(!showStartCalendar)}
                        className="date-input"
                    >
                        📅 {gigData.startDate || 'Select date'}
                    </div>
                    {showStartCalendar && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={gigData.startDate ? dayjs(gigData.startDate) : dayjs()}
                                onChange={handleStartDateChange}
                                sx={{
                                    background: "#1E1E1E",
                                    color: "white",
                                    "& .MuiPickersCalendarHeader-label": { color: "white", fontSize: "1.2rem" },
                                    "& .MuiDayCalendar-weekDayLabel": { color: "white !important", opacity: 1 },
                                    "& .MuiPickersDay-root": { color: "white", "&.Mui-selected": { background: "#06b6d4" } },
                                }}
                            />
                        </LocalizationProvider>
                    )}
                </div>

                <div className='label-calendar-group'>
                    {/* End date */}
                    {gigData.isFestival && (
                        <>
                            <label>End Date</label>
                            <div
                                onClick={() => setShowEndCalendar(!showEndCalendar)}
                                className="date-input"
                            >
                                📅 {gigData.endDate || 'Select date'}
                            </div>
                            {showEndCalendar && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar
                                        value={gigData.endDate ? dayjs(gigData.endDate) : dayjs(gigData.startDate)}
                                        onChange={handleEndDateChange}
                                        sx={{
                                            background: "#1E1E1E",
                                            color: "white",
                                            position: 'relative',
                                            left: '-100%',
                                            "& .MuiPickersCalendarHeader-label": { color: "white", fontSize: "1.2rem" },
                                            "& .MuiDayCalendar-weekDayLabel": { color: "white !important", opacity: 1 },
                                            "& .MuiPickersDay-root": { color: "white", "&.Mui-selected": { background: "#06b6d4" } }
                                        }}
                                    />
                                </LocalizationProvider>
                            )}
                        </>
                    )}
                </div>
            </section>

            <section id="checkbox-container">
                <div>
                    <input type="checkbox"
                        id="festival"
                        name='isFestival'
                        checked={gigData.isFestival}
                        onChange={handleDataChange}
                    />
                    <label htmlFor="festival">This is a festival</label>
                </div>
                <div>
                    <input
                        id="have-tickets"
                        type="checkbox"
                        name='haveTickets'
                        checked={gigData.haveTickets}
                        onChange={handleDataChange}
                    />
                    <label htmlFor="have-tickets">I already have tickets</label>
                </div>
                <div>
                    <input
                        id="out-of-town"
                        type="checkbox"
                        name='isAbroad'
                        checked={gigData.isAbroad}
                        onChange={handleDataChange}

                    />
                    <label htmlFor="out-of-town">This gig is out of town (requires travel)</label>
                </div>
            </section>
        </form>
    );
};

export default BasicInfoForm;