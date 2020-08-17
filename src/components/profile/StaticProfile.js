import React, { Fragment } from "react";
import PropTypes from "prop-types";

//! User Files

import UserImage from "./UserImage";
import UserHandle from "./UserHandle";
import UserDetails from "./UserDetails";
import isEmpty from "../../utils/is-empty";

//! Ant Design imports

import { Card } from "antd";
const { Meta } = Card;

function StaticProfile({ profile }) {
  const {
    handle,
    createdAt,
    imageUrl,
    bio,
    website,
    location,
    isVerified,
  } = profile;
  if (isEmpty(profile)) return <p>Loaading...</p>;
  return (
    <div className="profile-wrapper">
      <Card
        className="profile-card"
        hoverable
        cover={
          <Fragment>
            <div className="picture-wrapper">
              <div className="user-avatar">
                <UserImage img={imageUrl} alt={handle} isStatic={true} />
              </div>
            </div>
          </Fragment>
        }
      >
        <Meta
          title={<UserHandle userHandle={handle} isVerified={isVerified} />}
          description={
            <UserDetails
              credentials={{ bio, website, location, createdAt }}
              isStatic={true}
            />
          }
        />
      </Card>
    </div>
  );
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StaticProfile;
