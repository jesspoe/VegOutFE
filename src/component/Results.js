import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'


const Results = (props) => {
  return (
    <div >
      <h4>Poll Results</h4>
      <div>Total Votes: {props.total} </div>
      <div >{Object.keys(props.percent).map(function (key, index) {
        return <div>{key}: <ProgressBar max={100} animated now={props.percent[key]} label={props.percent[key].toFixed(2) + '%'} /></div>
      })}</div>
    </div >
  );
}

export default Results;
{/* <h4>{key}</h4> <h5>{props.percent[key]}</h5> */ }