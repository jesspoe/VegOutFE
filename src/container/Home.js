import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantContainer from './RestaurantContainer';
import NavBar from '../component/NavBar'
import MapContainer from './MapContainer'
import Search from '../component/Search'

class Home extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <NavBar />
          </Col>
        </Row>

        <Row>
          <Col xs={12} align='right'><Search searchResults={this.props.searchResults} currentLat={this.props.currentLat} currentLong={this.props.currentLong} /></Col>
        </Row>

        <Row>
          <Col xs={6}><RestaurantContainer restaurants={this.props.restaurants} /></Col>
          <Col className='map' xs={6}><MapContainer restaurants={this.props.restaurants} /></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;