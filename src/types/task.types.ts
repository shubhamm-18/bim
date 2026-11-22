import { agencyConfig } from '@/config/agency.config';
import { RoleView } from './common.types';

export type PriorityLevel = (typeof agencyConfig.taskPriorities)[number];
export type TaskStatus = (typeof agencyConfig.taskStatuses)[number];
export type TaskRecurrence = (typeof agencyConfig.taskRecurrence)[number];

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  due: string;
  status: TaskStatus;
  priority: PriorityLevel;
  role: RoleView;
  recurrence?: TaskRecurrence;
}
