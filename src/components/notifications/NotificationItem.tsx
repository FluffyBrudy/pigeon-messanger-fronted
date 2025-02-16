import { FC } from "react";
import { Notification } from "../../types/notifications";

type NotificationItemProps = Notification & {
  handleClick: (
    id: Notification["id"],
    redirectTo: Notification["redirectTo"]
  ) => void;
};

export const NotificationItem: FC<NotificationItemProps> = ({
  id,
  message,
  redirectTo,
  handleClick,
}) => {
  return (
    <div onClick={() => handleClick(id, redirectTo)} className="w-full py-2">
      <p>{message}</p>
    </div>
  );
};
