import React, { useEffect, useState } from 'react';

const TotalBudget = () => {
    const [totalCosts, setTotalCosts] = useState(0);

    const gigs = JSON.parse(localStorage.getItem('gigData')) || [];

    useEffect(() => {
        const total = gigs.reduce((acc, gig) => {
            return acc + (gig.ticketPrice || 0) + (gig.transportCosts || 0) + (gig.accommodationCosts || 0) + (gig.otherCosts || 0);
        }, 0);
        setTotalCosts(total);
    }, [gigs]);

    return (
        <article id='total-budget-box'>
            <p>Total Budget: ${totalCosts}</p>
            {/* <p> {totalCosts ? 'Total Budget: $' + totalCosts : null}</p> */}
        </article>
    );
};

export default TotalBudget;
