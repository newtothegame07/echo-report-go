import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const TrackComplaint = () => {
  const [complaintId, setComplaintId] = useState("");
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data
    setTrackingData({
      id: complaintId || "WM2024-1234",
      status: "in-progress",
      location: "123 Main Street, District",
      type: "Household Waste",
      submittedDate: "2024-03-15",
      assignedTo: "Team A - Zone 3",
      estimatedCompletion: "2024-03-17",
    });

    setIsSearching(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5" />;
      case "in-progress":
        return <Clock className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "outline" => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      default:
        return "outline";
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
            <CardDescription>Enter your complaint ID to track status</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="complaint-id">Complaint ID</Label>
                  <Input
                    id="complaint-id"
                    placeholder="WM2024-1234"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" disabled={isSearching}>
                    <Search className="h-4 w-4 mr-2" />
                    {isSearching ? "Searching..." : "Track"}
                  </Button>
                </div>
              </div>
            </form>

            {trackingData && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="font-semibold text-lg">Complaint #{trackingData.id}</h3>
                    <p className="text-sm text-muted-foreground">{trackingData.type}</p>
                  </div>
                  <Badge variant={getStatusVariant(trackingData.status)} className="gap-1">
                    {getStatusIcon(trackingData.status)}
                    {trackingData.status === "in-progress" ? "In Progress" : "Completed"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{trackingData.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{trackingData.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted Date</p>
                    <p className="font-medium">{trackingData.submittedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Completion</p>
                    <p className="font-medium">{trackingData.estimatedCompletion}</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 mt-4">
                  <h4 className="font-semibold mb-2">Progress Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Complaint Received</p>
                        <p className="text-sm text-muted-foreground">March 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Team Assigned</p>
                        <p className="text-sm text-muted-foreground">March 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Collection in Progress</p>
                        <p className="text-sm text-muted-foreground">Expected by March 17, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TrackComplaint;
