export enum Platform {
  INSTAGRAM = 'Instagram',
  YOUTUBE = 'YouTube',
  FACEBOOK = 'Facebook'
}

export enum MetricView {
  OVERVIEW = 'Overview',
  VIEWS = 'Views',
  INTERACTIONS = 'Interactions',
  AUDIENCE = 'Audience'
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}

export interface ContentItem {
  title: string;
  value: number | string;
  image?: string;
  subtitle?: string;
}

export interface PlatformData {
  id: string;
  name: string;
  accounts: AccountData[];
}

export interface AccountData {
  name: string;
  metrics: {
    followers: number;
    followersGrowth?: string;
    reach?: number;
    reachGrowth?: string;
    engagement?: number;
    engagementGrowth?: string;
    profileVisits?: number;
    linkTaps?: number;
  };
  audience?: {
    cities: ChartDataPoint[];
    countries: ChartDataPoint[];
    followerSplit: ChartDataPoint[]; // Followers vs Non-followers
  };
  content?: {
    topPosts: ContentItem[];
  };
  graphs?: {
    viewsHistory?: any[]; // For line charts
  }
}