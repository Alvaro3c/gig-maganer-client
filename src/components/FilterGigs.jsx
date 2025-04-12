import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import GigsTable from './GigsTable';
import TotalBudget from './TotalBudget';
import { useEffect } from 'react';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        display: value === index ? 'block' : 'none', // Esto asegura que solo se muestre el contenido activo
      }}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

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
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [filterText, setFilterText] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //check if there are gigs
  const getGigs = () => {
    return JSON.parse(localStorage.getItem('gigData') || '[]');
  };


  const noGigsMessage = (
    <div id="no-gigs-message-box">
      <h3>No Gigs Available</h3>
      <p>Currently, there are no gigs available. Please check back later.</p>
    </div>
  );
  return (
    <>
      <div>
        <Box sx={{ borderColor: 'black', width: '100%' }} className="box1">
          <Tabs value={value} onChange={handleChange} className="tabs">
            <Tab label="All gigs" {...a11yProps(0)} className="tab" />
            <Tab label="Want to go" {...a11yProps(1)} />
            <Tab label="Have Tickets" {...a11yProps(2)} />
            <Tab label="Festivals" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <input
          type="text"
          id="filter-input"
          placeholder="Filter artists..."
          value={filterText || ''}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Box className="box2">
          <CustomTabPanel value={value} index={0}>
            {getGigs().length > 0 ? (
              <section>
                <GigsTable filterText={filterText} />
                <TotalBudget />
              </section>
            ) : (
              noGigsMessage
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {getGigs().length > 0 ? (
              <section>
                <GigsTable
                  filterFn={(gig) => !gig.haveTickets}
                  filterText={filterText} />
                <TotalBudget />
              </section>
            ) : (
              noGigsMessage
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {getGigs().length > 0 ? (
              <section>
                <GigsTable
                  filterFn={(gig) => gig.haveTickets}
                  filterText={filterText} />
                <TotalBudget />
              </section>
            ) : (
              noGigsMessage
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {getGigs().length > 0 ? (
              <section>
                <GigsTable
                  filterFn={(gig) => gig.isFestival}
                  filterText={filterText} />
                <TotalBudget />
              </section>
            ) : (
              noGigsMessage
            )}
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}
