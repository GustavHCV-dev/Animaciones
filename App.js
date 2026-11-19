import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArrastrarRotar from './src/screens/ArrastrarRotar';
import Carga from './src/screens/Carga';
import Multitouch from './src/screens/Multitouch';
import Rebote from './src/screens/Rebote';
import Carrusel from './src/screens/Carrusel';
import Sacudida from './src/screens/Sacudida';

const Drawer = createDrawerNavigator();

const pantallas = [
  { nombre: 'Arrastrar y rotar', componente: ArrastrarRotar, icono: 'cursor-move' },
  { nombre: 'Animación de carga', componente: Carga, icono: 'loading' },
  { nombre: 'Gestos multitouch', componente: Multitouch, icono: 'gesture-pinch' },
  { nombre: 'Animación de rebote', componente: Rebote, icono: 'basketball' },
  { nombre: 'Carrusel animado', componente: Carrusel, icono: 'view-carousel' },
  { nombre: 'Acelerómetro', componente: Sacudida, icono: 'vibrate' },
];

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0F2A52' },
            headerTintColor: '#FFFFFF',
            drawerActiveTintColor: '#2563EB',
          }}
        >
          {pantallas.map((p) => (
            <Drawer.Screen
              key={p.nombre}
              name={p.nombre}
              component={p.componente}
              options={{
                drawerIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name={p.icono} size={size} color={color} />
                ),
              }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
