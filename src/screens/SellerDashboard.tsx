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

type SellerDashboardProps = {
  navigation: StackNavigationProp<any, 'SellerDashboard'>;
};

export default function SellerDashboard({ navigation }: SellerDashboardProps) {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const quickActions = [
    { title: 'Add Product', icon: '➕', action: () => {} },
    { title: 'Manage Inventory', icon: '📦', action: () => {} },
    { title: 'View Orders', icon: '📋', action: () => {} },
    { title: 'Analytics', icon: '📊', action: () => {} },
  ];

  const recentSales = [
    { id: '1', product: 'Premium Beef', quantity: '2kg', amount: '$45.00', date: '2024-01-22' },
    { id: '2', product: 'Chicken Wings', quantity: '1kg', amount: '$18.00', date: '2024-01-21' },
  ];

  const stats = [
    { label: 'Total Sales', value: '$1,250', icon: '💰' },
    { label: 'Orders Today', value: '12', icon: '📦' },
    { label: 'Products Listed', value: '34', icon: '🥩' },
    { label: 'Rating', value: '4.8', icon: '⭐' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.welcome, { color: colors.foreground }]}>
          Seller Dashboard
        </Text>
        {user && (
          <Text style={[styles.userEmail, { color: colors.mutedForeground }]}>
            {user.email}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        <Card style={styles.statsCard}>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={[styles.statItem, { borderColor: colors.border }]}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={[styles.statValue, { color: colors.foreground }]}>
                    {stat.value}
                  </Text>
                  <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

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

        <Card style={styles.salesCard}>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {recentSales.map((sale) => (
              <View key={sale.id} style={[styles.saleItem, { borderBottomColor: colors.border }]}>
                <View style={styles.saleInfo}>
                  <Text style={[styles.saleProduct, { color: colors.foreground }]}>
                    {sale.product}
                  </Text>
                  <Text style={[styles.saleDetails, { color: colors.mutedForeground }]}>
                    {sale.quantity} • {sale.date}
                  </Text>
                </View>
                <Text style={[styles.saleAmount, { color: colors.primary }]}>
                  {sale.amount}
                </Text>
              </View>
            ))}
          </CardContent>
        </Card>

        <Card style={styles.toolsCard}>
          <CardHeader>
            <CardTitle>Seller Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.toolsList}>
              <Text style={[styles.tool, { color: colors.mutedForeground }]}>
                📱 Mobile-friendly management
              </Text>
              <Text style={[styles.tool, { color: colors.mutedForeground }]}>
                📊 Real-time analytics
              </Text>
              <Text style={[styles.tool, { color: colors.mutedForeground }]}>
                🔔 Order notifications
              </Text>
              <Text style={[styles.tool, { color: colors.mutedForeground }]}>
                💳 Payment tracking
              </Text>
              <Text style={[styles.tool, { color: colors.mutedForeground }]}>
                📦 Inventory management
              </Text>
            </View>
          </CardContent>
        </Card>

        {!user && (
          <Card style={styles.authCard}>
            <CardContent>
              <Text style={[styles.authPrompt, { color: colors.foreground }]}>
                Sign in to access seller features
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
  statsCard: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
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
    aspectRatio: 1.2,
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
  salesCard: {
    marginBottom: 20,
  },
  saleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  saleInfo: {
    flex: 1,
  },
  saleProduct: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  saleDetails: {
    fontSize: 14,
  },
  saleAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolsCard: {
    marginBottom: 20,
  },
  toolsList: {
    gap: 12,
  },
  tool: {
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