import { Image, StyleSheet, Platform, Alert, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

export default function HomeScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "309108740044-8he8vo7uh3makgimc15ka1hjujs2v60b.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId:
      "309108740044-8he8vo7uh3makgimc15ka1hjujs2v60b.apps.googleusercontent.com",
    scopes: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/youtube.readonly",
    ],
  });
  const [displayData, setDisplayData] = useState<string>();

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (!authentication) {
        Alert.alert("authenticationがnullです");
        return;
      }
      fetchYouTubeData(authentication.accessToken);
    }
  }, [response]);

  const fetchYouTubeData = async (accessToken: string) => {
    console.log("🚀🚀🚀 fetchYoutubeDataしました")
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      const displayData = JSON.stringify(data);
      setDisplayData(displayData);
      console.log("YouTube Data: ", data);
      Alert.alert("YouTubeデータが取得されました", displayData);
    } catch (error) {
      console.error("YouTube API Error", error);
      Alert.alert("YouTubeデータの取得に失敗しました");
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{" "}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <Button
        title="Googleアカウントでログイン"
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      />
      {displayData && displayData}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
