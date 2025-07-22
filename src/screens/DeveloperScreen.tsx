import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

type DeveloperScreenProps = {
  navigation: StackNavigationProp<any, 'Developer'>;
};

export default function DeveloperScreen({ navigation }: DeveloperScreenProps) {
  const { colors } = useTheme();
  const [debugMode, setDebugMode] = useState(false);
  const [apiLogging, setApiLogging] = useState(true);
  const [testMode, setTestMode] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('https://oaynfzqjielnsipttzbs.supabase.co');

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => {
            // Clear cache logic would go here
            Alert.alert('Success', 'Cache cleared successfully');
          }
        },
      ]
    );
  };

  const handleRunDiagnostics = () => {
    Alert.alert('Running Diagnostics...', 'This would run system diagnostics in a real app');
  };

  const devFeatures = [
    { title: 'API Monitor', description: 'Monitor API calls and responses', enabled: true },
    { title: 'Network Logger', description: 'Log network requests', enabled: true },
    { title: 'Performance Metrics', description: 'Track app performance', enabled: false },
    { title: 'Error Reporting', description: 'Automatic error reporting', enabled: true },
  ];

  const systemInfo = [
    { label: 'App Version', value: '1.0.0' },
    { label: 'Build Number', value: '100' },
    { label: 'React Native Version', value: '0.72.0' },
    { label: 'Expo SDK', value: '49.0.0' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          ⚙️ Developer Settings
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Advanced configuration and debugging tools
        </Text>
      </View>

      <View style={styles.content}>
        <Card style={styles.settingsCard}>
          <CardHeader>
            <CardTitle>Debug Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                  Debug Mode
                </Text>
                <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                  Enable verbose logging and debug tools
                </Text>
              </View>
              <Switch
                value={debugMode}
                onValueChange={setDebugMode}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor={debugMode ? colors.primaryForeground : colors.mutedForeground}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                  API Logging
                </Text>
                <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                  Log all API requests and responses
                </Text>
              </View>
              <Switch
                value={apiLogging}
                onValueChange={setApiLogging}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor={apiLogging ? colors.primaryForeground : colors.mutedForeground}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: colors.foreground }]}>
                  Test Mode
                </Text>
                <Text style={[styles.settingDescription, { color: colors.mutedForeground }]}>
                  Use test environment and mock data
                </Text>
              </View>
              <Switch
                value={testMode}
                onValueChange={setTestMode}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor={testMode ? colors.primaryForeground : colors.mutedForeground}
              />
            </View>
          </CardContent>
        </Card>

        <Card style={styles.configCard}>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              label="API Endpoint"
              value={apiEndpoint}
              onChangeText={setApiEndpoint}
              placeholder="Enter API endpoint URL"
            />
          </CardContent>
        </Card>

        <Card style={styles.featuresCard}>
          <CardHeader>
            <CardTitle>Development Features</CardTitle>
          </CardHeader>
          <CardContent>
            {devFeatures.map((feature, index) => (
              <View key={index} style={[styles.featureRow, { borderBottomColor: colors.border }]}>
                <View style={styles.featureInfo}>
                  <Text style={[styles.featureTitle, { color: colors.foreground }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.mutedForeground }]}>
                    {feature.description}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: feature.enabled ? colors.primary : colors.muted }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: feature.enabled ? colors.primaryForeground : colors.mutedForeground }
                  ]}>
                    {feature.enabled ? 'ON' : 'OFF'}
                  </Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>

        <Card style={styles.actionsCard}>
          <CardHeader>
            <CardTitle>Developer Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              title="Clear Cache"
              onPress={handleClearCache}
              variant="outline"
              style={styles.actionButton}
            />
            <Button
              title="Run Diagnostics"
              onPress={handleRunDiagnostics}
              variant="secondary"
              style={styles.actionButton}
            />
            <Button
              title="Export Logs"
              onPress={() => Alert.alert('Export Logs', 'Logs exported successfully')}
              variant="outline"
              style={styles.actionButton}
            />
          </CardContent>
        </Card>

        <Card style={styles.systemCard}>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            {systemInfo.map((info, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>
                  {info.label}
                </Text>
                <Text style={[styles.infoValue, { color: colors.foreground }]}>
                  {info.value}
                </Text>
              </View>
            ))}
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  settingsCard: {
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  configCard: {
    marginBottom: 20,
  },
  featuresCard: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  featureDescription: {
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
  actionsCard: {
    marginBottom: 20,
  },
  actionButton: {
    marginBottom: 12,
  },
  systemCard: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});