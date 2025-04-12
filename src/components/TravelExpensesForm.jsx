import React from 'react'
import TotalTravelBudget from './totalTravelBudget'

const TravelExpensesForm = ({ handleDataChange, gigData }) => {
    return (
        <>
            <form action="">
                <label htmlFor="">Transport costs (€)</label>
                <input
                    type="text"
                    placeholder='0'
                    name='transportCosts'
                    value={gigData.transportCosts}
                    onChange={(e) => {
                        // Convert the string to a number
                        handleDataChange({
                            target: {
                                name: e.target.name,
                                value: Number(e.target.value)
                            }
                        });
                    }}
                />
                <label htmlFor="">Hotel/Accommodation cost(€)</label>
                <input
                    type="text"
                    placeholder='0'
                    name='accommodationCosts'
                    value={gigData.accommodationCosts}
                    onChange={(e) => {
                        // Convert the string to a number
                        handleDataChange({
                            target: {
                                name: e.target.name,
                                value: Number(e.target.value)
                            }
                        });
                    }}
                />
                <label htmlFor="">Other Costs (€)</label>
                <input
                    type="text"
                    placeholder='0'
                    name='otherCosts'
                    value={gigData.otherCosts}
                    onChange={(e) => {
                        // Convert the string to a number
                        handleDataChange({
                            target: {
                                name: e.target.name,
                                value: Number(e.target.value)
                            }
                        });
                    }}
                />
            </form>
            <section id="budget">
                <TotalTravelBudget />
            </section>
        </>
    )
}

export default TravelExpensesForm