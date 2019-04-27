import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';


class MapContainer extends Component {
  constructor() {
    super()
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      addy: [],
      locations: []
    };
  }

  componentDidMount() {
    let myAddy = []
    let newItem = {}
    this.props.restaurants.map((rest) => {
      newItem = { name: rest.sortable_name, address: rest.address1, city: rest.city, state: rest.region }
      myAddy.push(newItem)
      return undefined
    })
    return this.setState({
      addy: myAddy
    }, () => this.getGeo())
  }



  getGeo = () => {
    let local = []
    let newItem = {}
    this.state.addy.map((item) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address='${item.address}',+'${item.city}'+'${item.state}'&key=`)
        .then(response => response.json())
        .then(json => {
          if (json.results.length > 0) {
            newItem = { name: item.name, lat: json.results[0].geometry.location.lat, lng: json.results[0].geometry.location.lng }
            local.push(newItem)
          }
        })
        .then(item => {
          this.setState({
            locations: local
          })
        })
    })
  }

  displayMarkers = () => {

    return this.state.locations.map((rest, index) => {
      return <Marker key={index} id={index} position={{
        name: rest.name,
        lat: rest.lat,
        lng: rest.lng
      }} />
    })
  }



  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const mapStyles = {
      width: '600px',
      height: '600px',
      margin: '10px'
    };

    return (
      <React.Fragment>

        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={
            {
              lat: 47.608051499999995,
              lng: -122.3334927
            }}
        >

          {this.state.locations.length > 0 ? this.displayMarkers() : null}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>
      </React.Fragment>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);