import React, { Fragment } from "react";

//! Ant Design Import

import { Skeleton, List, Avatar } from "antd";

function ScreamSkeleton() {
  let listData = [];
  for (let i = 0; i < 4; i++) {
    listData.push({
      href: "https://hb.com",
      title: i,
      avatar: "image.png",
      description: "Developed by Harsh Bhatt",
      content: "Developed by Harsh Bhatt",
    });
  }

  return (
    <Fragment>
      <List
        itemLayout="vertical"
        size="large"
        className="scream-skeleton-wrapper"
        dataSource={listData}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Skeleton loading={true} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </Skeleton>
          </List.Item>
        )}
      />
    </Fragment>
  );
}

export default ScreamSkeleton;
