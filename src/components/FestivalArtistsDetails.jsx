import React from 'react'
import { MicVocal } from 'lucide-react'

const FestivalArtistsDetails = ({ gig }) => {

    return (
        <>
            <section id="festival-artists-details">

                {gig.festivalArtists && gig.festivalArtists.map((artist, index) =>
                    <article className="artist-box" key={index}>
                        <div>
                            <MicVocal color="#15aad5" />
                            <p>{artist}</p>
                        </div>

                    </article>
                )}
            </section>
        </>
    )
}

export default FestivalArtistsDetails