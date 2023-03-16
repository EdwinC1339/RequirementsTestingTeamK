import React, { useState } from "react";
import { Card } from "react-bootstrap";
function Filter(props) {
  const restriction = props.name;
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Card>
        <span for={restriction}>
          <div className="row">
            <div className="col-lg-8">{restriction} </div>
            <div className="col-lg-4">
              <input
                type="checkbox"
                id={restriction}
                className="checkbox"
              ></input>
            </div>
          </div>
        </span>
      </Card>
    </div>
  );
}

export default React.memo(Filter);
