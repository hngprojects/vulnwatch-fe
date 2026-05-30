"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Link, Unlink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { integrationsService, SlackStatus } from "../../services/integrations.service";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <h2 className="text-xl font-semibold text-[#2B2B2B]">{title}</h2>
      <p className="text-[14px] leading-6 text-[#666666] sm:text-[16px]">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

const IntegrationsSettings = () => {
  const [loading, setLoading] = useState(true);
  const [slackStatus, setSlackStatus] = useState<SlackStatus | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    setLoading(true);
    try {
      const status = await integrationsService.getSlackStatus();
      setSlackStatus(status);
    } catch {
      toast.error("Failed to load Slack integration status");
    } finally {
      setLoading(false);
    }
  }

  const handleConnectSlack = async () => {
    setActionLoading(true);
    try {
      const { authorizationUrl } = await integrationsService.getSlackAuthorizeUrl();
      if (authorizationUrl) {
        window.location.href = authorizationUrl;
      } else {
        throw new Error("No authorization URL returned");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to initiate Slack connection");
      setActionLoading(false);
    }
  };

  const handleDisconnectSlack = async () => {
    setActionLoading(true);
    try {
      await integrationsService.disconnectSlack();
      toast.success("Slack workspace disconnected successfully");
      await fetchStatus();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to disconnect Slack");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Section title="Integrations" subtitle="Connect VulnWatch to your favorite tools">
          <div className="flex items-center justify-center p-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </Section>
      </div>
    );
  }

  const isConnected = slackStatus?.isConnected;

  return (
    <div className="space-y-6">
      <Section
        title="Integrations"
        subtitle="Connect VulnWatch to your favorite tools"
      >
        <div className="flex flex-col gap-4">
          
          {/* Slack Integration Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                {/* Slack Logo SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.527 2.527 0 0 1 15.166 0a2.528 2.528 0 0 1 2.52 2.522v6.312zM15.166 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.271a2.527 2.527 0 0 1-2.52-2.52 2.528 2.528 0 0 1 2.52-2.521h6.313A2.527 2.527 0 0 1 24 15.166a2.528 2.528 0 0 1-2.522 2.52h-6.313z" fill="#E01E5A" />
                  <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0" />
                  <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D" />
                  <path d="M15.166 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Slack</h3>
                <p className="text-sm text-slate-500">
                  {isConnected
                    ? slackStatus?.workspaceName 
                      ? `Connected to ${slackStatus.workspaceName}`
                      : "Workspace connected"
                    : "Receive alerts and reports in your Slack workspace"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    Connected
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-gray-200"
                    onClick={handleDisconnectSlack}
                    disabled={actionLoading}
                  >
                    {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Unlink className="h-4 w-4 mr-2" />}
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleConnectSlack} 
                  disabled={actionLoading}
                  className="bg-[#4A154B] hover:bg-[#3b113b] text-white"
                >
                  {actionLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Link className="h-4 w-4 mr-2" />}
                  Connect Slack
                </Button>
              )}
            </div>
          </div>
          
        </div>
      </Section>
    </div>
  );
};

export default IntegrationsSettings;
