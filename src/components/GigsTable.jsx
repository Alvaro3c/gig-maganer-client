import React, { useState, } from 'react';
import TableHeader from './TableHeader';
import Gig from './Gig';
import DetailsModal from './DetailsModal'
const GigsTable = ({ filterFn, filterText }) => {
    const [sortIconIsCLicked, setsortIconIsCLicked] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [selectedGig, setSelectedGig] = useState(null)



    return (
        <>
            <section id="gigs-table-wrapper">

                <table>
                    <TableHeader setsortIconIsCLicked={setsortIconIsCLicked} />
                    <tbody>
                        <Gig
                            filterFn={filterFn}
                            sortIconIsCLicked={sortIconIsCLicked}
                            setSelectedGig={setSelectedGig}
                            selectedGig={selectedGig}
                            setIsClicked={setIsClicked}
                            isClicked={isClicked}
                            filterText={filterText}
                        />
                    </tbody>
                </table>
            </section>
            {isClicked
                ? <DetailsModal
                    gig={selectedGig}
                    isClicked={isClicked}      // Es necesario pasar el estado actual
                    setIsClicked={setIsClicked} />
                : null}
        </>
    )
}

export default GigsTable