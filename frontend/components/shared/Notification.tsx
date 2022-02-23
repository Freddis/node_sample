import {useAppSelector} from "../../redux/hooks";
import {NotificationType} from "../../redux/slices/notification"

const Notification = () => {
    const notification = useAppSelector(state => state.notification);
    const typeStr = notification.type === NotificationType.error ? "danger" : "success";

    if (notification.shown) {
        return null;
    }

    return <>
        <div className={"alert alert-" + typeStr} role="alert">{notification.text}</div>
    </>
}
export default Notification;
