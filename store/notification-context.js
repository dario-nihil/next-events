import { createContext, useState, useEffect } from "react";

const initialCtxState = {
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
};

const NotificationContext = createContext(initialCtxState);

export const NotificationContextProvider = (props) => {
  const [acitveNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (
      acitveNotification &&
      (acitveNotification.status === "success" ||
        acitveNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [acitveNotification]);

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
