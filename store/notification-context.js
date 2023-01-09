import { createContext, useState } from "react";

const initialCtxState = {
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
};

const NotificationContext = createContext(initialCtxState);

export const NotificationContextProvider = (props) => {
  const [acitveNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const ctx = {
    notification: acitveNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={ctx}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
