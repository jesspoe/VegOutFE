import React, { Component } from 'react';
import NavbarPage from '../component/NavbarPage'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Vegan from '../Images/vegan.jpg'



class Resources extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="container-fluid">

          <Row classname="container-fluid">
            <div className="col-md-12">
              <NavbarPage />
            </div>
          </Row>

          <Row classname="container">
            <div className="resources">
              <h4 className="group-text" align="center">What is a Vegan?</h4>

              <p className="vegan"> Vegetarians do not eat meat, fish, or poultry. Vegans, in addition to being vegetarian, do not use other animal products and by-products such as eggs, dairy products, honey, leather, fur, silk, wool, cosmetics, and soaps derived from animal products.</p>

              <h4 className="group-text" align="center">Why Veganism?</h4>
              <p className="vegan"> People choose to be vegan for health, environmental, and/or ethical reasons. For example, some vegans feel that one promotes the meat industry by consuming eggs and dairy products. That is, once dairy cows or egg-laying chickens are too old to be productive, they are often sold as meat; and since male calves do not produce milk, they usually are raised for veal or other products. Some people avoid these items because of conditions associated with their production.
              Many vegans choose this lifestyle to promote a more humane and caring world. They know they are not perfect, but believe they have a responsibility to try to do their best, while not being judgmental of others.</p>

              <h4 className="group-text" align="center">  Vegan Nutrition</h4>

              <p className="vegan">The key to a nutritionally sound vegan diet is variety. A healthy and varied vegan diet includes fruits, vegetables, plenty of leafy greens, whole grain products, nuts, seeds, and legumes.</p>

              <h4 className="group-text" align="center">Protein</h4>
              <p className="vegan">It is very easy for a vegan diet to meet the recommendations for protein as long as calorie intake is adequate. Strict protein planning or combining is not necessary. The key is to eat a varied diet.
             Almost all foods except for alcohol, sugar, and fats provide some protein. Vegan sources include: lentils, chickpeas, tofu, peas, peanut butter, soy milk, almonds, spinach, rice, whole wheat bread, potatoes, broccoli, kale...</p>
             <img align="center" src={Vegan} alt="boohoo" className="img-responsive" />;
             
            </div>
         

         
          
              </Row>

        
          
          <Row className="resources">

            <Col className="group-text" align="center">Sources</Col>
            <Col sm={12} className="source">
              <p className="linkz" ><a href="https://www.happycow.net/" target='blank'>Happy Cow</a></p>
              <p className="linkz"> <a href="https://www.onegreenplanet.org/" target='blank'>One Green Planet</a></p>
              <p className="linkz"> <a href="http://www.barnivore.com/" target='blank'>Barnivore</a></p>
              <p className="linkz"> <a href="https://ohsheglows.com/" target='blank'>Oh She Glows</a></p>
            </Col>

          </Row>
        </div >
      </div>

    )
  }
}

export default Resources;
