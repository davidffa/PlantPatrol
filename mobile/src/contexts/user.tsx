import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants"
import { Platform } from "react-native";

const UserContext = createContext<UserContextData>({} as UserContextData);

type UserContextData = {
  clientId: string;
  pushToken: string | null;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("Plant Reminders", {
      name: "Plant Reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      handleRegistrationError("Permission not granted to get push token for push notification!");
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }

    try {
      const pushTokenString = await Notifications.getExpoPushTokenAsync({ projectId }).then(r => r.data);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}


export function UserProvider({ children }: { children: ReactNode }) {
  const [clientId, setClientId] = useState("");
  const [pushToken, setPushToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadClientId() {
      let id = await AsyncStorage.getItem("clientId");

      if (id === null) {
        id = uuid.v4();
        await AsyncStorage.setItem("clientId", id);
      }

      setClientId(id);
    }

    loadClientId();

    registerForPushNotificationsAsync()
      .then(token => setPushToken(token ?? ""))
      .catch(() => setPushToken(""))
  }, []);

  if (clientId === "" || pushToken === null) return null;

  return (
    <UserContext.Provider value={{ clientId, pushToken }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext);

  return context;
}

export default UserContext;
