import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ForiqenTheme } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';

export default function BrandCampaignsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Campaigns</Text>
      </View>
      <ScrollView style={styles.content}>
        <GradientButton title="Create New Campaign" onPress={() => console.log('Create campaign')} />
        <Text style={styles.emptyText}>Your campaigns will appear here</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: ForiqenTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ForiqenTheme.colors.accent1,
  },
  headerTitle: {
    fontSize: ForiqenTheme.fontSize.xxl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
  emptyText: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
    marginTop: ForiqenTheme.spacing.xl,
  },
});
