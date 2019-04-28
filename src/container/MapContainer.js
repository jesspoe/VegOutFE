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
    this.props.restaurants.map((rest) => {
      newItem = { name: rest.sortable_name, address: rest.address1, city: rest.city, state: rest.region }
      myAddy.push(newItem)
      return undefined
    })
    return this.setState({
      addy: myAddy
    }, () => this.getGeo())
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
    // console.log('ref', ref)
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
        newItem = { name: item.name, lat: parsedResult.lat, lng: parsedResult.lng }
        local.push(newItem)
        this.setState({
          locations: local
        })
        return
      }
      // console.log("Did not find cache entry for", cachedKey)
      // console.log("Geocoding:", encodedAddress)
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=`)
        .then(response => response.json())
        .then(json => {
          if (json.results.length > 0) {
            let lat = json.results[0].geometry.location.lat
            let lng = json.results[0].geometry.location.lng
            localStorage.setItem(cachedKey, JSON.stringify({ lat: lat, lng: lng }))
            newItem = { name: item.name, lat: lat, lng: lng }
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
    });
    // console.log("on click selected places", this.state.selectedPlace.position.name)
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
      margin: '20px'
    };

    return (
      <React.Fragment>
        <Map
          ref={this.onMapMounted}
          google={this.props.google}
          zoom={4}
          style={mapStyles}
          initialCenter={
            {
              lat: 39.8333333,
              lng: -98.585522
            }}
        >
          {this.state.locations.length > 0 ? this.displayMarkers() : null}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h4>{"I can't update state properly here"}</h4>
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