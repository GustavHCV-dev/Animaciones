import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';

export default function ArrastrarRotar() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const inicioX = useSharedValue(0);
  const inicioY = useSharedValue(0);
  const rotacion = useSharedValue(0);

  const gesto = usePanGesture({
    onBegin: () => {
      'worklet';
      inicioX.value = x.value;
      inicioY.value = y.value;
    },
    onUpdate: (e) => {
      'worklet';
      x.value = inicioX.value + e.translationX;
      y.value = inicioY.value + e.translationY;
      rotacion.value = interpolate(e.translationX, [-150, 0, 150], [-35, 0, 35], Extrapolation.CLAMP);
    },
    onFinalize: () => {
      'worklet';
      rotacion.value = withSpring(0);
    },
  });

  const estilo = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { rotate: `${rotacion.value}deg` }],
  }));

  return (
    <View style={styles.pantalla}>
      <Text style={styles.texto}>Arrastra la figura: gira a la izquierda o a la derecha según el movimiento</Text>
      <GestureDetector gesture={gesto}>
        <Animated.View style={[styles.figura, estilo]}>
          <Text style={styles.flecha}>▲</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', alignItems: 'center', justifyContent: 'center' },
  texto: { position: 'absolute', top: 24, paddingHorizontal: 24, textAlign: 'center', color: '#475569', fontSize: 15 },
  figura: { width: 120, height: 120, borderRadius: 24, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  flecha: { color: '#FFFFFF', fontSize: 40 },
});
