import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import uuid from 'react-native-uuid';

// Key for storing the UUID in AsyncStorage
const DEVICE_UUID_KEY = '@device_uuid';

export const useDeviceUUID = () => {

    const [isUUIDReady, setIsUUIDReady] = useState<boolean>(false);
    const [deviceUUID, setDeviceUUID] = useState<string | null>(null);

    useEffect(() => {
        const initializeUUID = async () => {
            try {
                let storageUUID = await AsyncStorage.getItem(DEVICE_UUID_KEY)

                if (!storageUUID) {
                    storageUUID = uuid.v4()
                    await AsyncStorage.setItem(DEVICE_UUID_KEY, storageUUID)
                }
                setDeviceUUID(storageUUID);
                setIsUUIDReady(true);
            } catch (error) {
                console.error('Error initializing UUID:', error);
                // Handle error appropriately for your app
                setIsUUIDReady(true); // Still set to true to not block app indefinitely
            }
        }

        initializeUUID()
    }, [])

    return { isUUIDReady, deviceUUID };
}