import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';

type HomeScreenProps = {
  navigation: StackNavigationProp<any, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { colors } = useTheme();

  const handleRoleSelection = (role: 'customer' | 'seller' | 'developer') => {
    switch (role) {
      case 'customer':
        navigation.navigate('CustomerDashboard');
        break;
      case 'seller':
        navigation.navigate('SellerDashboard');
        break;
      case 'developer':
        navigation.navigate('Developer');
        break;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.hero}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          🥩 Meaty Mart Express
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Fresh meat delivered to your doorstep
        </Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Welcome to Meaty Mart</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              Your one-stop destination for premium quality meat products. 
              Choose your role to get started.
            </Text>
          </CardContent>
        </Card>

        <View style={styles.roleContainer}>
          <Card style={styles.roleCard}>
            <CardContent>
              <Text style={[styles.roleTitle, { color: colors.foreground }]}>
                🛒 Customer
              </Text>
              <Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>
                Browse and order fresh meat products
              </Text>
              <Button
                title="Shop Now"
                onPress={() => handleRoleSelection('customer')}
                style={styles.roleButton}
              />
            </CardContent>
          </Card>

          <Card style={styles.roleCard}>
            <CardContent>
              <Text style={[styles.roleTitle, { color: colors.foreground }]}>
                🏪 Seller
              </Text>
              <Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>
                Manage your meat shop and inventory
              </Text>
              <Button
                title="Sell Products"
                onPress={() => handleRoleSelection('seller')}
                variant="secondary"
                style={styles.roleButton}
              />
            </CardContent>
          </Card>

          <Card style={styles.roleCard}>
            <CardContent>
              <Text style={[styles.roleTitle, { color: colors.foreground }]}>
                ⚙️ Developer
              </Text>
              <Text style={[styles.roleDescription, { color: colors.mutedForeground }]}>
                Access developer tools and settings
              </Text>
              <Button
                title="Dev Settings"
                onPress={() => handleRoleSelection('developer')}
                variant="outline"
                style={styles.roleButton}
              />
            </CardContent>
          </Card>
        </View>

        <Card style={styles.featuresCard}>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.featuresList}>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                ✓ Fresh meat delivery
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                ✓ Multiple vendors
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                ✓ Real-time tracking
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                ✓ Secure payments
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  roleContainer: {
    marginBottom: 20,
  },
  roleCard: {
    marginBottom: 16,
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  roleButton: {
    marginTop: 8,
  },
  featuresCard: {
    marginBottom: 20,
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
  },
});