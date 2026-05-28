import { privateApi } from '@/lib/axios';
import type {
  DashboardSummary,
  DashboardSummaryResponse,
  DashboardDomainsList,
  DashboardDomainsResponse,
  DashboardDomainsParams,
  DashboardAlert,
  DashboardAlertsResponse,
  DashboardAlertsParams,
} from '@/features/dashboard/types/dashboard-api.types';

// Generic unwrap helper (mirrors profile.service.ts pattern)

function unwrap<T>(res: { data: { isSuccess: boolean; value: T | null; error: { code: string; message: string } | null }; status: number }): T {
  if (!res.data.isSuccess || res.data.value === null || res.data.value === undefined) {
    throw new Error(res.data.error?.message ?? `Request failed (${res.status})`);
  }
  return res.data.value;
}

// Service object

export const dashboardService = {
  /**
   * GET /api/dashboard/summary
   * Overall stats — called on every dashboard load.
   */
  async getDashboardSummary(): Promise<DashboardSummary> {
    const res = await privateApi.get<DashboardSummaryResponse>('/api/dashboard/summary');
    return unwrap(res);
  },

  /**
   * GET /api/dashboard/domains
   * Paginated list of monitored domains with SSL + security info.
   * Used for both the MonitoredDomains row AND the SslCertificatesList.
   */
  async getDashboardDomains(params?: DashboardDomainsParams): Promise<DashboardDomainsList> {
    const res = await privateApi.get<DashboardDomainsResponse>('/api/dashboard/domains', {
      params,
    });
    return unwrap(res);
  },

  /**
   * GET /api/dashboard/alerts
   * Recent alerts feed — used for DashboardRecentAlerts component.
   */
  async getDashboardAlerts(params?: DashboardAlertsParams): Promise<DashboardAlert[]> {
    const res = await privateApi.get<DashboardAlertsResponse>('/api/dashboard/alerts', {
      params,
    });
    return unwrap(res);
  },
};
