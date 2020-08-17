import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as VerifiedIcon } from "../../assets/verified_badge.svg";
import PropTypes from "prop-types";

function UserHandle({ userHandle, isVerified }) {
  return (
    <div className="username">
      <Link to={`/user/${userHandle}`}>
        <p className="user-handle">
          <strong>{userHandle}</strong>
        </p>{" "}
      </Link>
      <p className="verified-badge">{isVerified && <VerifiedIcon />}</p>
    </div>
  );
}

UserHandle.propTypes = {
  userHandle: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
};

export default UserHandle;
