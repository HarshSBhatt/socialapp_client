import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//! User Files

import { ReactComponent as VerifiedIcon } from "../assets/verified_badge.svg";

//! Ant Design imports

import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Scream({ scream }) {
  dayjs.extend(relativeTime);
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <List
      className="scream-list"
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={scream}
      renderItem={(item) => (
        <List.Item
          className="scream-list-content"
          key={item.screamId}
          actions={[
            <IconText
              icon={StarOutlined}
              text="156"
              key="list-vertical-star-o"
            />,
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <img
              width={250}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar src={item.userImage} size={50}>
                {item.userHandle[0].toUpperCase()}
              </Avatar>
            }
            title={
              <Link to={`user/${item.userHandle}`}>
                <div className="username">
                  <p>{item.userHandle}</p>{" "}
                  <p>{item.isVerified && <VerifiedIcon />}</p>
                </div>
              </Link>
            }
            description={dayjs(item.createdAt).fromNow()}
          />
          {item.body}
        </List.Item>
      )}
    />
  );
}

export default Scream;
