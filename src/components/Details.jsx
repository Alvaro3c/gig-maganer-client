import React from 'react'
import { TicketCheck, TicketSlash } from 'lucide-react'

const Details = ({ gig }) => {
    const start = new Date(gig.startDate);
    const end = new Date(gig.endDate);

    // Diferencia en milisegundos
    const diffInMs = end - start;

    // Milisegundos en un día
    const msPerDay = 1000 * 60 * 60 * 24;

    // Duración en días (incluye ambos días si quieres sumarle 1)
    const duration = Math.ceil(diffInMs / msPerDay) + 1;


    return (
        <>

            <section id="general-details">
                <div>
                    <article>
                        <h5>Date</h5>
                        <p>{gig.startDate} {gig.endDate ? '  -  ' + gig.endDate : null}</p>
                    </article>
                    <article>
                        <h5>Ticket Status</h5>
                        {gig.haveTickets
                            ? <div><TicketCheck color="#47d040" /><p className='purchased'>Tickets purchased</p></div>
                            : <div><TicketSlash color="tomato" /><p className='not-purchased'>Tickets not purchased</p></div>}
                    </article>
                </div>
                <div>
                    <article>
                        <h5>Ticket Price</h5>
                        <p>{gig.ticketPrice}€</p>
                    </article>

                    {duration
                        ? <article>
                            <h5>Duration</h5>
                            <p>{duration > 0 ? duration + ' days' : null}</p>
                        </article>
                        : null
                    }
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

export default Details