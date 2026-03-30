import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasteType, setWasteType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to submit a report",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    // Mock submission
    const reportId = `WM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;

    setTimeout(() => {
      toast({
        title: "Report Submitted Successfully!",
        description: `Your complaint ID is #${reportId}`,
      });
      (e.target as HTMLFormElement).reset();
      setWasteType("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="report" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Report Waste Issue</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us keep the city clean by reporting uncollected waste in your area
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-medium">
          <CardHeader>
            <CardTitle>Submit a Complaint</CardTitle>
            <CardDescription>
              Fill in the details below and we'll assign a team to your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="Your Phone Number" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="Your Email Address" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location Address
                </Label>
                <Input id="location" name="location" placeholder="123 Main Street, District, City" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste-type">Type of Waste</Label>
                <Select required value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger id="waste-type">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Household Waste">Household Waste</SelectItem>
                    <SelectItem value="Recyclable Materials">Recyclable Materials</SelectItem>
                    <SelectItem value="Hazardous Waste">Hazardous Waste</SelectItem>
                    <SelectItem value="Construction Debris">Construction Debris</SelectItem>
                    <SelectItem value="Electronic Waste">Electronic Waste</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe the waste issue in detail..." rows={4} required />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ReportForm;
