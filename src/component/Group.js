import React from 'react';
import Card from 'react-bootstrap/Card'

const Group = (props) => {


  return (
    <Card className="group-card-single" border="info" style={{ width: '18rem' }} >
      <Card.Header>{props.group.name}</Card.Header>
      <Card.Body>
        <Card.Text>
          {props.group.description}
        </Card.Text>
      </Card.Body>
    </Card>

  );
}
export default Group;
