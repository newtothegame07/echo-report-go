import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertTriangle, MapPin, Users } from "lucide-react";

const mockReports = [
  { id: "1", report_id: "WM-2026-1234", location: "123 Main St, Zone A", waste_type: "Household Waste", status: "In Progress", priority: "High", created_at: "2026-03-15" },
  { id: "2", report_id: "WM-2026-5678", location: "45 Industrial Rd, Zone C", waste_type: "Hazardous Waste", status: "Pending", priority: "Critical", created_at: "2026-03-20" },
  { id: "3", report_id: "WM-2026-9012", location: "78 Oak Avenue, Zone B", waste_type: "Construction Debris", status: "Resolved", priority: "Medium", created_at: "2026-03-10" },
  { id: "4", report_id: "WM-2026-3456", location: "12 River Lane, Zone D", waste_type: "Electronic Waste", status: "Assigned", priority: "Low", created_at: "2026-03-22" },
  { id: "5", report_id: "WM-2026-7890", location: "56 Park Blvd, Zone A", waste_type: "Recyclable Materials", status: "Pending", priority: "Medium", created_at: "2026-03-25" },
];

const Dashboard = () => {
  const resolved = mockReports.filter((r) => r.status === "Resolved").length;
  const pending = mockReports.filter((r) => r.status === "Pending").length;
  const critical = mockReports.filter((r) => r.priority === "Critical").length;

  const stats = [
    { title: "Total Reports", value: mockReports.length.toString(), icon: FileText, change: `${pending} pending` },
    { title: "Resolved", value: resolved.toString(), icon: CheckCircle, change: `${Math.round((resolved / mockReports.length) * 100)}% resolution rate` },
    { title: "Pending", value: pending.toString(), icon: Clock, change: "Awaiting action" },
    { title: "Critical", value: critical.toString(), icon: AlertTriangle, change: "Needs attention" },
    { title: "Active Zones", value: "4", icon: MapPin, change: "Unique areas" },
    { title: "Registered Users", value: "128", icon: Users, change: "Total citizens" },
  ];

  const statusColor: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Assigned: "bg-blue-100 text-blue-800",
    "In Progress": "bg-accent/20 text-accent-foreground",
    Resolved: "bg-primary/20 text-primary",
  };

  return (
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
        <CardHeader><CardTitle>Recent Reports</CardTitle></CardHeader>
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
                {mockReports.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-mono text-xs">{r.report_id}</td>
                    <td className="py-3 px-2">{r.location}</td>
                    <td className="py-3 px-2">{r.waste_type}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || ""}`}>{r.status}</span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
