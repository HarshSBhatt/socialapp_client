import React from "react";
import { Button, Descriptions, Tooltip } from "antd";
import dayjs from "dayjs";
import { MapPin, Calendar, Link as IconLink, Book } from "react-feather";
import PropTypes from "prop-types";

function UserDetails({ credentials, handleLogout, PRIMARY_COLOR }) {
  return (
    <Descriptions size="small" column={1}>
      {credentials.bio && (
        <Descriptions.Item>
          <span>
            <Book />
          </span>
          <span>{credentials.bio}</span>
        </Descriptions.Item>
      )}
      {credentials.location && (
        <Descriptions.Item>
          <span>
            <MapPin />
          </span>
          <span>{credentials.location}</span>
        </Descriptions.Item>
      )}
      {credentials.website && (
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
              {credentials.website}
            </a>
          </span>
        </Descriptions.Item>
      )}
      <Descriptions.Item>
        <span>
          <Calendar />
        </span>
        <span>Joined {dayjs(credentials.createdAt).format("MMM YYYY")}</span>
      </Descriptions.Item>
      <Tooltip
        placement="bottom"
        title="Change Profile Picture"
        color={PRIMARY_COLOR}
      >
        <Button onClick={handleLogout}>Logout</Button>
      </Tooltip>
    </Descriptions>
  );
}

UserDetails.propTypes = {
  credentials: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  PRIMARY_COLOR: PropTypes.string.isRequired,
};

export default UserDetails;
