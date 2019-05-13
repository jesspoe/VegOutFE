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

  onMapMounted = (ref) => {
    console.log('ref', this.state)
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
      console.log("Checking cache for", cachedKey)
      let cachedResult = localStorage.getItem(cachedKey)
      if (cachedResult) {
        console.log("Found cache entry for", cachedKey, ':', cachedResult)
        let parsedResult = JSON.parse(cachedResult)
        newItem = { name: item.name, lat: parsedResult.lat, lng: parsedResult.lng }
        local.push(newItem)
        this.setState({
          locations: local
        })
        return
      } else {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=GOOGLE_KEY`)
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            console.log("in the fetch I need to be in", response)
            return response;
          })
          .then(response => response.json())
          .then(json => {
            console.log("if json.results", json)
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
          }).catch((error) => {
            console.log(error)
          })
      };
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

    if (this.state.locations[0]) {
      return (
        <Map
          ref={this.onMapMounted}
          google={this.props.google}
          zoom={14}
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
              <h5>{this.state.selectedPlace.name && this.state.selectedPlace.position.name}</h5>
            </div>
          </InfoWindow>
        </Map>

      );
    } else { return null }
  }
}

export default GoogleApiWrapper({
  apiKey: 'GOOGLE_KEY'
})(MapContainer);