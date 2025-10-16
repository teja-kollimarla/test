import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Trash2 } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { FilterPanel } from '@/components/common/FilterPanel';
import { SideContainer } from '@/components/common/SideContainer';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { mockBrands, Brand } from '@/mocks/data';

export default function BrandsScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [deleteModal, setDeleteModal] = useState<Brand | null>(null);

  const { data: brands } = useQuery({
    queryKey: ['brands', searchQuery, selectedFilter],
    queryFn: async () => {
      let filtered = mockBrands;
      if (searchQuery) {
        filtered = filtered.filter(b => 
          b.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedFilter !== 'all') {
        filtered = filtered.filter(b => b.status === selectedFilter);
      }
      return filtered;
    },
  });

  const handleDelete = (brand: Brand) => {
    setDeleteModal(brand);
  };

  const confirmDelete = () => {
    console.log('Deleting brand:', deleteModal?.id);
    setDeleteModal(null);
  };

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Brands</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={ForiqenTheme.colors.gray} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search brands..."
            placeholderTextColor={ForiqenTheme.colors.gray}
          />
        </View>
      </View>

      <FilterPanel
        filters={[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ]}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <ScrollView style={styles.content}>
        {brands?.map((brand) => (
          <TouchableOpacity
            key={brand.id}
            onPress={() => setSelectedBrand(brand)}
          >
            <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.brandCard}>
              <View style={styles.brandInfo}>
                <Text style={styles.brandName}>{brand.name}</Text>
                <Text style={styles.brandIndustry}>{brand.industry}</Text>
                <View style={styles.brandStats}>
                  <Text style={styles.statText}>{brand.campaigns} Campaigns</Text>
                  <Text style={styles.statText}>{brand.totalSpend} Total Spend</Text>
                </View>
                <View style={[styles.statusBadge, brand.status === 'active' ? styles.activeStatus : styles.inactiveStatus]}>
                  <Text style={styles.statusText}>{brand.status.toUpperCase()}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleDelete(brand)}
                style={styles.deleteButton}
              >
                <Trash2 size={20} color="#FF4444" />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <SideContainer
        visible={!!selectedBrand}
        onClose={() => setSelectedBrand(null)}
        title={selectedBrand?.name || ''}
      >
        {selectedBrand && (
          <View>
            <Text style={styles.detailLabel}>Industry</Text>
            <Text style={styles.detailValue}>{selectedBrand.industry}</Text>

            <Text style={styles.detailLabel}>Total Campaigns</Text>
            <Text style={styles.detailValue}>{selectedBrand.campaigns}</Text>

            <Text style={styles.detailLabel}>Total Spend</Text>
            <Text style={styles.detailValue}>{selectedBrand.totalSpend}</Text>

            <Text style={styles.detailLabel}>Open to Contributions</Text>
            <Text style={styles.detailValue}>{selectedBrand.openToContributions ? 'Yes' : 'No'}</Text>
          </View>
        )}
      </SideContainer>

      <ConfirmationModal
        visible={!!deleteModal}
        title="Delete Brand"
        message={`Are you sure you want to delete ${deleteModal?.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal(null)}
        variant="danger"
      />
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
  brandCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    ...ForiqenTheme.shadows.card,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  brandIndustry: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  brandStats: {
    flexDirection: 'row',
    gap: ForiqenTheme.spacing.md,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  statText: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.accent1,
  },
  statusBadge: {
    paddingHorizontal: ForiqenTheme.spacing.sm,
    paddingVertical: ForiqenTheme.spacing.xs,
    borderRadius: ForiqenTheme.borderRadius.sm,
    alignSelf: 'flex-start',
  },
  activeStatus: {
    backgroundColor: ForiqenTheme.colors.accent2,
  },
  inactiveStatus: {
    backgroundColor: ForiqenTheme.colors.gray,
  },
  statusText: {
    fontSize: ForiqenTheme.fontSize.xs,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
  },
  deleteButton: {
    padding: ForiqenTheme.spacing.sm,
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
