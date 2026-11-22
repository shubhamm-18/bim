export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Changes Requested';

export interface ApprovalItem {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  kind: string;
  submittedBy: string;
  submittedAt: string;
  status: ApprovalStatus;
  commentsCount?: number;
  previewUrl?: string;
}
