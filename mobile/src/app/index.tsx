import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PlantCard } from "@/components/PlantCard";
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
  "imageUrl": string;
}

export default function Home() {
  const router = useRouter();
  const [clientId, setClientId] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlants, setSearchPlants] = useState<Plant[]>([]);
  const [alertPlantIds, setAlertPlantIds] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        let id = await AsyncStorage.getItem('clientId');
        if (id === null) {
          id = uuid.v4();
          await AsyncStorage.setItem('clientId', id);
        }
        setClientId(id);

      } catch (e) { console.log(e) }
    }

    async function getPlants() {
      const { data } = await api.get<Plant[]>("/inventory");
      setPlants(data);
    }

    async function getToggles() {
      try {
        const { data } = await api.get<string[]>(`/reminders/${clientId}`);
        setAlertPlantIds(data);
      } catch { }
    }

    getData();
    getPlants();
    getToggles();
  }, []);

  useEffect(() => {
    async function getSearchPlants() {
      try {
        const { data } = await api.get<Plant[]>("/inventory", { params: { name: searchQuery.toLowerCase() } });
        setSearchPlants(data);
      } catch (err) {
        console.error(err);
      }
    } getSearchPlants();
  }, [searchQuery]);

  async function toggleAlert(id: string) {
    if (alertPlantIds.includes(id)) {
      setAlertPlantIds(prev => prev.filter(it => it !== id));
      await api.delete(`/reminders/${id}`)
    } else {
      setAlertPlantIds([...alertPlantIds, id]);
      await api.post("/reminders", { clientId, id });
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
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 w-full py-4 ">
            <Feather name="search" size={18} />
            <TextInput className="px-4 w-full" placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
          </View>
        </View>
        {searchQuery === "" ?
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
            renderItem={({ item }) => <PlantCard name={item.name} image={{ uri: item.imageUrl }} alert={alertPlantIds.includes(item.id)} onToggleAlert={() => toggleAlert(item.id)} onClick={() => router.push({ pathname: 'details', params: { id: item.id } })} />}
            keyExtractor={item => item.id}
          />
          :
          <FlatList
            className="mt-6"
            data={searchPlants}
            contentContainerStyle={{
              paddingBottom: 20,
              gap: 24
            }}
            columnWrapperStyle={{
              paddingRight: 8,
              gap: 8
            }}
            numColumns={2}
            renderItem={({ item }) => <PlantCard name={item.name} image={{ uri: item.imageUrl }} alert={alertPlantIds.includes(item.id)} onToggleAlert={() => toggleAlert(item.id)} onClick={() => router.push({ pathname: 'details', params: { id: item.id } })} />}
            keyExtractor={item => item.id}
          />

        }
      </View>
    </SafeAreaView>
  )
}
