import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { MapPin, Calendar, Link as IconLink, Book } from "react-feather";

//! User Files

import { uploadImage } from "../store/actions/userAction";
import ImageUpload from "./ImageUpload";
import { ReactComponent as VerifiedIcon } from "../assets/verified_badge.svg";

//! Ant Design imports

import { Avatar, Card, Descriptions, Button } from "antd";
const { Meta } = Card;

const Profile = (props) => {
  const {
    isAuthenticated,
    isLoading,
    isProfileLoading,
    user,
    userData: { credentials, likes, norifications },
  } = props.userReducer;

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
  const UserImage = ({ img, alt }) => {
    return (
      <Fragment>
        <img alt={alt} src={img} />
        <input type="file" id="imageInput" hidden onChange={onChange} />
        <Button
          onClick={handleUpload}
          type="primary"
          style={{ textAlign: "center" }}
        >
          Change Profile Picture
        </Button>
        {/* <ImageUpload image={img} /> */}
      </Fragment>
    );
  };

  const UserHandle = ({ userHandle, isVerified }) => {
    return (
      <div className="username">
        <Link to={`user/${userHandle}`}>
          <p className="user-handle">
            <strong>{userHandle}</strong>
          </p>{" "}
        </Link>
        <p className="verified-badge">{isVerified && <VerifiedIcon />}</p>
      </div>
    );
  };

  const ShowUserDetail = ({ credentials }) => {
    return (
      <Descriptions size="small" column={1}>
        <Descriptions.Item>
          <span>
            <Book />
          </span>
          <span>{credentials.bio && credentials.bio}</span>
        </Descriptions.Item>
        <Descriptions.Item>
          <span>
            <MapPin />
          </span>
          <span>{credentials.location && credentials.location}</span>
        </Descriptions.Item>
        <Descriptions.Item>
          <span>
            <IconLink />
          </span>
          <span>
            <a
              href={credentials.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              {credentials.website && credentials.website}
            </a>
          </span>
        </Descriptions.Item>
        <Descriptions.Item>
          <span>
            <Calendar />
          </span>
          <span>Joined {dayjs(credentials.createdAt).format("MMM YYYY")}</span>
        </Descriptions.Item>
      </Descriptions>
    );
  };

  const profileMarkup = !isProfileLoading ? (
    isAuthenticated ? (
      <Card
        className="profile-card"
        hoverable
        cover={
          <UserImage img={credentials.imageUrl} alt={credentials.handle} />
        }
      >
        <Meta
          title={
            <UserHandle
              userHandle={credentials.handle}
              isVerified={credentials.isVerified}
            />
          }
          description={<ShowUserDetail credentials={credentials} />}
        />
      </Card>
    ) : null
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
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = { uploadImage };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
