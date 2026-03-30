import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const MOCK_REPORTS: Record<string, any> = {
  "WM-2026-1234": { report_id: "WM-2026-1234", waste_type: "Household Waste", status: "In Progress", location: "123 Main St, Zone A", assigned_to: "Team Alpha", created_at: "2026-03-15", priority: "High", description: "Large pile of uncollected household waste near the park entrance." },
  "WM-2026-5678": { report_id: "WM-2026-5678", waste_type: "Hazardous Waste", status: "Pending", location: "45 Industrial Rd, Zone C", assigned_to: null, created_at: "2026-03-20", priority: "Critical", description: "Chemical containers dumped near the river bank." },
  "WM-2026-9012": { report_id: "WM-2026-9012", waste_type: "Construction Debris", status: "Resolved", location: "78 Oak Avenue, Zone B", assigned_to: "Team Beta", created_at: "2026-03-10", priority: "Medium", description: "Construction debris left after building renovation." },
};

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId.trim()) return;

    setIsSearching(true);
    setNotFound(false);

    setTimeout(() => {
      const data = MOCK_REPORTS[complaintId.trim().toUpperCase()];
      if (data) {
        setTrackingData(data);
      } else {
        setTrackingData(null);
        setNotFound(true);
      }
      setIsSearching(false);
    }, 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved": return <CheckCircle2 className="h-5 w-5" />;
      case "In Progress":
      case "Assigned": return <Clock className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" => {
    switch (status) {
      case "Resolved": return "default";
      case "In Progress":
      case "Assigned": return "secondary";
      default: return "outline";
    }
  };

  return (
    <section id="track" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Track Your Complaint</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter your complaint ID to check the status and progress
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle>Search Complaint</CardTitle>
            <CardDescription>Enter your complaint ID to track status (try WM-2026-1234)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="complaint-id">Complaint ID</Label>
                  <Input id="complaint-id" placeholder="WM-2026-1234" value={complaintId} onChange={(e) => setComplaintId(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={isSearching}>
                    <Search className="h-4 w-4 mr-2" />
                    {isSearching ? "Searching..." : "Track"}
                  </Button>
                </div>
              </div>
            </form>

            {notFound && (
              <div className="mt-6 text-center text-muted-foreground">No complaint found with that ID. Please check and try again.</div>
            )}

            {trackingData && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="font-semibold text-lg">Complaint #{trackingData.report_id}</h3>
                    <p className="text-sm text-muted-foreground">{trackingData.waste_type}</p>
                  </div>
                  <Badge variant={getStatusVariant(trackingData.status)} className="gap-1">
                    {getStatusIcon(trackingData.status)}
                    {trackingData.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">Location</p><p className="font-medium">{trackingData.location}</p></div>
                  <div><p className="text-sm text-muted-foreground">Assigned To</p><p className="font-medium">{trackingData.assigned_to || "Not yet assigned"}</p></div>
                  <div><p className="text-sm text-muted-foreground">Submitted Date</p><p className="font-medium">{new Date(trackingData.created_at).toLocaleDateString()}</p></div>
                  <div><p className="text-sm text-muted-foreground">Priority</p><p className="font-medium">{trackingData.priority}</p></div>
                </div>

                {trackingData.description && (
                  <div className="bg-muted rounded-lg p-4 mt-4">
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{trackingData.description}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TrackComplaint;
