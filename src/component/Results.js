import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'


const Results = (props) => {
  return (
    <div >
      <h4 className="group-text">Poll Results</h4>
      <div className="text">Total Votes: {props.total} </div>
      <br />
      <div >{Object.keys(props.percent).map(function (key, index) {
        return <div><h3>{key}:</h3> <ProgressBar variant='success' max={100} now={props.percent[key]} label={props.percent[key].toFixed(2) + '%'} /></div>
      })}</div>
      <button className="vote-btn-two" onClick={() => props.showing()}>Close Results</button>
    </div >
  );
}

export default Results;
