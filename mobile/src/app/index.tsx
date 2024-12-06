import React, { useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { PlantCard } from "@/components/PlantCard";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "@/services/api";
import { useUser } from "@/contexts/user";

import { RadioButton } from 'react-native-paper';


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
  const { clientId, pushToken } = useUser();
  const [checked, setChecked] = useState('all');

  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPlants, setSearchPlants] = useState<Plant[]>([]);
  const [alertPlantIds, setAlertPlantIds] = useState<string[]>([]);
  const [plantsFilter, setPlantsFilter] = useState<Plant[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function getData() {
        const { data } = await api.get<Plant[]>("/inventory");
        setPlants(data);
        try {
          const { data } = await api.get<string[]>(`/reminders/${clientId}`);
          setAlertPlantIds(data);
        } catch { }
      }
      getData();
    }, [])
  )

  useEffect(() => {
    async function getSearchPlants() {
      try {
        const { data } = await api.get<Plant[]>("/inventory", { params: { name: searchQuery.toLowerCase() } });
        setSearchPlants(data);
      } catch (err) {
        console.error(err);
      }
    }

    getSearchPlants();
  }, [searchQuery]);

  async function toggleAlert(id: string) {
    if (alertPlantIds.includes(id)) {
      await api.delete(`/reminders/${id}`, { headers: { clientId } });
      const { data } = await api.get(`/reminders/${clientId}`);
      setAlertPlantIds(data);
    } else {
      await api.post("/reminders", { clientId, plantId: id, pushToken });
      const { data } = await api.get(`/reminders/${clientId}`);
      setAlertPlantIds(data);
    }
  }

  useEffect(() => {
    function ListPlants() {
      if (searchQuery === "") {
        if (checked === 'all') {
          setPlantsFilter(plants);
        }
        else if (checked === 'toggled') {
          setPlantsFilter(plants.filter(plant => alertPlantIds.includes(plant.id)))
        }
        else {
          setPlantsFilter(plants.filter(plant => !alertPlantIds.includes(plant.id)))
        }
      } else {
        if (checked === 'all') {
          setPlantsFilter(searchPlants);
        }
        else if (checked === 'toggled') {
          setPlantsFilter(searchPlants.filter(plant => alertPlantIds.includes(plant.id)))
        }
        else {
          setPlantsFilter(searchPlants.filter(plant => !alertPlantIds.includes(plant.id)))
        }
      }
    }
    ListPlants();
  }, [plants, searchPlants, checked, searchQuery]);


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
          <View className="flex-row items-center bg-gray-100 rounded-lg px-4 w-full py-4">
            <Feather name="search" size={18} />
            <TextInput className="px-4 w-full" placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
          </View>
        </View>
        <View className="flex-row mt-3 justify-between bg-zinc-100 p-2 rounded-lg">
          <View className="flex-row">
            <RadioButton.Android
              value="nonToggled"
              status={checked === 'nonToggled' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('nonToggled')}
            />
            <Feather className="mt-1" name="bell" color={"black"} size={28} />
          </View>
          <View className="flex-row">
            <RadioButton.Android
              value="toggled"
              status={checked === 'toggled' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('toggled')}
            />
            <Feather className="bg-red-600 rounded-full p-1.5 " name="bell" color={"white"} size={24} />
          </View>
          <View className="flex-row">
            <RadioButton.Android
              value="all"
              status={checked === 'all' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('all')}
            />
            <Feather className="mt-1" name="bell" color={"black"} size={28} />
            <Feather className="mt-2 " name="plus" size={24} />
            <Feather className="bg-red-600 rounded-full p-1.5 " name="bell" color={"white"} size={24} />
          </View>

        </View>
        <FlatList
          className="mt-6"
          data={plantsFilter}
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
      </View>
    </SafeAreaView>
  )
}
