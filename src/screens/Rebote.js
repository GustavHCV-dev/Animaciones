import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';

export default function Rebote() {
  const escala = useSharedValue(1);

  const estilo = useAnimatedStyle(() => ({ transform: [{ scale: escala.value }] }));

  return (
    <View style={styles.pantalla}>
      <Text style={styles.texto}>Mantén presionada la figura y suéltala</Text>
      <Pressable
        onPressIn={() => {
          escala.value = withTiming(0.6, { duration: 150 });
        }}
        onPressOut={() => {
          escala.value = withSpring(1, { damping: 4, stiffness: 180 });
        }}
      >
        <Animated.View style={[styles.figura, estilo]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', alignItems: 'center', justifyContent: 'center' },
  texto: { position: 'absolute', top: 24, paddingHorizontal: 24, textAlign: 'center', color: '#475569', fontSize: 15 },
  figura: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#F59E0B' },
});
