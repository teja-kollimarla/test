import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ForiqenTheme } from '@/constants/theme';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPanelProps {
  filters: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterPanel({ filters, selectedFilter, onFilterChange }: FilterPanelProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {filters.map((filter) => {
        const isSelected = filter.value === selectedFilter;
        return (
          <TouchableOpacity
            key={filter.value}
            onPress={() => onFilterChange(filter.value)}
            style={styles.filterButton}
          >
            {isSelected ? (
              <LinearGradient
                colors={ForiqenTheme.gradients.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.selectedFilter}
              >
                <Text style={styles.selectedText}>{filter.label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.unselectedFilter}>
                <Text style={styles.unselectedText}>{filter.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: ForiqenTheme.spacing.md,
  },
  content: {
    paddingHorizontal: ForiqenTheme.spacing.md,
    gap: ForiqenTheme.spacing.sm,
  },
  filterButton: {
    marginRight: ForiqenTheme.spacing.sm,
  },
  selectedFilter: {
    paddingHorizontal: ForiqenTheme.spacing.lg,
    paddingVertical: ForiqenTheme.spacing.sm,
    borderRadius: ForiqenTheme.borderRadius.round,
  },
  selectedText: {
    fontSize: ForiqenTheme.fontSize.sm,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
  unselectedFilter: {
    paddingHorizontal: ForiqenTheme.spacing.lg,
    paddingVertical: ForiqenTheme.spacing.sm,
    borderRadius: ForiqenTheme.borderRadius.round,
    backgroundColor: ForiqenTheme.colors.secondary,
    borderWidth: 1,
    borderColor: ForiqenTheme.colors.gray,
  },
  unselectedText: {
    fontSize: ForiqenTheme.fontSize.sm,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.gray,
  },
});
