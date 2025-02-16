import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../../store/notificationStore";
import { Notification } from "../../types/notifications";
import { NotificationItem } from "./NotificationItem";

export const GlobalNotification = () => {
  const {
    isVisible,
    toggleNotification,
    removeNotification,
    notifications,
    count,
  } = useNotificationStore();
  const navigate = useNavigate();

  const handleClick = (
    id: Notification["id"],
    redirectTo: Notification["redirectTo"]
  ) => {
    removeNotification(id);
    if (redirectTo) navigate(redirectTo);
  };

  return (
    <div className="cursor-pointer z-[50]" onClick={toggleNotification}>
      <div className="hover:text-white">
        <div className="relative w-fit ">
          <span className="absolute right-[-10px] top-[-5px] bg-black z-[51] h-[20px] w-[20px] text-sm text-center rounded-full">
            {count}
          </span>

          <Bell className="relative"></Bell>
        </div>
        Notifications
      </div>
      <div className="relative">
        <div className="absolute right-2 top-2 w-[min(300px,100vw)] box-border">
          {isVisible && (
            <ul className="list-none bg-black rounded-md border-red-500]">
              {notifications.map((item, id) => (
                <NotificationItem
                  key={id}
                  {...item}
                  handleClick={handleClick}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
