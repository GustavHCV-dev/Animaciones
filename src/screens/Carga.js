import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export default function Carga() {
  const giro = useSharedValue(0);
  const progreso = useSharedValue(0);

  useEffect(() => {
    giro.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false);
    progreso.value = withRepeat(withTiming(100, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, false);
  }, []);

  const estiloGiro = useAnimatedStyle(() => ({ transform: [{ rotate: `${giro.value}deg` }] }));
  const estiloBarra = useAnimatedStyle(() => ({ width: `${progreso.value}%` }));

  return (
    <View style={styles.pantalla}>
      <Animated.View style={[styles.spinner, estiloGiro]} />
      <Text style={styles.texto}>Cargando…</Text>
      <View style={styles.barra}>
        <Animated.View style={[styles.relleno, estiloBarra]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', alignItems: 'center', justifyContent: 'center' },
  spinner: { width: 90, height: 90, borderRadius: 45, borderWidth: 10, borderColor: '#CBD5E1', borderTopColor: '#2563EB' },
  texto: { marginTop: 24, marginBottom: 16, fontSize: 18, color: '#0F2A52', fontWeight: '600' },
  barra: { width: 240, height: 12, borderRadius: 6, backgroundColor: '#CBD5E1', overflow: 'hidden' },
  relleno: { height: 12, backgroundColor: '#16A34A' },
});
