import React, { useContext, useState } from 'react';
import { GigDataContext } from '../contexts/GigDataContext'
const totalTravelBudget = () => {
    const { gigData, setGigData } = useContext(GigDataContext)
    const totalTravelExpenses = (gigData.transportCosts || 0) + (gigData.accommodationCosts || 0) + (gigData.otherCosts || 0)
    const totalCosts = (gigData.ticketPrice || 0) + (totalTravelExpenses || 0)
    return (
        <>
            <section id='total-travel-budget-box'>
                <p>Total Travel Expenses: {totalTravelExpenses}€</p>
                <p>+ {gigData.ticketPrice}€ ticket price = {totalCosts}€ total</p>
            </section>
        </>
    )
}

export default totalTravelBudget