import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { mockContributions } from '@/mocks/data';

export default function MyWorksScreen() {
  const insets = useSafeAreaInsets();

  const { data: works } = useQuery({
    queryKey: ['my-works'],
    queryFn: async () => mockContributions,
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>My Works</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.grid}>
          {works?.map((work) => (
            <LinearGradient key={work.id} colors={ForiqenTheme.gradients.card} style={styles.workCard}>
              <Text style={styles.workType}>{work.type}</Text>
              <Text style={styles.workCampaign}>{work.campaignName}</Text>
              <View style={[styles.statusBadge, {
                backgroundColor: work.status === 'approved' ? ForiqenTheme.colors.accent2 : work.status === 'submitted' ? ForiqenTheme.colors.accent3 : '#FF4444'
              }]}>
                <Text style={styles.statusText}>{work.status.toUpperCase()}</Text>
              </View>
            </LinearGradient>
          ))}
        </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ForiqenTheme.spacing.md,
  },
  workCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    width: '48%',
    ...ForiqenTheme.shadows.card,
  },
  workType: {
    fontSize: ForiqenTheme.fontSize.md,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  workCampaign: {
    fontSize: ForiqenTheme.fontSize.xs,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: ForiqenTheme.spacing.sm,
    paddingVertical: ForiqenTheme.spacing.xs,
    borderRadius: ForiqenTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: ForiqenTheme.fontSize.xs,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
  },
});
