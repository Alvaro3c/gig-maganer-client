import React, { useState } from 'react'
import { ArrowUpDown } from "lucide-react";
const TableHeader = ({ sortIconIsCLicked, setsortIconIsCLicked }) => {


    const handleClick = () => {
        setsortIconIsCLicked(!sortIconIsCLicked)
    }
    return (
        <>
            <thead>
                <tr>
                    <th>Artist <ArrowUpDown className='sort-icon' onClick={handleClick} /></th>
                    <th>Venue <ArrowUpDown className='sort-icon' onClick={handleClick} /></th>
                    <th>City <ArrowUpDown className='sort-icon' onClick={handleClick} /></th>
                    <th>Date <ArrowUpDown className='sort-icon' onClick={handleClick} /></th>
                    <th>Price <ArrowUpDown className='sort-icon' onClick={handleClick} /></th>
                    <th>Tickets</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
        </>
    )
}

export default TableHeader