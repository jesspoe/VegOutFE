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
      locations: [],
      mapRef: null
    };
  }

  componentDidMount() {
    let myAddy = []
    let newItem = {}
    if (this.props.restaurants === null) {
      this.setState({
        locations: [
          { name: "", veg_level: "", lat: 0, lng: 0 }
        ]
      })
    } else {
      this.props.restaurants.map((rest) => {
        newItem = { name: rest.sortable_name, veg_level: rest.veg_level_description, address: rest.address1, city: rest.city, state: rest.region }
        myAddy.push(newItem)
        return undefined
      })
      return this.setState({
        addy: myAddy
      }, () => this.getGeo())
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("Are we in componentDidUpdate")
  //   const node = ReactDOM.findDOMNode(this.state.mapRef)
  //   console.log("what's node", node)
  //   let map = new this.props.google.maps.Map(node)
  //   console.log("What's map", map)
  //   let center = new this.props.google.maps.LatLng(34.98767, -122.87645)
  //   console.log("whats center.", center)
  //   map.panTo(center)
  // }

  onMapMounted = (ref) => {
    console.log('ref', ref)
    this.setState({
      mapRef: ref
    })
  }


  getGeo = () => {
    let local = []
    let newItem = {}
    this.state.addy.map((item) => {
      let encodedAddress = encodeURIComponent(`${item.address}, ${item.city}, ${item.state}`)
      let cachedKey = encodedAddress
      // console.log("Checking cache for", cachedKey)
      let cachedResult = localStorage.getItem(cachedKey)
      if (cachedResult) {
        // console.log("Found cache entry for", cachedKey, ':', cachedResult)
        let parsedResult = JSON.parse(cachedResult)
        newItem = { name: item.name, veg_level: item.veg_level_description, lat: parsedResult.lat, lng: parsedResult.lng }
        local.push(newItem)
        this.setState({
          locations: local
        })
        return
      }
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAKTm2RXPRrZ9igv6NRfEPq398DWeK0WzA`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.json())
        .then(json => {
          if (json.results.length > 0) {
            let lat = json.results[0].geometry.location.lat
            let lng = json.results[0].geometry.location.lng
            localStorage.setItem(cachedKey, JSON.stringify({ lat: lat, lng: lng }))
            newItem = { name: item.name, veg_level: item.veg_level_description, lat: lat, lng: lng }
            local.push(newItem)
          }
        })
        .then(item => {
          console.log("locatiosn storage", local)
          this.setState({
            locations: local
          })
        }).catch((error) => {
          console.log(error)
        });
    })
  }

  displayMarkers = () => {
    return this.state.locations.map((rest, index) => {
      return <Marker onClick={this.onMarkerClick} key={index} id={index} position={{
        name: rest.name,
        lat: rest.lat,
        lng: rest.lng
      }}
      />
    })
  }


  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    }, async () => console.log("on click selected places", this.state.selectedPlace))

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

    };
    if (this.state.locations[0]) {
      return (

        <Map

          ref={this.onMapMounted}
          google={this.props.google}
          zoom={1}
          style={mapStyles}
          onClick={this.onMapClicked}
          center={
            {
              lat: this.state.locations[0].lat,
              lng: this.state.locations[0].lng
            }}
        >
          {this.state.locations.length > 0 ? this.displayMarkers() : null}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{this.state.selectedPlace.name && this.state.selectedPlace.position.name}</h4>
            </div>
          </InfoWindow>


        </Map>

      );
    } else { return "No Restaurants Available" }
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer);