import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { plants as staticPlants } from "@/utils/plants";
import { PlantCard } from "@/components/PlantCard";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();

  const [plants, setPlants] = useState(staticPlants);
  const [searchQuery, setSearchQuery] = useState("");
  const [alertPlantIds, setAlertPlantIds] = useState(["1", "4", "6"]);

  useEffect(() => {
    setPlants(staticPlants.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery]);

  function toggleAlert(id: string) {
    if (alertPlantIds.includes(id)) {
      setAlertPlantIds(prev => prev.filter(it => it !== id));
    } else {
      setAlertPlantIds([...alertPlantIds, id]);
    }
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="px-8 mt-4 flex-1">
        <View className="flex-row justify-between">
          <View className="gap-4">
            <Text className="font-bold text-xl">Welcome to</Text>
            <Text className="font-bold text-green text-4xl">PlantPatrol</Text>
          </View>

          <TouchableOpacity className="flex-row bg-green my-auto px-4 py-2 rounded-md gap-2" activeOpacity={0.7} onPress={() => router.push("chat")}>
            <Text className="text-white font-bold">Help</Text>
            <Feather name="message-circle" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <View className="mt-8">
          <View className="flex-row w-full gap-2">
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 w-10/12">
              <Feather name="search" size={18} />
              <TextInput className="px-4 w-full" placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
            </View>
            <TouchableOpacity className="bg-green rounded-lg p-4">
              <Fontisto color="white" name="equalizer" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          className="mt-6"
          data={plants}
          contentContainerStyle={{
            paddingBottom: 20,
            gap: 24
          }}
          columnWrapperStyle={{
            paddingRight: 8,
            gap: 8
          }}
          numColumns={2}
          renderItem={({ item }) => <PlantCard name={item.name} image={item.imageUrl} alert={alertPlantIds.includes(item.id)} onToggleAlert={() => toggleAlert(item.id)} onClick={() => router.push({ pathname: 'details', params: { id: item.id } })} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  )
}
