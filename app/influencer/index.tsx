import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, DollarSign, TrendingUp, FileText, Target } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { AnalyticsCard } from '@/components/common/AnalyticsCard';
import { mockCampaigns, mockContributions } from '@/mocks/data';

export default function InfluencerDashboard() {
  const insets = useSafeAreaInsets();

  const { data: stats } = useQuery({
    queryKey: ['influencer-stats'],
    queryFn: async () => ({
      activeCampaigns: 3,
      totalEarnings: '$12,450',
      avgEngagement: '8.5%',
      submissions: mockContributions.length,
    }),
  });

  const { data: myCampaigns } = useQuery({
    queryKey: ['influencer-campaigns'],
    queryFn: async () => mockCampaigns.filter((_, i) => i < 3),
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <View>
          <Text style={styles.headerTitle}>Influencer Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={ForiqenTheme.colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <AnalyticsCard
            title="Active Campaigns"
            value={stats?.activeCampaigns || 0}
            icon={Target}
            iconColor={ForiqenTheme.colors.accent3}
          />
          <AnalyticsCard
            title="Total Earnings"
            value={stats?.totalEarnings || '$0'}
            icon={DollarSign}
            iconColor={ForiqenTheme.colors.accent2}
          />
          <AnalyticsCard
            title="Avg. Engagement"
            value={stats?.avgEngagement || '0%'}
            change="+1.5%"
            icon={TrendingUp}
            iconColor={ForiqenTheme.colors.accent1}
          />
          <AnalyticsCard
            title="Submissions"
            value={stats?.submissions || 0}
            icon={FileText}
            iconColor={ForiqenTheme.colors.accent1}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Campaigns</Text>
          {myCampaigns?.map((campaign) => (
            <LinearGradient key={campaign.id} colors={ForiqenTheme.gradients.card} style={styles.campaignCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: campaign.status === 'live' ? ForiqenTheme.colors.accent2 : ForiqenTheme.colors.gray }]}>
                  <Text style={styles.statusText}>{campaign.status.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.brandName}>{campaign.brandName}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${campaign.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{campaign.progress}% Complete</Text>
            </LinearGradient>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Contributions</Text>
          {mockContributions.slice(0, 3).map((contribution) => (
            <LinearGradient key={contribution.id} colors={ForiqenTheme.gradients.card} style={styles.contributionCard}>
              <Text style={styles.contributionType}>{contribution.type}</Text>
              <Text style={styles.contributionCampaign}>{contribution.campaignName}</Text>
              <View style={[styles.statusBadge, {
                backgroundColor: contribution.status === 'approved' ? ForiqenTheme.colors.accent2 : contribution.status === 'submitted' ? ForiqenTheme.colors.accent3 : '#FF4444'
              }]}>
                <Text style={styles.statusText}>{contribution.status.toUpperCase()}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: ForiqenTheme.fontSize.xxl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.gray,
    marginTop: ForiqenTheme.spacing.xs,
  },
  notificationButton: {
    padding: ForiqenTheme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ForiqenTheme.spacing.md,
    marginBottom: ForiqenTheme.spacing.xl,
  },
  section: {
    marginBottom: ForiqenTheme.spacing.xl,
  },
  sectionTitle: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.md,
  },
  campaignCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    ...ForiqenTheme.shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: ForiqenTheme.spacing.xs,
  },
  campaignName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    flex: 1,
  },
  brandName: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.md,
  },
  statusBadge: {
    paddingHorizontal: ForiqenTheme.spacing.sm,
    paddingVertical: ForiqenTheme.spacing.xs,
    borderRadius: ForiqenTheme.borderRadius.sm,
  },
  statusText: {
    fontSize: ForiqenTheme.fontSize.xs,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
  },
  progressBar: {
    height: 6,
    backgroundColor: ForiqenTheme.colors.secondary,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: ForiqenTheme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: ForiqenTheme.colors.accent1,
  },
  progressText: {
    fontSize: ForiqenTheme.fontSize.xs,
    color: ForiqenTheme.colors.gray,
  },
  contributionCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...ForiqenTheme.shadows.card,
  },
  contributionType: {
    fontSize: ForiqenTheme.fontSize.md,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
  contributionCampaign: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    flex: 1,
    marginLeft: ForiqenTheme.spacing.md,
  },
});
