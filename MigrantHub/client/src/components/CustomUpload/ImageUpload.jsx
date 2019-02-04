import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.jsx";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    var {
      avatar,
      addButtonProps,
      changeButtonProps,
      removeButtonProps,
      handleClick,
      handleImageChange,
      handleRemove,
      file,
      imagePreviewUrl,
      imageRef
    } = this.props;

    const display = {
      display: 'none',
    };
 
    

    return (
      <div className="fileinput text-center">
        <input type="file" style={display} onChange={handleImageChange} ref={imageRef} />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")} >
          <img src={imagePreviewUrl} alt="..." height="100%" width="100%" align="middle"/>
        </div>
        <div>
          {file === null ? (
            <Button {...addButtonProps} onClick={() => handleClick()}>
              {avatar ? "Add Photo" : "Select image"}
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => handleClick()}>
                Change
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={handleRemove}
              >
                <i className="fas fa-times" /> Remove
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;
