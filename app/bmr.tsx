import React, { useState, useRef } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Animated,
    Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Bmr() {
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [bmr, setBmr] = useState(0);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const animateResult = () => {
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.05,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const HandleBMRCal = () => {
        if (!weight || !height || !age) {
            Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบ");
            return;
        }
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseFloat(age);
        let bmrval = 0;

        if (gender === "male") {
            bmrval = 66 + 13.7 * w + 5 * h - 6.8 * a;
        } else {
            bmrval = 655 + 9.6 * w + 1.8 * h - 4.7 * a;
        }
        setBmr(bmrval);
        animateResult();
    };

    return (
        <LinearGradient
            colors={["#0f0c29", "#302b63", "#24243e"]}
            style={styles.gradientBg}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Decorative floating orbs */}
                <View style={styles.orbContainer}>
                    <View style={[styles.orb, styles.orb1]} />
                    <View style={[styles.orb, styles.orb2]} />
                    <View style={[styles.orb, styles.orb3]} />
                </View>

                {/* ส่วนของ Header แสดงรูปและชื่อแอปฯ */}
                <View style={styles.headerBmr}>
                    <Image
                        source={{
                            uri: "https://i.guim.co.uk/img/media/9fc85caeab0477368b277d9a772216ab86974350/0_0_3000_2400/master/3000.jpg?width=620&dpr=1&s=none&crop=none",
                        }}
                        style={styles.imglogo}
                    />
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(15, 12, 41, 0.6)",
                            "rgba(15, 12, 41, 0.95)",
                        ]}
                        style={styles.headerOverlay}
                    />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>BMR Calculator</Text>
                        <Text style={styles.headerSubTitle}>
                            อัตราการเผาผลาญพลักงานพื้นฐานที่ร่างกายต้องการ
                        </Text>
                    </View>
                </View>

                {/* ส่วนของการเลือกเพศ — Glass Card */}
                <View style={styles.glassCardWrapper}>
                    <BlurView intensity={30} tint="dark" style={styles.glassCard}>
                        <View style={styles.glassCardInner}>
                            <Text style={styles.sectionTitle}>เพศ (Gender)</Text>
                            <View style={styles.genderSelect}>
                                <TouchableOpacity
                                    onPress={() => setGender("male")}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={[
                                            styles.btGender,
                                            gender === "male" && styles.genderSelectActive,
                                        ]}
                                    >
                                        <Image
                                            source={require("@/assets/images/male.png")}
                                            style={styles.imgGender}
                                        />
                                        <Text style={styles.genderLabel}>ชาย</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setGender("female")}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={[
                                            styles.btGender,
                                            gender === "female" && styles.genderSelectActive,
                                        ]}
                                    >
                                        <Image
                                            source={require("@/assets/images/female.png")}
                                            style={styles.imgGender}
                                        />
                                        <Text style={styles.genderLabel}>หญิง</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BlurView>
                </View>

                {/* ส่วนของการป้อนน้ำหนัก และส่วนสูง — Glass Card */}
                <View style={styles.glassCardWrapper}>
                    <BlurView intensity={30} tint="dark" style={styles.glassCard}>
                        <View style={styles.glassCardInner}>
                            <View style={styles.whTitle}>
                                <Text style={[styles.sectionTitle, { width: "48%" }]}>
                                    น้ำหนัก (kg)
                                </Text>
                                <Text style={[styles.sectionTitle, { width: "48%" }]}>
                                    ส่วนสูง (cm)
                                </Text>
                            </View>
                            <View style={styles.whInput}>
                                <TextInput
                                    style={styles.glassInput}
                                    keyboardType="numeric"
                                    placeholder="เช่น 89.45 ..."
                                    placeholderTextColor="rgba(255,255,255,0.35)"
                                    value={weight}
                                    onChangeText={(text) => setWeight(text)}
                                />
                                <TextInput
                                    style={styles.glassInput}
                                    keyboardType="numeric"
                                    placeholder="เช่น 168.12 ..."
                                    placeholderTextColor="rgba(255,255,255,0.35)"
                                    value={height}
                                    onChangeText={(text) => setHeight(text)}
                                />
                            </View>
                        </View>
                    </BlurView>
                </View>

                {/* ส่วนของการป้อนอายุ — Glass Card */}
                <View style={styles.glassCardWrapper}>
                    <BlurView intensity={30} tint="dark" style={styles.glassCard}>
                        <View style={styles.glassCardInner}>
                            <Text style={styles.sectionTitle}>อายุ (ปี)</Text>
                            <TextInput
                                style={[styles.glassInput, { width: "100%" }]}
                                keyboardType="numeric"
                                placeholder="เช่น 35 ..."
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                value={age}
                                onChangeText={(text) => setAge(text)}
                            />
                        </View>
                    </BlurView>
                </View>

                {/* ส่วนของปุ่มคํานวณ */}
                <TouchableOpacity onPress={HandleBMRCal} activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#a855f7", "#6366f1", "#3b82f6"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.btBmr}
                    >
                        <Text style={styles.txtBtBmr}>✨ คํานวณ</Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* ส่วนของการแสดงผล BMR — Glass Card */}
                <Animated.View
                    style={[
                        styles.glassCardWrapper,
                        { transform: [{ scale: pulseAnim }] },
                    ]}
                >
                    <BlurView intensity={40} tint="dark" style={styles.glassCard}>
                        <View style={[styles.glassCardInner, styles.resultInner]}>
                            <Text style={styles.resultTitle1}>BMR ของคุณคือ</Text>
                            <Text style={styles.resultTitle2}>
                                {bmr.toFixed(2)}
                            </Text>
                            <Text style={styles.resultTitle3}>แคลอรี่ / วัน</Text>
                        </View>
                    </BlurView>
                </Animated.View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBg: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },

    /* Decorative floating orbs for liquid glass effect */
    orbContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    orb: {
        position: "absolute",
        borderRadius: 999,
    },
    orb1: {
        width: 200,
        height: 200,
        backgroundColor: "rgba(168, 85, 247, 0.15)",
        top: 80,
        left: -60,
    },
    orb2: {
        width: 150,
        height: 150,
        backgroundColor: "rgba(59, 130, 246, 0.12)",
        top: 300,
        right: -40,
    },
    orb3: {
        width: 180,
        height: 180,
        backgroundColor: "rgba(236, 72, 153, 0.1)",
        top: 550,
        left: 30,
    },

    /* Header */
    headerBmr: {
        height: 220,
        overflow: "hidden",
    },
    imglogo: {
        width: "100%",
        height: "100%",
    },
    headerOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "70%",
    },
    headerTextContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
    },
    headerTitle: {
        fontFamily: "Krub_700Bold",
        fontSize: 30,
        color: "#ffffff",
        textShadowColor: "rgba(168, 85, 247, 0.6)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 12,
    },
    headerSubTitle: {
        fontFamily: "Krub_400Regular",
        color: "rgba(255,255,255,0.7)",
        marginTop: 4,
        fontSize: 13,
    },

    /* Glass Card */
    glassCardWrapper: {
        marginHorizontal: 20,
        marginTop: 16,
        borderRadius: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
    },
    glassCard: {
        borderRadius: 20,
        overflow: "hidden",
    },
    glassCardInner: {
        padding: 20,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },

    /* Section Title */
    sectionTitle: {
        fontFamily: "Krub_700Bold",
        color: "rgba(255,255,255,0.9)",
        fontSize: 15,
        marginBottom: 12,
    },

    /* Gender */
    genderSelect: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btGender: {
        width: (width - 80) / 2,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        padding: 16,
        borderRadius: 16,
    },
    genderSelectActive: {
        backgroundColor: "rgba(168, 85, 247, 0.2)",
        borderColor: "rgba(168, 85, 247, 0.6)",
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 6,
    },
    imgGender: {
        width: 28,
        height: 28,
        marginBottom: 6,
        tintColor: "rgba(255,255,255,0.8)",
    },
    genderLabel: {
        fontFamily: "Krub_400Regular",
        color: "rgba(255,255,255,0.8)",
        fontSize: 13,
    },

    /* Weight & Height */
    whTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    whInput: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    glassInput: {
        width: "48%",
        backgroundColor: "rgba(255, 255, 255, 0.07)",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.12)",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: "#ffffff",
        fontFamily: "Krub_400Regular",
        fontSize: 14,
    },

    /* Calculate Button */
    btBmr: {
        marginHorizontal: 20,
        marginTop: 20,
        paddingVertical: 16,
        borderRadius: 18,
        alignItems: "center",
        shadowColor: "#a855f7",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    txtBtBmr: {
        color: "#ffffff",
        fontFamily: "Krub_700Bold",
        fontSize: 17,
        letterSpacing: 1,
    },

    /* Result */
    resultInner: {
        alignItems: "center",
        paddingVertical: 28,
    },
    resultTitle1: {
        fontFamily: "Krub_700Bold",
        color: "rgba(255,255,255,0.7)",
        fontSize: 14,
    },
    resultTitle2: {
        fontFamily: "Krub_700Bold",
        fontSize: 44,
        color: "#c084fc",
        textShadowColor: "rgba(192, 132, 252, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
        marginVertical: 4,
    },
    resultTitle3: {
        fontFamily: "Krub_400Regular",
        color: "rgba(255,255,255,0.5)",
        fontSize: 13,
    },
});