import React, { Component } from 'react';
import jwtDecode from 'jwt-decode'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RestaurantContainer from './RestaurantContainer';
import NavBar from '../component/NavBar'
import MapContainer from './MapContainer'
import Search from '../component/Search'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: 0,
      first_name: "",
      last_name: "",
      email: ""
    }
  }
  componentDidMount() {
    let jwt = window.localStorage.getItem("jwt")
    let result = jwtDecode(jwt)
    this.setState({ first_name: result.first_name, last_name: result.last_name, user_id: result.user_id, email: result.email })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={12}>
            <NavBar />
          </Col>
        </Row>

        <Row>
          <Col xs={12} align='right'><Search searchResults={this.props.searchResults} /></Col>
        </Row>

        <Row>
          <Col xs={6}><RestaurantContainer restaurants={this.props.restaurants} /></Col>
          <Col xs={6}><MapContainer /></Col>
        </Row>
      </Container>
    );
  }
}

export default Home;