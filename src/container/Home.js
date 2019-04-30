import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantContainer from './RestaurantContainer';
import NavbarPage from '../component/NavbarPage'
import MapContainer from './MapContainer'
import Search from '../component/Search'

class Home extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <NavbarPage />
          </Col>
        </Row>

        <Row>
          <Col xs={12} align='right'><Search searchResults={this.props.searchResults} /></Col>
        </Row>

        <Row >
          <div className="col-md-5" style={{ overflow: 'scroll' }}>
            <div ><RestaurantContainer restaurants={this.props.restaurants} groups={this.props.groups} user={this.props.user} /></div>
          </div>
          <div className="col-md-6"><MapContainer restaurants={this.props.restaurants} /></div>

        </Row>
      </Container >
    );
  }
}

export default Home;
