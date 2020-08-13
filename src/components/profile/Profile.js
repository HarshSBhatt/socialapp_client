import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//! User Files
import { uploadImage, logoutUser } from "../../store/actions/userAction";
import UserImage from "./UserImage";
import UserHandle from "./UserHandle";
import UserDetails from "./UserDetails";
import EditDetails from "../EditDetails";

//! Ant Design imports

import { Avatar, Card, Button } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
const PRIMARY_COLOR = "#00bcd4";
const { Meta } = Card;

const Profile = (props) => {
  const { isAuthenticated, isProfileLoading, userData } = props.userReducer;

  const onChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };
  const handleUpload = (e) => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    props.logoutUser();
  };

  const profileMarkup = !isProfileLoading ? (
    isAuthenticated ? (
      <Card
        className="profile-card"
        hoverable
        cover={
          <Fragment>
            <div className="picture-wrapper">
              <UserImage
                img={userData.credentials.imageUrl}
                alt={userData.credentials.handle}
                onChange={onChange}
                handleUpload={handleUpload}
                PRIMARY_COLOR={PRIMARY_COLOR}
              />
            </div>
            <EditDetails />
          </Fragment>
        }
      >
        <Meta
          title={
            <UserHandle
              userHandle={userData.credentials.handle}
              isVerified={userData.credentials.isVerified}
            />
          }
          description={
            <UserDetails
              credentials={userData.credentials}
              handleLogout={handleLogout}
              PRIMARY_COLOR={PRIMARY_COLOR}
            />
          }
        />
      </Card>
    ) : (
      <Card>
        <Title level={3}>You are not loggen in</Title>
        <div className="auth-options">
          <Button type="primary" size="large">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="large">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </Card>
    )
  ) : (
    <Card loading={isProfileLoading}>
      <Meta
        avatar={
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  );

  return <div className="profile-wrapper">{profileMarkup}</div>;
};

Profile.propTypes = {
  userReducer: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = { uploadImage, logoutUser };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
