import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";

function MyButton({ children, onClick, tip, btnClassName, tipClassName }) {
  return (
    <Tooltip title={tip} className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
}

MyButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  tip: PropTypes.string.isRequired,
  btnClassName: PropTypes.string,
  tipClassName: PropTypes.string,
};

export default MyButton;
