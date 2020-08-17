import React, { Fragment } from "react";
import { Tooltip } from "antd";
import { Edit } from "react-feather";
import PropTypes from "prop-types";

function userImage({
  img,
  alt,
  onChange,
  handleUpload,
  PRIMARY_COLOR,
  isStatic,
}) {
  return (
    <Fragment>
      <img alt={alt} src={img} />
      <input type="file" id="imageInput" hidden onChange={onChange} />
      {!isStatic ? (
        <Tooltip
          placement="top"
          title="Change Profile Picture"
          color={PRIMARY_COLOR}
        >
          <span onClick={handleUpload}>
            <Edit />
          </span>
        </Tooltip>
      ) : null}
    </Fragment>
  );
}

userImage.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  handleUpload: PropTypes.func,
};

export default userImage;
