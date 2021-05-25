import React, { useState, useRef } from "react";
import Button from './button'

const ImageUpload = (props) => {
  return (
    <div>
      <input
        style={{ display: "none" }}
        ref={props.refImage}
        onChange={props.onChangeImage}
        type="file"
        id={props.id}
      />
      <Button content="Add a photo" onClick={props.onClick}/>
    </div>
  );
};

export default ImageUpload;
