import React from "react";

//! Ant Design Imports

import { Avatar, Card, Skeleton } from "antd";

const { Meta } = Card;

function CardSkeleton() {
  return (
    <div className="card-skeleton-wrapper">
      <div className="dummy-image">
        <Skeleton.Image />
      </div>
      <Card loading={true}>
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </div>
  );
}

export default CardSkeleton;
