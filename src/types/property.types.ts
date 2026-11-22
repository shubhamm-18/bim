import { agencyConfig } from '@/config/agency.config';

export type SampleFlatStatus = (typeof agencyConfig.sampleFlatStatuses)[number];
export type AssetReadinessStatus = (typeof agencyConfig.assetReadinessStatuses)[number];

export interface PropertyProfile {
  id: string;
  projectId: string;
  projectName: string;
  developer: string;
  city: string;
  towerPossession: string;
  sampleFlatStatus: SampleFlatStatus;
  totalInventory: number;
  availableInventory: number;
  startingPrice: number;
  walkthroughAssetStatus: AssetReadinessStatus;
  explainerAssetStatus: AssetReadinessStatus;
  expectedDealValue: number;
  commissionRatePercent: number;
}
