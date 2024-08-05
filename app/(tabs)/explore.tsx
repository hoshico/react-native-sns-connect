import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, Button } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Auth0, { User } from "react-native-auth0";
import { useState } from "react";

const auth0 = new Auth0({
  domain: "dev-0jpbce4umrjdyxq3.us.auth0.com",
  clientId: "jDnQ4y55FK0ATyXq8B2bMMAnWa4lcxvg",
});

export default function TabTwoScreen() {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const loginWithYoutube = async () => {
    console.log("🚀 youtube");
    console.log("webauth:", auth0.webAuth);
    try {
      const credentials = await auth0.webAuth.authorize({
        connection: "youtube",
      });
      console.log("credentials情報: ", credentials);
      const user = await auth0.auth.userInfo({
        token: credentials.accessToken,
      });
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Button title="Youtube連携" onPress={loginWithYoutube} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
