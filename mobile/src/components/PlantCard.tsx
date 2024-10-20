import { View, Image, Text, ImageProps } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  name: string;
  image: ImageProps;
  alert?: boolean;
}

export function PlantCard({ name, image, alert = false }: Props) {
  return (
    <View className="bg-gray-100 rounded-lg p-4 gap-4 items-center justify-center relative w-1/2">
      <Image
        source={image}
      />
      <Text className="font-bold">{name}</Text>
      <View className={`absolute top-2 right-2 ${alert && "bg-red-600 rounded-full p-1.5"}`}>
        <Feather name="bell" color={alert ? "white" : "black"} size={alert ? 16 : 20} />
      </View>
    </View>
  )
}
