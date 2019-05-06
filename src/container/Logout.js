import React from "react";
import { MDBRow, MDBCol, MDBCardTitle } from "mdbreact";

const Logout = () => {
  localStorage.removeItem("jwt");
  return (
    <div className="opening-pages">
      <div className="container" id='overall'>
        <MDBRow>
          <MDBCol>
            <div className="jumbotron" >
              <MDBCol className="jumbotext">
                <MDBCol className="py-5">
                  <MDBCardTitle className="h1-responsive pt-3 m-5 font-bold">Thanks for stopping by!</MDBCardTitle>
                </MDBCol>
              </MDBCol>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>

  )
}

export default Logout;
