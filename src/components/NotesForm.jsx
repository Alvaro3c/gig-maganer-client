import React from 'react'

const NotesForm = ({ handleDataChange, gigData }) => {
    return (
        <>
            <h5>Notes</h5>
            <textarea
                className='textarea'
                placeholder='Add any aditional notes'
                name='notes'
                value={gigData.notes}
                onChange={handleDataChange}
            />
        </>
    )
}

export default NotesForm