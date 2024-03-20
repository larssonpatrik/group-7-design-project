import React, { useState } from "react";
import { Text, View } from "react-native";
import { ScTextInput } from "./UserInput.styled";
import Spacer from "../Spacer/Spacer";

interface UserInputProps {
  title: string;
  placeholder: string;
  value: string;
  setValue: (newValue: string) => void;
  textArea?: boolean;
}

export default function UserInput({
  title,
  placeholder,
  value,
  setValue,
  textArea = false,
}: UserInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
      <Spacer orientation="vertical" size={2} />
      <ScTextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        focus={focused}
        textArea={textArea}
        multiline={textArea}
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
}
