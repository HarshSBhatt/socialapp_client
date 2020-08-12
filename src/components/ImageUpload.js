import React, { useState } from "react";
import { connect } from "react-redux";
import { Upload, message, notification } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { imageUploadUrl } from "../utils/imageUploadUrl";
import backgroundImage from "../assets/user.png";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

function ImageUpload(props) {
  const {
    userData: {
      credentials: { handle },
    },
  } = props.userReducer;

  const [state, setState] = useState({
    loading: false,
    imageUrl: props.image,
  });

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message,
      placement: "bottomRight",
      className: "custom-notification",
    });
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setState({ ...state, loading: true });
      return;
    }
    if (info.file.status === "done") {
      openNotificationWithIcon(
        "success",
        `${info.file.name} file uploaded successfully`
      );
      getBase64(info.file.originFileObj, (imageUrl) =>
        setState({
          ...state,
          imageUrl,
          loading: false,
        })
      );
    } else if (info.file.status === "error") {
      openNotificationWithIcon(
        "error",
        `${info.file.name} file upload failed.`
      );
    }
  };

  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const { imageUrl } = state;
  return (
    <Upload
      name="avatar"
      className="avatar-uploader"
      showUploadList={false}
      action={imageUploadUrl}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      headers={{ authorization: props.userReducer.token }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={handle} style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
