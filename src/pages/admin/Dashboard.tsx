import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, Clock, AlertTriangle, MapPin, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { data: reports = [] } = useQuery({
    queryKey: ["admin-reports"],
    queryFn: async () => {
      const { data, error } = await supabase.from("waste_reports").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: userCount = 0 } = useQuery({
    queryKey: ["admin-user-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const resolved = reports.filter((r) => r.status === "Resolved").length;
  const pending = reports.filter((r) => r.status === "Pending").length;
  const critical = reports.filter((r) => r.priority === "Critical").length;
  const zones = new Set(reports.map((r) => r.location.split(",").pop()?.trim())).size;

  const stats = [
    { title: "Total Reports", value: reports.length.toString(), icon: FileText, change: `${pending} pending` },
    { title: "Resolved", value: resolved.toString(), icon: CheckCircle, change: reports.length ? `${Math.round((resolved / reports.length) * 100)}% resolution rate` : "0%" },
    { title: "Pending", value: pending.toString(), icon: Clock, change: `Awaiting action` },
    { title: "Critical", value: critical.toString(), icon: AlertTriangle, change: "Needs attention" },
    { title: "Active Zones", value: zones.toString(), icon: MapPin, change: "Unique areas" },
    { title: "Registered Users", value: userCount.toString(), icon: Users, change: "Total citizens" },
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
                {reports.slice(0, 10).map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-mono text-xs">{r.report_id}</td>
                    <td className="py-3 px-2">{r.location}</td>
                    <td className="py-3 px-2">{r.waste_type}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[r.status] || ""}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {reports.length === 0 && (
                  <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No reports yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
