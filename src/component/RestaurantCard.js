import React from 'react';
import Container from 'react-bootstrap/Container'
import NavBar from '../component/NavBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'


const RestaurantCard = props => {


  return (
    <Container >

      <Row>
        <Col xs={12} md={12}>
          <div>
            <a href={props.restaurant.website} target='blank'><h5>{props.restaurant.sortable_name}</h5 ></a>
            Neighborhood: <span>{props.restaurant.neighborhood ? props.restaurant.neighborhood : 'Unavailable'}</span>
            <br />
            Cuisine: <span>{props.cuisines()}</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col align="center">Restaurant Name</Col>
      </Row>

      <Row>
        <Col align="center" className="">
          <div>
            What is in here?
          </div>

        </Col>
      </Row>
      <h5>More Info</h5>
      <Button onClick={props.handleClick}>Close</Button>

    </Container>
  )
}
export default RestaurantCard;

