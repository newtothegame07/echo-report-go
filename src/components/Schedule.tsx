import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Trash2, MapPin } from "lucide-react";

const scheduleData = [
  {
    zone: "Zone 1 - Downtown",
    days: ["Monday", "Thursday"],
    time: "7:00 AM - 11:00 AM",
    areas: ["Main Street", "Central Plaza", "Market District"],
  },
  {
    zone: "Zone 2 - North District",
    days: ["Tuesday", "Friday"],
    time: "6:00 AM - 10:00 AM",
    areas: ["North Avenue", "Park View", "Riverside"],
  },
  {
    zone: "Zone 3 - South District",
    days: ["Wednesday", "Saturday"],
    time: "7:00 AM - 11:00 AM",
    areas: ["South Gardens", "Industrial Area", "Suburb Plaza"],
  },
  {
    zone: "Zone 4 - East District",
    days: ["Monday", "Thursday"],
    time: "8:00 AM - 12:00 PM",
    areas: ["East End", "Shopping Center", "Residential Hills"],
  },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Waste Collection Schedule</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Check when waste collection happens in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {scheduleData.map((schedule, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-primary" />
                  {schedule.zone}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{schedule.days.join(", ")}</p>
                    <p className="text-sm text-muted-foreground">{schedule.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Coverage Areas:</p>
                    <p className="text-sm text-muted-foreground">
                      {schedule.areas.join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Please place your waste bins outside by 6:00 AM on collection days.
                For special collection requests or holiday schedules, please contact our support team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
