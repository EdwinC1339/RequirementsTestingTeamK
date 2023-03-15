import React, { useState } from 'react';
import Filter from './Filter';
function Filters() {
    // Dummy restriction names
    const restriction_names = ["Halal", "Lactose Intolerant", "Nut Allergy", "Vegan", "Vegetarian"]
    const filters = restriction_names.map((name) => {
        return <Filter name={name}/>
    })

    return (
        <div>
            <div className='instructions'>
                <h2>Select your restrictions</h2>
            </div>
            <div className="container d-flex flex-column justify-contents-center">
                {filters}
            </div>
        </div>
    );
}

export default React.memo(Filters)