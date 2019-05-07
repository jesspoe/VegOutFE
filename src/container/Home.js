import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import RestaurantContainer from './RestaurantContainer';
import NavbarPage from '../component/NavbarPage'
import MapContainer from './MapContainer'
import Search from '../component/Search'

class Home extends Component {

  render() {
    return (
      <div className="home-page">
        <div className="container-fluid">

          <Row classname="container-fluid">
            <div className="col-md-12">
              <NavbarPage />
            </div>
          </Row>

          <Row className="container-fluid">
            <div className="col-md-12"><Search searchResults={this.props.searchResults} restaurants={this.props.restaurants} /></div>
          </Row>

          <Row className="container-fluid">
            <div className="col-md-5" >
              <div className="rest-cont"><RestaurantContainer restaurants={this.props.restaurants} groups={this.props.groups} user={this.props.user} /></div>
            </div>
            <div className="col-md-7">
              <div  ><MapContainer restaurants={this.props.restaurants} currentLat={this.props.currentLat} currentLong={this.props.currentLong} /></div>
            </div>
          </Row>

        </div >
      </div>
    );
  }
}

export default Home;
