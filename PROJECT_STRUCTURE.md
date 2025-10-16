# Foriqen - Influencer Marketing Platform

A complete, futuristic React Native + Expo influencer marketing platform with role-based authentication and stunning UI.

## 🎨 Design System

**Color Palette:**
- Primary: Deep Blue (#0A2540)
- Secondary: Dark Teal (#003C46)
- Accent1: Bright Cyan (#00E0FF)
- Accent2: Electric Green (#00FF9C)
- Accent3: Vibrant Orange (#FF7A00)

**Features:**
- Gradient backgrounds
- Animated components
- Glass-morphism cards
- Neon glow effects

## 📁 Project Structure

```
├── app/
│   ├── index.tsx                    # Root redirect based on auth state
│   ├── _layout.tsx                  # Root layout with providers
│   ├── (auth)/
│   │   └── landing/
│   │       └── index.tsx            # Landing page with role selection
│   ├── admin/                       # Admin role screens
│   │   ├── _layout.tsx             # Admin tabs layout
│   │   ├── index.tsx               # Dashboard
│   │   ├── brands.tsx              # Brand management
│   │   ├── campaigns.tsx           # Campaign overview
│   │   ├── influencers.tsx         # Influencer directory
│   │   └── profile.tsx             # Admin profile
│   ├── brand/                       # Brand role screens
│   │   ├── _layout.tsx             # Brand tabs layout
│   │   ├── index.tsx               # Dashboard
│   │   ├── influencers.tsx         # Influencer discovery
│   │   ├── campaigns.tsx           # Campaign management
│   │   ├── wishlist.tsx            # Saved influencers
│   │   ├── messages.tsx            # Chat interface
│   │   └── profile.tsx             # Brand profile
│   └── influencer/                  # Influencer role screens
│       ├── _layout.tsx             # Influencer tabs layout
│       ├── index.tsx               # Dashboard
│       ├── brands.tsx              # Brand discovery
│       ├── campaigns.tsx           # Available campaigns
│       ├── works.tsx               # My submissions
│       ├── analytics.tsx           # Performance metrics
│       ��── messages.tsx            # Chat interface
│       └── profile.tsx             # Influencer profile
├── components/
│   └── common/
│       ├── AnalyticsCard.tsx       # Metric display card
│       ├── ChatUI.tsx              # Chat interface
│       ├── ConfirmationModal.tsx   # Animated confirmation
│       ├── FilterPanel.tsx         # Horizontal filter bar
│       ├── GradientButton.tsx      # Animated button
│       └── SideContainer.tsx       # Slide-in panel
├── constants/
│   ├── colors.ts                   # Color constants
│   └── theme.ts                    # Foriqen theme
├── contexts/
│   └── UserContext.tsx             # User state & auth
├── lib/
│   ├── api.ts                      # Axios instance
│   └── queryClient.ts              # React Query config
├── mocks/
│   └── data.ts                     # Mock data (brands, campaigns, influencers)
└── tailwind.config.js              # NativeWind config
```

## 🚀 Features

### Role-Based Authentication
- **Admin**: Platform oversight, manage brands/influencers/campaigns
- **Brand**: Create campaigns, discover influencers, manage collaborations
- **Influencer**: Browse campaigns, submit work, track earnings

### Core Functionality
- ✅ Animated landing page with role selection
- ✅ Role-based tab navigation
- ✅ Real-time chat interface with animations
- ✅ Analytics dashboards with metrics
- ✅ Campaign management (CRUD)
- ✅ Influencer discovery with filters
- ✅ Side panel for detailed views
- ✅ Confirmation modals for destructive actions
- ✅ Persistent authentication with AsyncStorage

### UI/UX
- Animated page transitions
- Gradient buttons with scale effects
- Glass-morphism cards
- Neon glow shadows
- Responsive layouts
- Safe area handling
- Loading states with React Query

## 🛠️ Tech Stack

- **Framework**: React Native + Expo v53
- **Routing**: Expo Router (file-based)
- **State**: @nkzw/create-context-hook + React Query
- **Styling**: NativeWind (Tailwind CSS for RN)
- **Animations**: React Native Animated API
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **HTTP**: Axios

## 📱 Running the App

```bash
# Install dependencies
bun install

# Start development server
bun start

# Run on specific platform
bun run start        # Mobile (QR code)
bun run start-web    # Web browser
```

## 🔐 Authentication Flow

1. App loads → Check AsyncStorage for user
2. If authenticated → Redirect to role dashboard
3. If not → Show landing page
4. User selects role → Mock login → Save to AsyncStorage → Navigate to dashboard
5. Logout → Clear storage → Return to landing

## 🎯 Key Components

### Common Components
- **AnalyticsCard**: Display metrics with icons and change indicators
- **ChatUI**: Full-featured chat with message animations
- **ConfirmationModal**: Animated modal for confirmations
- **FilterPanel**: Horizontal scrollable filter chips
- **GradientButton**: Pressable button with scale animation
- **SideContainer**: Slide-in panel for details

### Context Providers
- **UserContext**: Manages user state, role, authentication

### Mock Data
- Brands (3 entries)
- Influencers (4 entries)
- Campaigns (4 entries)
- Contributions (4 entries)

## 🎨 Design Patterns

### Animations
- Spring animations for smooth interactions
- Staggered animations for lists
- Scale effects on press
- Slide-in panels

### Layouts
- Gradient backgrounds on all screens
- Consistent header with safe area insets
- Tab navigation with custom styling
- Responsive grid layouts

### Data Fetching
- React Query for all data
- Mock async queries
- Loading states
- Error handling

## 🔄 Future Integration

Ready to connect to a real backend:

1. Update `lib/api.ts` with your API URL
2. Replace mock data queries with real API calls
3. Add authentication tokens to axios interceptors
4. Implement real-time features (WebSocket for chat)
5. Add image uploads for profiles/campaigns
6. Implement search and pagination

## 📝 Notes

- All screens use safe area insets
- Animations use native driver for performance
- TypeScript strict mode enabled
- Mock data simulates real API responses
- Ready for backend integration
- Web-compatible (React Native Web)

## 🎉 What's Included

✅ Complete UI for all 3 roles (15+ screens)
✅ Role-based navigation with guards
✅ Animated landing page
✅ Analytics dashboards
✅ Chat interface
✅ Campaign management
✅ Influencer discovery
✅ Profile screens
✅ Mock data ready
✅ TypeScript throughout
✅ Production-ready styling
✅ Reusable components

---

**Built with Foriqen Design System** 🚀
Deep Blue → Dark Teal gradient | Cyan, Green, Orange accents | Futuristic, polished, professional.
