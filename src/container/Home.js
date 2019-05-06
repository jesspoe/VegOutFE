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
      <div className="container-fluid">

        <Row>
          <Col >
            <NavbarPage />
          </Col>
        </Row>

        <Row>
          <Col><Search searchResults={this.props.searchResults} /></Col>
        </Row>

        <Row className="container-fluid">
          <div className="col-md-6" >
            <div className="rest-cont"><RestaurantContainer restaurants={this.props.restaurants} groups={this.props.groups} user={this.props.user} /></div>
          </div>
          <div className="col-md-6" id="wrapper">
            <div  ><MapContainer restaurants={this.props.restaurants} currentLat={this.props.currentLat} currentLong={this.props.currentLong} /></div>
          </div>
        </Row>

      </div >
    );
  }
}

export default Home;
