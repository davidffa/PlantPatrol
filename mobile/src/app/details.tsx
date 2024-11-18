import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';



type Plant = {
  "id": string,
  "name": string,
  "minimum": number,
  "amount": number,
  "family": string,
  "maxHeight": number,
  "about": string,
  "curiosities": string,
  "imageUrl": string;
}

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id;

  const [clientId, setClientId] = useState("");
  const [plant, setPlant] = useState<Plant>();
  const [alertPlantIds, setAlertPlantIds] = useState<string[]>([]);
  const alert = alertPlantIds.includes(id.toString());

  useEffect(() => {
    async function getData() {
      try {
        let Id = await AsyncStorage.getItem('clientId');
        if (Id === null) {
          Id = uuid.v4();
          await AsyncStorage.setItem('clientId', Id);
        }
        setClientId(Id);

      } catch (e) { console.log(e) }
    }

    async function getPlant() {
      const { data } = await api.get<Plant>(`/inventory/${id}`);
      setPlant(data);
    }

    async function getToggles() {
      try {
        const { data } = await api.get<string[]>(`/reminders/${clientId}`);
        setAlertPlantIds(data);
      } catch { }
    }

    getData();
    getPlant();
    getToggles();
  }, []);

  async function toggleAlert() {
    if (alertPlantIds.includes(id.toString())) {
      setAlertPlantIds(prev => prev.filter(it => it !== id));
      await api.delete(`/reminders/${id}`)
    } else {
      setAlertPlantIds([...alertPlantIds, id.toString()]);
      await api.post("/reminders", { clientId, id });
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="m-4 justify-between flex-row">
        <Feather name="arrow-left" size={45} onPress={router.back} />
        <TouchableOpacity className={` ${alert && "bg-red-600 rounded-full p-1.5"}`} onPress={toggleAlert} activeOpacity={0.7}>
          <Feather name="bell" color={alert ? "white" : "black"} size={alert ? 36 : 45} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="items-center justify-center">
          <Image source={{ uri: plant?.imageUrl }} height={300} width={300} className="h-64" />
        </View>
        <View className="bg-gray-200 rounded-3xl mx-4 mt-12 py-8">
          <View className="flex-row justify-between">
            <Text className="text-lg ml-6 py-2 font-bold">___ Best choice</Text>
            {plant?.amount === 0 ?
              <View className=" bg-red-500 rounded-l-3xl items-center justify-center py-2 px-3 ">
                <Text className="text-xl color-white gap-2">Not Available</Text>
              </View>
              :
              <View className=" bg-green rounded-l-3xl items-center justify-center py-2 px-3 ">
                <Text className="text-xl color-white gap-2">Available</Text>
              </View>
            }
          </View>
          <Text className="text-3xl ml-6 py-4 font-bold">{plant?.name}</Text>
          <Text className="text-lg ml-6 py-2 font-italic">{plant?.family}</Text>
          <Text className="text-lg ml-6 py-2 font-bold">About</Text>
          <Text className="text-lg ml-6">{plant?.about}</Text>
          <Text className="text-lg ml-6 py-2 font-bold">Curiosities</Text>
          <Text className="text-lg ml-6">{plant?.curiosities}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
