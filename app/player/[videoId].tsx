import react, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useWindowDimensions, View, StyleSheet, Pressable, Text } from "react-native";
import { VideoPlayer } from "@/components/VideoPlayer/VideoPlayer";
import { COLORS } from "@/constants/Colors";

export default function FullVideoPlayer() {
  const { streamUrl } = useLocalSearchParams();
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  const [isBackFocused, setIsBackFocused] = useState(false);

  const handleBackPress = () => {
    router.back();
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      {streamUrl && typeof streamUrl === "string" && (
        <VideoPlayer
          source={streamUrl}
          playerDimensions={{ width, height }}
        />
      )}
      <View style={styles.navBar}>
        <Pressable
          style={[styles.backButton, isBackFocused && styles.backButtonFocused]}
          onPress={handleBackPress}
          onFocus={() => setIsBackFocused(true)}
          onBlur={() => setIsBackFocused(false)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paneBackground,
  },
  navBar: {
    backgroundColor: "transparent",
    position: "absolute",
  },
  backButton: {
    backgroundColor: COLORS.textNormal,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 4,
  },
  backButtonFocused: {
    backgroundColor: COLORS.textSecondary,
    transform: [{ scale: 1.05 }],
  },
  backButtonText: {
    color: COLORS.textLight,
  }
})