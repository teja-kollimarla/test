import { Tabs } from 'expo-router';
import { Home, Building2, Megaphone, Briefcase, MessageCircle, BarChart3, UserCircle } from 'lucide-react-native';
import { ForiqenTheme } from '@/constants/theme';

export default function InfluencerLayout() {
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
        name="brands"
        options={{
          title: 'Brands',
          tabBarIcon: ({ color, size }) => <Building2 size={size} color={color} />,
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
        name="works"
        options={{
          title: 'My Works',
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
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
