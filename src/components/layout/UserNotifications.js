import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

//! User Files

import { markedNotificationsRead } from "../../store/actions";
import isEmpty from "../../utils/is-empty";

//! MUI Imports

import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import IconButton from "@material-ui/core/IconButton";
import FavouriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationIcon from "@material-ui/icons/Notifications";

//! Ant Design Imports

import { Badge } from "antd";
import Typography from "@material-ui/core/Typography";

const UserNotifications = (props) => {
  dayjs.extend(relativeTime);
  const { notifications } = !isEmpty(props.userData) && props.userData;
  const [state, setState] = useState({ anchorEl: null });

  const { anchorEl } = state;
  let notificationIcon;

  const handleOpen = (e) => {
    setState({ anchorEl: e.target });
  };
  const handleClose = () => {
    setState({ anchorEl: null });
  };
  const onMenuOpen = () => {
    let unreadNotificationsIds =
      !isEmpty(notifications) &&
      notifications.filter((not) => !not.read).map((not) => not.notificationId);

    unreadNotificationsIds.length > 0 &&
      props.markedNotificationsRead(unreadNotificationsIds);
  };

  if (!isEmpty(notifications) && notifications.length > 0) {
    const len = notifications.filter((not) => not.read === false).length;
    len > 0
      ? (notificationIcon = (
          <Badge count={len} overflowCount={10}>
            <NotificationIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationIcon />);
  } else {
    notificationIcon = <NotificationIcon />;
  }

  const notificationMarkup =
    !isEmpty(notifications) && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? "primary" : "secondary";
        const icon =
          not.type === "like" ? (
            <FavouriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem
            key={not.createdAt}
            onClick={handleClose}
            component={Link}
            to={`/user/${not.recipient}/scream/${not.screamId}`}
          >
            {icon}
            <Typography color="inherit" variant="body1">
              {not.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpen}
      >
        {notificationMarkup}
      </Menu>
    </Fragment>
  );
};

UserNotifications.propTypes = {
  markedNotificationsRead: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userData: state.userReducer.userData,
});

const mapDispatchToProps = { markedNotificationsRead };

export default connect(mapStateToProps, mapDispatchToProps)(UserNotifications);
