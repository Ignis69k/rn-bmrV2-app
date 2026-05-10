import { Text, View, StyleSheet, ActivityIndicator, Image, Animated, Dimensions } from "react-native";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/bmr");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      style={styles.gradient}
    >
      {/* Decorative orbs */}
      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      <Animated.View
        style={[
          styles.centerContent,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        {/* Glass card around logo */}
        <View style={styles.glassWrapper}>
          <BlurView intensity={30} tint="dark" style={styles.glassCard}>
            <View style={styles.glassInner}>
              <Image
                source={{
                  uri: "https://i.guim.co.uk/img/media/9fc85caeab0477368b277d9a772216ab86974350/0_0_3000_2400/master/3000.jpg?width=620&dpr=1&s=none&crop=none",
                }}
                style={styles.imgLogo}
              />
            </View>
          </BlurView>
        </View>

        <Text style={styles.txtAppName}>BMR Calculator</Text>
        <Text style={styles.txtSubtitle}>Liquid Glass Edition</Text>

        <ActivityIndicator
          size="large"
          color="#a855f7"
          style={{ marginTop: 30 }}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Decorative orbs */
  orb1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 999,
    backgroundColor: "rgba(168, 85, 247, 0.15)",
    top: -50,
    right: -60,
  },
  orb2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 999,
    backgroundColor: "rgba(59, 130, 246, 0.12)",
    bottom: 100,
    left: -80,
  },
  orb3: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 999,
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    bottom: -30,
    right: 40,
  },

  /* Glass card */
  glassWrapper: {
    borderRadius: 28,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#a855f7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
    marginBottom: 24,
  },
  glassCard: {
    borderRadius: 28,
    overflow: "hidden",
  },
  glassInner: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  imgLogo: {
    width: 140,
    height: 140,
    borderRadius: 20,
  },

  txtAppName: {
    fontSize: 32,
    fontFamily: "Krub_700Bold",
    color: "#ffffff",
    textShadowColor: "rgba(168, 85, 247, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 16,
    letterSpacing: 1,
  },
  txtSubtitle: {
    fontSize: 14,
    fontFamily: "Krub_400Regular",
    color: "rgba(255,255,255,0.5)",
    marginTop: 6,
    letterSpacing: 2,
  },
});
