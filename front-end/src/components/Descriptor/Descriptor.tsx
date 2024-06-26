import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

import {
  ScDecriptorContainer,
  ScDescriptionText,
  ScTitleText,
} from "./Descriptor.styled";

interface DescriptorProps {
  title: string;
  description?: string | undefined;
  isLiked: boolean;
  toggleLike: () => void;
  showHeartIcon?: boolean;
}

export default function Descriptor({
  title,
  description,
  isLiked,
  toggleLike,
  showHeartIcon,
}: DescriptorProps) {
  return (
    <ScDecriptorContainer>
      <View>
        <ScTitleText>{title}</ScTitleText>
        {description && <ScDescriptionText>{description}</ScDescriptionText>}
      </View>

      {showHeartIcon && (
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={46}
            color={isLiked ? "#ff8610" : "grey"}
          />
        </TouchableOpacity>
      )}
    </ScDecriptorContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heartIcon: {
    marginLeft: 8,
  },
});
