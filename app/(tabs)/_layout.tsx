// app/(tabs)/_layout.tsx
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import MyProfileHeaderMenu from '../../myProfile/MyProfileHeaderMenu';
// Un helper para colocar iconos
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs>
    {/* 1) Home (Inicio) */}
    <Tabs.Screen
      name="homeUI"
      options={{
        title: 'Inicio',
        tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
      }}
    />
  
    {/* 2) Mis postulaciones */}
    <Tabs.Screen
      name="myPostulations"
      options={{
        title: 'Postulaciones',
        tabBarIcon: ({ color }) => <TabBarIcon name="file-text-o" color={color} />,
      }}
    />
  
    {/* 3) Mi perfil */}
    <Tabs.Screen
      name="myProfile"
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color }) => <TabBarIcon name="user-circle-o" color={color} />,
       
      }}
/>
  
    {/* 4) Buscar */}
    <Tabs.Screen
      name="searchScreen"
      options={{
        title: 'Buscar',
        tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
      }}
    />
  
    {/* 5) Detalles de tareas */}
    <Tabs>
      {/* Tus otras pestañas */}
      <Tabs.Screen name="taskDetail" options={{
        title: "Detalles",
       
        headerShown: true,
      }} />
    </Tabs>
  
    {/* 6) Vista de usuario */}
    <Tabs.Screen
      name="userDetails"
      options={{
        title: 'Usuario',
        tabBarIcon: ({ color }) => <TabBarIcon name="address-card-o" color={color} />,
      }}
    />
  </Tabs>
  
  );
}
