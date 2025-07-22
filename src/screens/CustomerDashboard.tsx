import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';

type CustomerDashboardProps = {
  navigation: StackNavigationProp<any, 'CustomerDashboard'>;
};

export default function CustomerDashboard({ navigation }: CustomerDashboardProps) {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const quickActions = [
    { title: 'Browse Products', icon: '🥩', action: () => {} },
    { title: 'My Orders', icon: '📦', action: () => {} },
    { title: 'Cart', icon: '🛒', action: () => {} },
    { title: 'Wishlist', icon: '❤️', action: () => {} },
  ];

  const recentOrders = [
    { id: '1', items: 'Premium Beef (2kg)', status: 'Delivered', date: '2024-01-20' },
    { id: '2', items: 'Chicken Breast (1kg)', status: 'In Transit', date: '2024-01-22' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.welcome, { color: colors.foreground }]}>
          Welcome back!
        </Text>
        {user && (
          <Text style={[styles.userEmail, { color: colors.mutedForeground }]}>
            {user.email}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Card style={styles.quickActionsCard}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionButton, { borderColor: colors.border }]}
                  onPress={action.action}
                >
                  <Text style={styles.actionIcon}>{action.icon}</Text>
                  <Text style={[styles.actionTitle, { color: colors.foreground }]}>
                    {action.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </CardContent>
        </Card>

        <Card style={styles.ordersCard}>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.map((order) => (
              <View key={order.id} style={[styles.orderItem, { borderBottomColor: colors.border }]}>
                <View style={styles.orderInfo}>
                  <Text style={[styles.orderItems, { color: colors.foreground }]}>
                    {order.items}
                  </Text>
                  <Text style={[styles.orderDate, { color: colors.mutedForeground }]}>
                    {order.date}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: order.status === 'Delivered' ? colors.primary : colors.accent }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: order.status === 'Delivered' ? colors.primaryForeground : colors.accentForeground }
                  ]}>
                    {order.status}
                  </Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        <Card style={styles.featuresCard}>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.featuresList}>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                🔍 Advanced Product Search
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                📍 Location-based Delivery
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                💳 Secure Payment Options
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                🔔 Order Notifications
              </Text>
              <Text style={[styles.feature, { color: colors.mutedForeground }]}>
                ⭐ Product Reviews
              </Text>
            </View>
          </CardContent>
        </Card>

        {!user && (
          <Card style={styles.authCard}>
            <CardContent>
              <Text style={[styles.authPrompt, { color: colors.foreground }]}>
                Sign in to access all features
              </Text>
              <Button
                title="Sign In"
                onPress={() => navigation.navigate('Auth')}
                style={styles.authButton}
              />
            </CardContent>
          </Card>
        )}

        {user && (
          <Button
            title="Sign Out"
            onPress={signOut}
            variant="destructive"
            style={styles.signOutButton}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  quickActionsCard: {
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  ordersCard: {
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  orderInfo: {
    flex: 1,
  },
  orderItems: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  featuresCard: {
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
  },
  authCard: {
    marginBottom: 20,
    alignItems: 'center',
  },
  authPrompt: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  authButton: {
    alignSelf: 'center',
  },
  signOutButton: {
    marginTop: 20,
  },
});