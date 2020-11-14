import React from "react";


const ImageFromBuffer = props => {
    const {contentType, arrayBuffer,containerProps, ...otherProps} = props;

    const base64String = btoa(
        new Uint8Array(arrayBuffer)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
    return (
        <>
          <img {...otherProps} src={`data:${contentType};base64,${base64String}`}></img>      
        </>
    );
}

export default ImageFromBuffer; 