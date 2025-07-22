import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AuthScreen from './src/screens/AuthScreen';
import CustomerDashboard from './src/screens/CustomerDashboard';
import SellerDashboard from './src/screens/SellerDashboard';
import DeveloperScreen from './src/screens/DeveloperScreen';

// Context & Providers
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#059669',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <Stack.Screen 
                  name="Home" 
                  component={HomeScreen} 
                  options={{ title: 'Meaty Mart Express' }}
                />
                <Stack.Screen 
                  name="Auth" 
                  component={AuthScreen} 
                  options={{ title: 'Sign In' }}
                />
                <Stack.Screen 
                  name="CustomerDashboard" 
                  component={CustomerDashboard} 
                  options={{ title: 'Customer Dashboard' }}
                />
                <Stack.Screen 
                  name="SellerDashboard" 
                  component={SellerDashboard} 
                  options={{ title: 'Seller Dashboard' }}
                />
                <Stack.Screen 
                  name="Developer" 
                  component={DeveloperScreen} 
                  options={{ title: 'Developer Settings' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="light" />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}