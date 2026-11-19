import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { GestureDetector, usePanGesture, usePinchGesture, useRotationGesture, useSimultaneousGestures } from 'react-native-gesture-handler';

export default function Multitouch() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const inicioX = useSharedValue(0);
  const inicioY = useSharedValue(0);
  const escala = useSharedValue(1);
  const escalaBase = useSharedValue(1);
  const angulo = useSharedValue(0);
  const anguloBase = useSharedValue(0);

  const mover = usePanGesture({
    onBegin: () => {
      'worklet';
      inicioX.value = x.value;
      inicioY.value = y.value;
    },
    onUpdate: (e) => {
      'worklet';
      x.value = inicioX.value + e.translationX;
      y.value = inicioY.value + e.translationY;
    },
  });

  const zoom = usePinchGesture({
    onBegin: () => {
      'worklet';
      escalaBase.value = escala.value;
    },
    onUpdate: (e) => {
      'worklet';
      escala.value = Math.min(Math.max(escalaBase.value * e.scale, 0.4), 4);
    },
  });

  const girar = useRotationGesture({
    onBegin: () => {
      'worklet';
      anguloBase.value = angulo.value;
    },
    onUpdate: (e) => {
      'worklet';
      angulo.value = anguloBase.value + e.rotation;
    },
  });

  const gestos = useSimultaneousGestures(mover, zoom, girar);

  const estilo = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { scale: escala.value }, { rotate: `${angulo.value}rad` }],
  }));

  return (
    <View style={styles.pantalla}>
      <Text style={styles.texto}>Mueve con un dedo, haz zoom y gira con dos dedos</Text>
      <GestureDetector gesture={gestos}>
        <Animated.Image source={require('../../assets/foto.png')} style={[styles.imagen, estilo]} />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', alignItems: 'center', justifyContent: 'center' },
  texto: { position: 'absolute', top: 24, paddingHorizontal: 24, textAlign: 'center', color: '#475569', fontSize: 15 },
  imagen: { width: 260, height: 260, borderRadius: 16 },
});
