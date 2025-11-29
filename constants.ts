import { Platform, PlatformData } from './types';

export const DASHBOARD_DATA: Record<Platform, PlatformData> = {
  [Platform.INSTAGRAM]: {
    id: 'instagram',
    name: 'Instagram',
    accounts: [
      {
        name: 'Speeki English',
        metrics: {
          followers: 33959,
          followersGrowth: '-0.6%',
          reach: 56226,
          engagement: 1600,
          profileVisits: 1079,
          linkTaps: 82,
        },
        audience: {
          followerSplit: [
            { name: 'Non-Followers', value: 77.2, fill: '#ff007f' },
            { name: 'Followers', value: 22.8, fill: '#ccff00' },
          ],
          cities: [
            { name: 'Kochi', value: 7.4 },
            { name: 'Bangalore', value: 3.9 },
            { name: 'Dubai', value: 4.7 },
            { name: 'Chennai', value: 3.4 },
            { name: 'Trivandrum', value: 2.9 },
          ],
          countries: [
            { name: 'India', value: 71.4 },
            { name: 'UAE', value: 10.2 },
            { name: 'UK', value: 3.4 },
            { name: 'USA', value: 1.8 },
            { name: 'Saudi Arabia', value: 1.9 },
          ]
        },
        content: {
          topPosts: [
            { title: 'The Ex-Boyfriend Return', value: 4626, subtitle: 'Reel' },
            { title: 'Oru AI Date Ep 2', value: 3668, subtitle: 'Reel' },
            { title: 'Oru AI Date Ep 1', value: 3646, subtitle: 'Reel' },
            { title: 'Oru AI Date Final', value: 3374, subtitle: 'Reel' },
            { title: 'English Crush', value: 2083, subtitle: 'Reel' },
          ]
        }
      },
      {
        name: 'Speeki German',
        metrics: {
          followers: 15584,
          followersGrowth: '+0.8%',
          reach: 249540,
          engagement: 6400,
          profileVisits: 5166,
          linkTaps: 242,
        },
        audience: {
          followerSplit: [
            { name: 'Non-Followers', value: 94.6, fill: '#ff007f' },
            { name: 'Followers', value: 5.4, fill: '#ccff00' },
          ],
          cities: [
            { name: 'Kochi', value: 7.7 },
            { name: 'Bangalore', value: 5.1 },
            { name: 'Dubai', value: 3.6 },
            { name: 'Chennai', value: 2.0 },
            { name: 'Trivandrum', value: 3.0 },
          ],
          countries: [
            { name: 'India', value: 66.1 },
            { name: 'Germany', value: 12.5 },
            { name: 'UAE', value: 7.1 },
            { name: 'UK', value: 1.8 },
            { name: 'Saudi Arabia', value: 1.6 },
          ]
        },
        content: {
          topPosts: [
            { title: 'The Haunting Begins', value: 12059, subtitle: 'Reel' },
            { title: 'Goethe A1 Cleared', value: 3732, subtitle: 'Post' },
            { title: 'Goethe B2 Cleared', value: 3725, subtitle: 'Post' },
            { title: 'Telc B2 Cleared', value: 3323, subtitle: 'Post' },
            { title: 'Sreeja Paulose', value: 3534, subtitle: 'Reel' },
          ]
        }
      }
    ]
  },
  [Platform.YOUTUBE]: {
    id: 'youtube',
    name: 'YouTube',
    accounts: [
      {
        name: 'Speeki AI',
        metrics: {
          followers: 3, // Net gain
          followersGrowth: '+3 Subs',
          reach: 1600 + 1500, // Views + Shorts
          engagement: 4.0, // Watch hours
        },
        content: {
          topPosts: [
            { title: 'Oru AI Date Ep 1', value: 539, subtitle: 'Long Form' },
            { title: 'When your crush says...', value: 524, subtitle: 'Shorts' },
            { title: 'Foreign University Vs Indian...', value: 238, subtitle: 'Shorts' },
            { title: 'Thank You Aleena', value: 87, subtitle: 'Long Form' },
            { title: 'Speeki New Offline Aca...', value: 48, subtitle: 'Long Form' },
          ]
        },
        graphs: {
          viewsHistory: [
            { name: 'Long Form', value: 1600 },
            { name: 'Shorts', value: 1500 },
          ]
        }
      }
    ]
  },
  [Platform.FACEBOOK]: {
    id: 'facebook',
    name: 'Facebook',
    accounts: [
      {
        name: 'Speeki German',
        metrics: {
          reach: 961693,
          reachGrowth: '+36%',
          followers: 256,
          followersGrowth: '+19%',
          engagement: 3887,
          engagementGrowth: '+72%',
        },
        audience: {
          cities: [],
          countries: [
            { name: 'India', value: 87.2 },
            { name: 'Germany', value: 5.7 },
            { name: 'UAE', value: 2.6 },
          ],
          followerSplit: [
            { name: 'Women', value: 27, fill: '#ff007f' },
            { name: 'Men', value: 73, fill: '#00f3ff' },
          ]
        }
      },
      {
        name: 'Inverted Coconut',
        metrics: {
          reach: 5500000,
          reachGrowth: '-33%',
          followers: 516693,
          engagement: 32000,
          engagementGrowth: '-13%',
        },
        content: {
          topPosts: [
            { title: 'Sometimes our English sounds...', value: '6.9M', subtitle: 'Reel' }
          ]
        }
      }
    ]
  }
};