import { NextRequest, NextResponse } from 'next/server';
import { authorizeProjectScope } from '@/lib/server-auth';
import { canViewFinance } from '@/lib/permissions';
import { initialProjects, initialSocialDeliverables, initialApprovalItems } from '@/data';

export async function GET(req: NextRequest) {
  const requestedClient = req.nextUrl.searchParams.get('client');
  const auth = authorizeProjectScope(req, requestedClient);

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const effectiveClient = auth.scopedClient || requestedClient;
  const showFinance = canViewFinance(auth.role);

  const projects = initialProjects
    .filter((p) => !effectiveClient || p.clientName.toLowerCase() === effectiveClient.toLowerCase())
    .map((p) => ({
      ...p,
      budget: showFinance ? p.budget : undefined,
    }));

  const deliverables = initialSocialDeliverables.filter(
    (d) => !effectiveClient || d.client.toLowerCase() === effectiveClient.toLowerCase()
  );

  const allowedProjectNames = projects.map((p) => p.name);
  const approvals = initialApprovalItems.filter((a) =>
    allowedProjectNames.includes(a.projectName)
  );

  return NextResponse.json({
    role: auth.role,
    scopedClient: auth.scopedClient,
    projects,
    deliverables,
    approvals,
  });
}
