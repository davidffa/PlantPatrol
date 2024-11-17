import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { plants as staticPlants } from "@/utils/plants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id[0];

  const [plants, setPlants] = useState(staticPlants);
  const [alertPlantIds, setAlertPlantIds] = useState(["1", "4", "6"]);
  const alert = alertPlantIds.includes(id);

  function getPlant(id: string) {
    const item = plants[parseInt(id) - 1]
    return item
  }

  function toggleAlert() {
    if (alertPlantIds.includes(id)) {
      setAlertPlantIds(prev => prev.filter(it => it !== id));
    } else {
      setAlertPlantIds([...alertPlantIds, id]);
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
          <Image source={getPlant(id).imageUrl} className="h-64" />
        </View>
        <View className="bg-gray-200 rounded-3xl mx-4 mt-12 py-8">
          <View className="flex-row justify-between">
            <Text className="text-lg ml-6 py-2 font-bold">___ Best choice</Text>
            {alert ?
              <View className=" bg-red-500 rounded-l-3xl items-center justify-center py-2 px-3 ">
                <Text className="text-xl color-white gap-2">Not Available</Text>
              </View>
              :
              <View className=" bg-green rounded-l-3xl items-center justify-center py-2 px-3 ">
                <Text className="text-xl color-white gap-2">Available</Text>
              </View>
            }
          </View>
          <Text className="text-3xl ml-6 py-4 font-bold">{getPlant(id).name}</Text>
          <Text className="text-lg ml-6 py-2 font-italic">Asphodelaceae</Text>
          <Text className="text-lg ml-6 py-2 font-bold">About</Text>
          <Text className="text-lg ml-6">{getPlant(id).about}</Text>
          <Text className="text-lg ml-6 py-2 font-bold">Curiosities</Text>
          <Text className="text-lg ml-6">{getPlant(id).curiosities}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
