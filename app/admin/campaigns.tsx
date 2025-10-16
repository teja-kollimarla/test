import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { FilterPanel } from '@/components/common/FilterPanel';
import { SideContainer } from '@/components/common/SideContainer';
import { mockCampaigns, Campaign } from '@/mocks/data';

export default function CampaignsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns', selectedFilter],
    queryFn: async () => {
      if (selectedFilter === 'all') return mockCampaigns;
      return mockCampaigns.filter(c => c.status === selectedFilter);
    },
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Campaigns</Text>
      </View>

      <FilterPanel
        filters={[
          { label: 'All', value: 'all' },
          { label: 'Ongoing', value: 'live' },
          { label: 'Completed', value: 'completed' },
        ]}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <ScrollView style={styles.content}>
        {campaigns?.map((campaign) => (
          <TouchableOpacity key={campaign.id} onPress={() => setSelectedCampaign(campaign)}>
            <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.campaignCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: campaign.status === 'live' ? ForiqenTheme.colors.accent2 : ForiqenTheme.colors.gray }]}>
                  <Text style={styles.statusText}>{campaign.status.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.brandName}>{campaign.brandName}</Text>
              <View style={styles.statsRow}>
                <Text style={styles.statText}>Budget: {campaign.budget}</Text>
                <Text style={styles.statText}>{campaign.influencers} Influencers</Text>
                <Text style={styles.statText}>Eng: {campaign.engagement}</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${campaign.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{campaign.progress}% Complete</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SideContainer
        visible={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title={selectedCampaign?.name || ''}
      >
        {selectedCampaign && (
          <View>
            <Text style={styles.detailLabel}>Brand</Text>
            <Text style={styles.detailValue}>{selectedCampaign.brandName}</Text>

            <Text style={styles.detailLabel}>Budget</Text>
            <Text style={styles.detailValue}>{selectedCampaign.budget}</Text>

            <Text style={styles.detailLabel}>Influencers</Text>
            <Text style={styles.detailValue}>{selectedCampaign.influencers}</Text>

            <Text style={styles.detailLabel}>Engagement</Text>
            <Text style={styles.detailValue}>{selectedCampaign.engagement}</Text>

            <Text style={styles.detailLabel}>Start Date</Text>
            <Text style={styles.detailValue}>{selectedCampaign.startDate}</Text>
          </View>
        )}
      </SideContainer>
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
    marginBottom: ForiqenTheme.spacing.sm,
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
  detailLabel: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginTop: ForiqenTheme.spacing.md,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  detailValue: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.white,
    fontWeight: '600' as const,
  },
});
