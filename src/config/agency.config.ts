export const agencyConfig = {
  // Brand & Agency Identity
  brand: {
    name: 'Beyond Imagine',
    subtitle: 'Media Solutions',
    shortName: 'BIM',
    tagline: 'Your real estate projects, team priorities and marketing performance in one connected workspace.',
    overviewHeading: 'Agency Overview',
    documentTitle: 'Beyond Imagine Media (BIM) — Agency Workspace',
  },

  // Active User Profile
  user: {
    name: 'Rahul Shrivastav',
    role: 'Workspace owner',
    initials: 'RS',
  },

  // Regional & Currency Localization
  locale: {
    currencySymbol: '₹',
    currencyCode: 'INR',
    localeString: 'en-IN',
    timeZone: 'Asia/Kolkata',
    dateFormat: 'en-GB',
    defaultCity: 'Vapi',
    supportedCities: ['Vapi', 'Surat', 'Mumbai', 'Ahmedabad', 'Pune'] as const,
  },

  // System Constants & Options
  roles: [
    'Founder',
    'Project Management',
    'Content',
    'Video',
    'Ads/Performance',
    'Developer',
    'Sales',
  ] as const,

  projectStatuses: ['Active', 'Planning', 'On hold', 'Completed'] as const,
  infoStatuses: ['Verified', 'Tentative', 'Missing'] as const,
  taskPriorities: ['Low', 'Medium', 'High', 'Urgent'] as const,
  taskRecurrence: ['None', 'Daily', 'Weekly', 'Monthly'] as const,
  taskStatuses: ['Open', 'In Progress', 'Under Review', 'Done'] as const,

  contentFormats: [
    'Walkthrough',
    'Explainer',
    'Shoot',
    'Edit',
    'Script',
    'Podcast',
    'Reel',
    'Ready to post',
  ] as const,

  contentStages: [
    'Idea',
    'Script',
    'Shoot',
    'Edit',
    'Approval',
    'Ready to post',
    'Posted',
  ] as const,

  leadStages: [
    'New lead',
    'Contacted',
    'Qualified',
    'Visit booked',
    'Visit completed',
    'Booked',
    'Closed lost',
  ] as const,

  acquisitionSources: [
    'Meta Ads',
    'Google Search',
    'Walk-in Referral',
    'Broker Network',
    'Gruhnest Portal',
    'LinkedIn Campaign',
  ] as const,

  adPlatforms: ['Meta', 'Google', 'LinkedIn', 'Other'] as const,
  campaignStatuses: ['Draft', 'Planning', 'Active', 'Optimizing', 'Completed', 'Paused'] as const,
  paymentStatuses: ['Paid', 'Part paid', 'Pending', 'Overdue'] as const,
  sampleFlatStatuses: ['Ready', 'Under Construction', 'Not Available'] as const,
  assetReadinessStatuses: ['Delivered', 'In Production', 'Scheduled', 'Pending'] as const,
};
