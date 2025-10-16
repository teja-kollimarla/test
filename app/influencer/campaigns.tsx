import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';
import { mockCampaigns } from '@/mocks/data';

export default function InfluencerCampaignsScreen() {
  const insets = useSafeAreaInsets();

  const { data: campaigns } = useQuery({
    queryKey: ['influencer-available-campaigns'],
    queryFn: async () => mockCampaigns.filter(c => c.status === 'live'),
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Available Campaigns</Text>
      </View>

      <ScrollView style={styles.content}>
        {campaigns?.map((campaign) => (
          <LinearGradient key={campaign.id} colors={ForiqenTheme.gradients.card} style={styles.campaignCard}>
            <Text style={styles.campaignName}>{campaign.name}</Text>
            <Text style={styles.brandName}>{campaign.brandName}</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statText}>Budget: {campaign.budget}</Text>
              <Text style={styles.statText}>Engagement: {campaign.engagement}</Text>
            </View>
            <GradientButton
              title="Apply Now"
              onPress={() => console.log('Apply to campaign')}
              style={styles.applyButton}
            />
          </LinearGradient>
        ))}
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
  campaignCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    ...ForiqenTheme.shadows.card,
  },
  campaignName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  brandName: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: ForiqenTheme.spacing.md,
    marginBottom: ForiqenTheme.spacing.md,
  },
  statText: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.accent1,
  },
  applyButton: {
    marginTop: ForiqenTheme.spacing.sm,
  },
});
