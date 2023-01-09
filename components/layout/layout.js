import { useContext } from "react";

import MainHeader from "./main-header";
import NotificationContext from "../../store/notification-context";
import Notification from "../../components/ui/notification";

const Layout = (props) => {
  const ctx = useContext(NotificationContext);
  const activeNotification = ctx.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
