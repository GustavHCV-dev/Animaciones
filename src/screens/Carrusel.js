import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const datos = [
  { id: '1', titulo: 'Rojo', color: '#DC2626' },
  { id: '2', titulo: 'Naranja', color: '#F59E0B' },
  { id: '3', titulo: 'Verde', color: '#16A34A' },
  { id: '4', titulo: 'Azul', color: '#2563EB' },
  { id: '5', titulo: 'Morado', color: '#7C3AED' },
];

function Tarjeta({ item, indice, scrollX, ancho }) {
  const estilo = useAnimatedStyle(() => {
    const rango = [(indice - 1) * ancho, indice * ancho, (indice + 1) * ancho];
    return {
      opacity: interpolate(scrollX.value, rango, [0.5, 1, 0.5], Extrapolation.CLAMP),
      transform: [
        { scale: interpolate(scrollX.value, rango, [0.75, 1, 0.75], Extrapolation.CLAMP) },
        { rotate: `${interpolate(scrollX.value, rango, [-12, 0, 12], Extrapolation.CLAMP)}deg` },
      ],
    };
  });

  return (
    <View style={{ width: ancho, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[styles.tarjeta, { backgroundColor: item.color }, estilo]}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.numero}>{item.id}</Text>
      </Animated.View>
    </View>
  );
}

export default function Carrusel() {
  const { width } = useWindowDimensions();
  const scrollX = useSharedValue(0);

  const alDesplazar = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.pantalla}>
      <Animated.FlatList
        data={datos}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={alDesplazar}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => <Tarjeta item={item} indice={index} scrollX={scrollX} ancho={width} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: '#F3F5F9', justifyContent: 'center' },
  tarjeta: { width: 240, height: 340, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  titulo: { color: '#FFFFFF', fontSize: 28, fontWeight: '800' },
  numero: { color: '#FFFFFF', fontSize: 80, fontWeight: '800', opacity: 0.6 },
});
