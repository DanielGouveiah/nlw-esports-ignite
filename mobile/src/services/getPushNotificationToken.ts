import * as Notifications from "expo-notifications";
import { requestPermissionsAsync } from "expo-notifications";

export async function getNotificationToken() {
  const { granted } = await Notifications.getPermissionsAsync();

  if (!granted) {
    requestPermissionsAsync();
  }

  if (granted) {
    const pushToken = await Notifications.getExpoPushTokenAsync();
    console.log("NOTIFICATION TOKEN =>", pushToken.data);
  }
}
