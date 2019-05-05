import React from 'react';



const Results = (props) => {
  return (
    <div >
      <div>Poll Results</div>
      <div >{Object.keys(props.percent).map(function (key, index) {
        return <div style={{
          backgroundColor: "yellow",
          border: "1px solid black",
          padding: "8px 16px",
          width: `${props.percent[key]}`
        }}><h4>{key}</h4> <h5>{props.percent[key]}</h5></div>
      })}</div>
    </div >
  );
}

export default Results;
