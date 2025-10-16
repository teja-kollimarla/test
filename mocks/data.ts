export interface Brand {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  campaigns: number;
  totalSpend: string;
  status: 'active' | 'inactive';
  openToContributions: boolean;
}

export interface Influencer {
  id: string;
  name: string;
  avatar?: string;
  platform: 'instagram' | 'youtube' | 'tiktok' | 'twitter';
  followers: string;
  engagement: string;
  niche: string;
  status: 'available' | 'busy';
}

export interface Campaign {
  id: string;
  name: string;
  brandName: string;
  status: 'ongoing' | 'completed' | 'pending' | 'live';
  budget: string;
  influencers: number;
  engagement: string;
  startDate: string;
  endDate?: string;
  progress: number;
}

export interface Contribution {
  id: string;
  influencerId: string;
  influencerName: string;
  campaignId: string;
  campaignName: string;
  type: 'Short Video' | 'Instagram Post' | 'Blog Post' | 'Live Stream';
  status: 'approved' | 'submitted' | 'rejected';
  submittedAt: Date;
}

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechFlow Inc',
    industry: 'Technology',
    campaigns: 12,
    totalSpend: '$250K',
    status: 'active',
    openToContributions: true,
  },
  {
    id: '2',
    name: 'EcoChic',
    industry: 'Fashion',
    campaigns: 8,
    totalSpend: '$180K',
    status: 'active',
    openToContributions: true,
  },
  {
    id: '3',
    name: 'InnovateCorp',
    industry: 'Tech',
    campaigns: 15,
    totalSpend: '$320K',
    status: 'active',
    openToContributions: false,
  },
];

export const mockInfluencers: Influencer[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    platform: 'instagram',
    followers: '1.2M',
    engagement: '7.8%',
    niche: 'Fashion & Lifestyle',
    status: 'available',
  },
  {
    id: '2',
    name: 'Marco Chen',
    platform: 'youtube',
    followers: '850K',
    engagement: '6.1%',
    niche: 'Tech & Gaming',
    status: 'available',
  },
  {
    id: '3',
    name: 'Sophia Martinez',
    platform: 'tiktok',
    followers: '500K',
    engagement: '9.2%',
    niche: 'Food & Travel',
    status: 'busy',
  },
  {
    id: '4',
    name: 'David Kim',
    platform: 'instagram',
    followers: '720K',
    engagement: '5.5%',
    niche: 'Fitness & Health',
    status: 'available',
  },
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Collection Launch Campaign',
    brandName: 'EcoChic',
    status: 'live',
    budget: '$45K',
    influencers: 8,
    engagement: '8.3%',
    startDate: '2024-08-15',
    progress: 75,
  },
  {
    id: '2',
    name: 'Global Tech Launch',
    brandName: 'InnovateCorp',
    status: 'live',
    budget: '$80K',
    influencers: 12,
    engagement: '7.2%',
    startDate: '2024-08-15',
    progress: 75,
  },
  {
    id: '3',
    name: 'Sustainable Fashion Campaign',
    brandName: 'EcoChic',
    status: 'pending',
    budget: '$35K',
    influencers: 6,
    engagement: '6.8%',
    startDate: '2024-09-01',
    progress: 20,
  },
  {
    id: '4',
    name: 'Fitness App Promotion',
    brandName: 'FitPulse',
    status: 'completed',
    budget: '$28K',
    influencers: 5,
    engagement: '9.1%',
    startDate: '2024-07-20',
    endDate: '2024-08-10',
    progress: 100,
  },
];

export const mockContributions: Contribution[] = [
  {
    id: '1',
    influencerId: '1',
    influencerName: 'Elena Rodriguez',
    campaignId: '1',
    campaignName: 'Global Tech Launch',
    type: 'Short Video',
    status: 'approved',
    submittedAt: new Date('2024-08-20'),
  },
  {
    id: '2',
    influencerId: '3',
    influencerName: 'Sophia Martinez',
    campaignId: '3',
    campaignName: 'Sustainable Fashion Campaign',
    type: 'Instagram Post',
    status: 'submitted',
    submittedAt: new Date('2024-08-22'),
  },
  {
    id: '3',
    influencerId: '2',
    influencerName: 'Marco Chen',
    campaignId: '4',
    campaignName: 'Eco-Friendly Home Gadgets',
    type: 'Blog Post',
    status: 'rejected',
    submittedAt: new Date('2024-08-18'),
  },
  {
    id: '4',
    influencerId: '4',
    influencerName: 'David Kim',
    campaignId: '4',
    campaignName: 'Gaming Gear Showcase',
    type: 'Live Stream',
    status: 'approved',
    submittedAt: new Date('2024-08-25'),
  },
];
