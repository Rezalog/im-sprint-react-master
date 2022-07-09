import React from "react";
import App from "../App";

function Thumbnail(props) {
  return (<img className="thumbnail" src={props.source}></img>);
}

export default Thumbnail;
