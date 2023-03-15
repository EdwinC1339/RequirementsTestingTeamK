import React, { useState } from 'react';

function Filter(props) {
    const restriction = props.name;
    const [checked, setChecked] = useState(false);

    return (
        <div className="card">
            <label for={restriction}>{restriction}</label>
            <input type="checkbox" id={restriction} className="checkbox"></input>
        </div>
    );
}

export default React.memo(Filter)