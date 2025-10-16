import { Tabs } from 'expo-router';
import { Home, Users, Megaphone, Heart, MessageCircle, UserCircle } from 'lucide-react-native';
import { ForiqenTheme } from '@/constants/theme';

export default function BrandLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: ForiqenTheme.colors.primary,
          borderTopColor: ForiqenTheme.colors.accent1,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: ForiqenTheme.colors.accent1,
        tabBarInactiveTintColor: ForiqenTheme.colors.gray,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="influencers"
        options={{
          title: 'Influencers',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ color, size }) => <Megaphone size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <UserCircle size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
