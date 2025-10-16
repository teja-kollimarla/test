import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { FilterPanel } from '@/components/common/FilterPanel';
import { SideContainer } from '@/components/common/SideContainer';
import { mockInfluencers, Influencer } from '@/mocks/data';
import { GradientButton } from '@/components/common/GradientButton';

export default function BrandInfluencersScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);

  const { data: influencers } = useQuery({
    queryKey: ['brand-influencers', searchQuery, selectedFilter],
    queryFn: async () => {
      let filtered = mockInfluencers;
      if (searchQuery) {
        filtered = filtered.filter(i => 
          i.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedFilter !== 'all') {
        filtered = filtered.filter(i => i.platform === selectedFilter);
      }
      return filtered;
    },
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Influencers</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={ForiqenTheme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search influencers..."
            placeholderTextColor={ForiqenTheme.colors.gray}
          />
        </View>
      </View>

      <FilterPanel
        filters={[
          { label: 'All', value: 'all' },
          { label: 'Instagram', value: 'instagram' },
          { label: 'YouTube', value: 'youtube' },
          { label: 'TikTok', value: 'tiktok' },
        ]}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <ScrollView style={styles.content}>
        {influencers?.map((influencer) => (
          <TouchableOpacity
            key={influencer.id}
            onPress={() => setSelectedInfluencer(influencer)}
          >
            <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.influencerCard}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{influencer.name[0]}</Text>
              </View>
              <View style={styles.influencerInfo}>
                <Text style={styles.influencerName}>{influencer.name}</Text>
                <Text style={styles.influencerNiche}>{influencer.niche}</Text>
                <View style={styles.statsRow}>
                  <Text style={styles.statText}>{influencer.followers} followers</Text>
                  <Text style={styles.statText}>{influencer.engagement} eng.</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SideContainer
        visible={!!selectedInfluencer}
        onClose={() => setSelectedInfluencer(null)}
        title={selectedInfluencer?.name || ''}
      >
        {selectedInfluencer && (
          <View>
            <Text style={styles.detailLabel}>Platform</Text>
            <Text style={styles.detailValue}>{selectedInfluencer.platform}</Text>

            <Text style={styles.detailLabel}>Followers</Text>
            <Text style={styles.detailValue}>{selectedInfluencer.followers}</Text>

            <Text style={styles.detailLabel}>Engagement Rate</Text>
            <Text style={styles.detailValue}>{selectedInfluencer.engagement}</Text>

            <Text style={styles.detailLabel}>Niche</Text>
            <Text style={styles.detailValue}>{selectedInfluencer.niche}</Text>

            <GradientButton title="Add to Wishlist" onPress={() => console.log('Add to wishlist')} />
            <GradientButton title="Invite to Campaign" onPress={() => console.log('Invite')} style={{ marginTop: ForiqenTheme.spacing.md }} />
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
    marginBottom: ForiqenTheme.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ForiqenTheme.colors.secondary,
    borderRadius: ForiqenTheme.borderRadius.lg,
    padding: ForiqenTheme.spacing.md,
    gap: ForiqenTheme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.white,
  },
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
  influencerCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ForiqenTheme.spacing.md,
    ...ForiqenTheme.shadows.card,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ForiqenTheme.colors.accent1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
  },
  influencerInfo: {
    flex: 1,
  },
  influencerName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  influencerNiche: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: ForiqenTheme.spacing.md,
  },
  statText: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.accent1,
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
    marginBottom: ForiqenTheme.spacing.md,
  },
});
