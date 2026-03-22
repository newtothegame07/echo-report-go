import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertTriangle, MapPin, Users } from "lucide-react";

const stats = [
  { title: "Total Reports", value: "247", icon: FileText, change: "+12 this week" },
  { title: "Resolved", value: "189", icon: CheckCircle, change: "76% resolution rate" },
  { title: "Pending", value: "38", icon: Clock, change: "15 assigned" },
  { title: "Critical", value: "20", icon: AlertTriangle, change: "8 unassigned" },
  { title: "Active Zones", value: "12", icon: MapPin, change: "3 high-priority" },
  { title: "Registered Users", value: "1,842", icon: Users, change: "+58 this month" },
];

const recentReports = [
  { id: "WR-2024-001", location: "MG Road, Zone A", type: "Overflowing Bin", status: "Pending", date: "2024-01-15" },
  { id: "WR-2024-002", location: "Station Road, Zone B", type: "Illegal Dumping", status: "Assigned", date: "2024-01-15" },
  { id: "WR-2024-003", location: "Park Street, Zone C", type: "Hazardous Waste", status: "Resolved", date: "2024-01-14" },
  { id: "WR-2024-004", location: "Main Market, Zone A", type: "Overflowing Bin", status: "Pending", date: "2024-01-14" },
  { id: "WR-2024-005", location: "Lake View, Zone D", type: "Construction Debris", status: "In Progress", date: "2024-01-13" },
];

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-accent/20 text-accent-foreground",
  Resolved: "bg-primary/20 text-primary",
};

const Dashboard = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((s) => (
        <Card key={s.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
            <s.icon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{s.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left py-3 px-2 font-medium">ID</th>
                <th className="text-left py-3 px-2 font-medium">Location</th>
                <th className="text-left py-3 px-2 font-medium">Type</th>
                <th className="text-left py-3 px-2 font-medium">Status</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentReports.map((r) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-2 font-mono text-xs">{r.id}</td>
                  <td className="py-3 px-2">{r.location}</td>
                  <td className="py-3 px-2">{r.type}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || ""}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Dashboard;
