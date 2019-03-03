import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "components/CustomButtons/Button.jsx";
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

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
              {avatar ? <FormattedMessage id="form.select.photo" /> : <FormattedMessage id="form.select.image" /> }
            </Button>
          ) : (
            <span>
              <Button {...changeButtonProps} onClick={() => handleClick()}>
                <FormattedMessage id="form.change" />
              </Button>
              {avatar ? <br /> : null}
              <Button
                {...removeButtonProps}
                onClick={handleRemove}
              >
                <i className="fas fa-times" /> <FormattedMessage id="form.remove" />
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
  removeButtonProps: PropTypes.object,
  intl: intlShape.isRequired,
};

export default (injectIntl(ImageUpload));