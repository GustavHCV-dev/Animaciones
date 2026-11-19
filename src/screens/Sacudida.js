import { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat } from 'react-native-reanimated';
import { Accelerometer } from 'expo-sensors';

const UMBRAL = 1.8;

export default function Sacudida() {
  const desplazamiento = useSharedValue(0);
  const giro = useSharedValue(0);

  const sacudir = () => {
    desplazamiento.value = withSequence(
      withTiming(-25, { duration: 50 }),
      withRepeat(withTiming(25, { duration: 100 }), 6, true),
      withTiming(0, { duration: 50 })
    );
    giro.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withRepeat(withTiming(8, { duration: 100 }), 6, true),
      withTiming(0, { duration: 50 })
    );
  };

  useEffect(() => {
    let ultimo = 0;
    Accelerometer.setUpdateInterval(100);
    const suscripcion = Accelerometer.addListener(({ x, y, z }) => {
      const fuerza = Math.sqrt(x * x + y * y + z * z);
      const ahora = Date.now();
      if (fuerza > UMBRAL && ahora - ultimo > 1000) {
        ultimo = ahora;
        sacudir();
      }
    });
    return () => suscripcion.remove();
  }, []);

  const estilo = useAnimatedStyle(() => ({
    transform: [{ translateX: desplazamiento.value }, { rotate: `${giro.value}deg` }],
  }));

  return (
    <View style={styles.pantalla}>
      <Text style={styles.texto}>Sacude el celular para que la figura se agite</Text>
      <Animated.View style={[styles.figura, estilo]} />
      <Pressable style={styles.boton} onPress={sacudir}>
        <Text style={styles.botonTexto}>Probar sacudida</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', alignItems: 'center', justifyContent: 'center' },
  texto: { position: 'absolute', top: 24, paddingHorizontal: 24, textAlign: 'center', color: '#475569', fontSize: 15 },
  figura: { width: 140, height: 140, borderRadius: 28, backgroundColor: '#DC2626' },
  boton: { position: 'absolute', bottom: 40, backgroundColor: '#0F2A52', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  botonTexto: { color: '#FFFFFF', fontWeight: '600' },
});
