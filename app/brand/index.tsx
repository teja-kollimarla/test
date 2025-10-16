import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Megaphone, Users, TrendingUp, Eye } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { AnalyticsCard } from '@/components/common/AnalyticsCard';
import { mockCampaigns } from '@/mocks/data';

export default function BrandDashboard() {
  const insets = useSafeAreaInsets();

  const { data: stats } = useQuery({
    queryKey: ['brand-stats'],
    queryFn: async () => ({
      activeCampaigns: mockCampaigns.filter(c => c.status === 'live').length,
      totalInfluencers: 24,
      impressions: '8.3M',
      avgEngagement: '12.6%',
    }),
  });

  const { data: activeCampaign } = useQuery({
    queryKey: ['brand-active-campaign'],
    queryFn: async () => mockCampaigns.find(c => c.status === 'live'),
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <View>
          <Text style={styles.headerTitle}>Brand Dashboard</Text>
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
            icon={Megaphone}
            iconColor={ForiqenTheme.colors.accent3}
          />
          <AnalyticsCard
            title="Total Influencers"
            value={stats?.totalInfluencers || 0}
            icon={Users}
            iconColor={ForiqenTheme.colors.accent2}
          />
          <AnalyticsCard
            title="Impressions"
            value={stats?.impressions || '0'}
            icon={Eye}
            iconColor={ForiqenTheme.colors.accent1}
          />
          <AnalyticsCard
            title="Avg. Engagement"
            value={stats?.avgEngagement || '0%'}
            change="+2.1%"
            icon={TrendingUp}
            iconColor={ForiqenTheme.colors.accent1}
          />
        </View>

        {activeCampaign && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Campaign</Text>
            <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.campaignCard}>
              <Text style={styles.campaignName}>{activeCampaign.name}</Text>
              <Text style={styles.campaignDescription}>
                Promote our new summer apparel line across various influencer platforms with focus on engagement and reach.
              </Text>
              <View style={styles.campaignStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Influencers:</Text>
                  <Text style={styles.statValue}>{activeCampaign.influencers}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Engagement Rate:</Text>
                  <Text style={styles.statValue}>{activeCampaign.engagement}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>Budget:</Text>
                  <Text style={styles.statValue}>{activeCampaign.budget}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wishlist Highlights</Text>
          <Text style={styles.emptyText}>No new items in your wishlist.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Contribution</Text>
          <Text style={styles.emptyText}>No new contributions to review.</Text>
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
    ...ForiqenTheme.shadows.card,
  },
  campaignName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  campaignDescription: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.md,
  },
  campaignStats: {
    gap: ForiqenTheme.spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
  },
  statValue: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.accent1,
    fontWeight: '600' as const,
  },
  emptyText: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
    padding: ForiqenTheme.spacing.xl,
  },
});
