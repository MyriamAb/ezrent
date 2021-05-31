import React, {useRef} from "react";
import Button from './button'

const ImageUpload = (props) => {
  const inputFile = useRef(null);

  const onButtonClick = (e) => {
    e.preventDefault()
    if(inputFile.current != null)
      inputFile.current.click();
  }

  return (
    <div>
      <input
        style={{ display: "none" }}
        // accept=".zip,.rar"
        ref={inputFile}
        onChange={props.onChange}
        type="file"
        id={props.id}
      />
{      <Button content="Add a photo" onClick={e => onButtonClick(e)}/>
}    </div>
  );
};

export default ImageUpload;
