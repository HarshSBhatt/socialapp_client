import { notification } from "antd";

export const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message,
    placement: "bottomRight",
    className: "custom-notification",
  });
};
