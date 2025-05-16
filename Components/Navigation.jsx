// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import Home from '../Screens/Home/Home';
// import Login from '../Screens/Auth/Login';
// import Register from '../Screens/Auth/Register';
// import OnBoarding from '../Screens/Home/OnBoarding';
// import Products from "../Screens/Product/Products";
// import Product from "../Screens/Product/Product";
// import CartScreen from "../Screens/Product/CartScreen";
// import DeliveryInfo from "../Screens/Product/DeliveryInfo";
// import PaymentMethod from "../Screens/Payment/PaymentMethod";
// import PaymentSuccess from "../Screens/Payment/PaymentSuccess";
// import TrackProduct from "../Screens/Product/TrackProduct";
// import Profile from "../Screens/Auth/Profile";
// import OTP from '../Screens/Auth/OTP';
// import  Services  from '../Screens/Doctor/Services';
// import DoctorList from '../Screens/Doctor/DoctorList';
// import Doctor from '../Screens/Doctor/Doctor';
// import  AppointmnetTime, { AppointmentTime }  from '../Screens/Doctor/AppointmentTime';
// import { AppointmnetSuccess } from '../Screens/Doctor/AppointmnetSuccess';
// import Orders from '../Screens/Orders/Orders';
// import Appointments from '../Screens/Doctor/Appointments';


// const Navigation = ({navigation}) => {
//     const Stack = createNativeStackNavigator()
//   return (
//     <NavigationContainer>
//         <Stack.Navigator initialRouteName='onboard'
//         screenOptions={{
//             headerShown:false
//         }}
//         >
//             <Stack.Screen name='onboard' component={OnBoarding}/>
//             <Stack.Screen name='Home' component={Home}/>
//             <Stack.Screen name='Login' component={Login}/>
//             <Stack.Screen name='Register' component={Register} />
//             <Stack.Screen name='Products' component={Products} />
//             <Stack.Screen name='Product' component={Product} />
//             <Stack.Screen name='Cart' component={CartScreen} />
//             <Stack.Screen name='DeliveryInfo' component={DeliveryInfo} />
//             <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
//             <Stack.Screen name='PaymentSuccess' component={PaymentSuccess} />
//             <Stack.Screen name='TrackProduct' component={TrackProduct} /> 
//             <Stack.Screen name='Profile' component={Profile} />
//             <Stack.Screen name='Orders' component={Orders} />
//             <Stack.Screen name='OTP' component={OTP} />
//             <Stack.Screen name='Services' component={Services} />
//             <Stack.Screen name='AppointmentSuccess' component={AppointmnetSuccess} />
//             <Stack.Screen name='AppointmentTime' component={AppointmentTime} />
//             <Stack.Screen name='Doctors' component={DoctorList} />
//             <Stack.Screen name='Doctor' component={Doctor} />
//             <Stack.Screen name='Appointments' component={Appointments} />
//         </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default Navigation


import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

// React Navigation Imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icon Imports
import { Ionicons } from '@expo/vector-icons'; // If using Expo
// import Icon from 'react-native-vector-icons/Ionicons'; // If not using Expo

// Import Your Screens
import Home from '../Screens/Home/Home';
import Login from '../Screens/Auth/Login';
import Register from '../Screens/Auth/Register';
import OnBoarding from '../Screens/Home/OnBoarding';
import Products from "../Screens/Product/Products";
import Product from "../Screens/Product/Product";
import CartScreen from "../Screens/Product/CartScreen";
import DeliveryInfo from "../Screens/Product/DeliveryInfo";
import PaymentMethod from "../Screens/Payment/PaymentMethod";
import PaymentSuccess from "../Screens/Payment/PaymentSuccess";
import TrackProduct from "../Screens/Product/TrackProduct";
import Profile from "../Screens/Auth/Profile";
import OTP from '../Screens/Auth/OTP';
import Services from '../Screens/Doctor/Services';
import DoctorList from '../Screens/Doctor/DoctorList';
import Doctor from '../Screens/Doctor/Doctor';
import AppointmentTime from '../Screens/Doctor/AppointmentTime';
import AppointmnetSuccess from '../Screens/Doctor/AppointmnetSuccess';
import Orders from '../Screens/Orders/Orders';
import Appointments from '../Screens/Doctor/Appointments';
import Notification from './Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react"
import { AuthContext } from '../Context/context';


// Initialize Navigators
const RootStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName='OnBoarding' screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name='OnBoarding' component={OnBoarding} />
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='Register' component={Register} />
      <AuthStack.Screen name='OTP' component={OTP} />
      <AuthStack.Screen name='Home' component={Home} />
      <AuthStack.Screen name='Products' component={Products} />
      <AuthStack.Screen name='Product' component={Product} />
      {/* Add other auth-related screens here */}
    </AuthStack.Navigator>
  );
}


function ProductsStackNavigator() {
  return (
    <ProductsStack.Navigator initialRouteName='Products' screenOptions={{ headerShown: false }}>
      <ProductsStack.Screen name='Products' component={Products} />
      <ProductsStack.Screen name='Product' component={Product} />
      <ProductsStack.Screen name='Cart' component={CartScreen} />
      <ProductsStack.Screen name='DeliveryInfo' component={DeliveryInfo} />
      <ProductsStack.Screen name='PaymentMethod' component={PaymentMethod} />
      <ProductsStack.Screen name='PaymentSuccess' component={PaymentSuccess} />
    </ProductsStack.Navigator>
  );
}

function CartStackNavigator() {
  return (
    <CartStack.Navigator initialRouteName='Cart' screenOptions={{ headerShown: false }}>
      <CartStack.Screen name='Cart' component={CartScreen} />
      <CartStack.Screen name='DeliveryInfo' component={DeliveryInfo} />
      <CartStack.Screen name='PaymentMethod' component={PaymentMethod} />
      <CartStack.Screen name='PaymentSuccess' component={PaymentSuccess} />
    </CartStack.Navigator>
  );
}


function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator initialRouteName='Profile' screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name='Profile' component={Profile} />
      <ProfileStack.Screen name='Orders' component={Orders} />
      <ProfileStack.Screen name='Appointments' component={Appointments} />
      <ProfileStack.Screen name='Doctors' component={DoctorList} />
      <ProfileStack.Screen name='Doctor' component={Doctor} />
      <ProfileStack.Screen name='AppointmentTime' component={AppointmentTime} />
      <ProfileStack.Screen name='AppointmentSuccess' component={AppointmnetSuccess} />
      <ProductsStack.Screen name='Products' component={Products} />
      <ProfileStack.Screen name='Home' component={Home} />
    </ProfileStack.Navigator>
  );
}


function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName='HomeTab'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Assign icons based on the route name
          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'CartTab') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'ProfileTab') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'NotificationsTab') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          }

          // Return the appropriate icon
          return <Ionicons name={iconName} size={size} color={color} />;
    
        },
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name='HomeTab'
        component={ProductsStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name='CartTab'
        component={CartStackNavigator}
        options={{ tabBarLabel: 'Cart' }}
      />
      <Tab.Screen
        name='ProfileTab'
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name='NotificationsTab'
        component={Notification}
        options={{ tabBarLabel: 'Notifications' }}
      />
      <Tab.Screen
        name='SearchTab'
        component={Notification}
        options={{ tabBarLabel: 'Search' }}
      />
    </Tab.Navigator>
  );
}


function RootNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  const{isLoggedIn} = useContext(AuthContext);


  if (isLoading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size='large' color='#2f95dc' />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <RootStack.Screen name='AppTabs' component={AppTabs} />
      ) : (
        <RootStack.Screen name='Auth' component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}


const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation;