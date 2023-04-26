import React, { useState, memo } from "react";
import Card from "react-bootstrap/Card";

function Filter(props) {
  const restriction = props.name;
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Card>
        <label htmlFor={restriction}>
          <div className="row">
            <div className="col-lg-8">{restriction}</div>
            <div className="col-lg-4">
              <input
                type="checkbox"
                id={restriction}
                className="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              ></input>
            </div>
          </div>
        </label>
      </Card>
    </div>
  );
}

export default memo(Filter);
