import React, { useEffect, useState } from 'react'

const TravelExpensesDetails = ({ gig }) => {
    const [total, setTotal] = useState(0)
    useEffect(() => {
        const total = (gig.ticketPrice || 0) + (gig.transportCosts || 0) + (gig.accommodationCosts || 0) + (gig.otherCosts || 0);

        setTotal(total);
    }, [])
    return (
        <>
            <section id="general-details">

                <div>
                    <article>
                        <h5>Transport</h5>
                        <p>{gig.transportCosts ? gig.transportCosts + '€' : null}</p>
                    </article>
                    <article>
                        <h5>Other Costs</h5>
                        <p>{gig.otherCosts ? gig.otherCosts + '€' : ''}</p>
                    </article>
                </div>
                <div>
                    <article>
                        <h5>Accommodation Costs</h5>
                        <p>{gig.accommodationCosts ? gig.accommodationCosts + '€' : null}</p>
                    </article>
                    <article>
                        <h5>Total Cost</h5>
                        <p>{total}€ </p>
                    </article>
                </div>
            </section>
            <section id="notes">
                <article>
                    <h5>Notes</h5>
                    <p>{gig.notes}</p>
                </article>
            </section>
        </>


    )
}

export default TravelExpensesDetails