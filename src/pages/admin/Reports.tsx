import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const allReports = [
  { id: "WR-2024-001", reporter: "Rahul Sharma", location: "MG Road, Zone A", type: "Overflowing Bin", status: "Pending", date: "2024-01-15", priority: "High" },
  { id: "WR-2024-002", reporter: "Priya Patel", location: "Station Road, Zone B", type: "Illegal Dumping", status: "Assigned", date: "2024-01-15", priority: "Critical" },
  { id: "WR-2024-003", reporter: "Amit Kumar", location: "Park Street, Zone C", type: "Hazardous Waste", status: "Resolved", date: "2024-01-14", priority: "Critical" },
  { id: "WR-2024-004", reporter: "Sneha Gupta", location: "Main Market, Zone A", type: "Overflowing Bin", status: "Pending", date: "2024-01-14", priority: "Medium" },
  { id: "WR-2024-005", reporter: "Vikram Singh", location: "Lake View, Zone D", type: "Construction Debris", status: "In Progress", date: "2024-01-13", priority: "High" },
  { id: "WR-2024-006", reporter: "Meera Nair", location: "Temple Road, Zone B", type: "Street Litter", status: "Resolved", date: "2024-01-13", priority: "Low" },
  { id: "WR-2024-007", reporter: "Karan Joshi", location: "Industrial Area, Zone E", type: "Hazardous Waste", status: "Assigned", date: "2024-01-12", priority: "Critical" },
  { id: "WR-2024-008", reporter: "Anita Desai", location: "Riverside, Zone D", type: "Illegal Dumping", status: "Pending", date: "2024-01-12", priority: "High" },
];

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Assigned: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-accent/20 text-accent-foreground border-accent/30",
  Resolved: "bg-primary/20 text-primary border-primary/30",
};

const priorityVariant: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
  Critical: "destructive",
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

const Reports = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = allReports.filter((r) => {
    const matchSearch = r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.reporter.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Waste Reports</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by ID, location, or reporter..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Assigned", "In Progress", "Resolved"].map((s) => (
            <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"} onClick={() => setStatusFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" /> {filtered.length} Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3 px-2 font-medium">ID</th>
                  <th className="text-left py-3 px-2 font-medium">Reporter</th>
                  <th className="text-left py-3 px-2 font-medium">Location</th>
                  <th className="text-left py-3 px-2 font-medium">Type</th>
                  <th className="text-left py-3 px-2 font-medium">Priority</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Date</th>
                  <th className="text-left py-3 px-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-mono text-xs">{r.id}</td>
                    <td className="py-3 px-2">{r.reporter}</td>
                    <td className="py-3 px-2">{r.location}</td>
                    <td className="py-3 px-2">{r.type}</td>
                    <td className="py-3 px-2">
                      <Badge variant={priorityVariant[r.priority]}>{r.priority}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[r.status]}`}>{r.status}</span>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{r.date}</td>
                    <td className="py-3 px-2">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
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

export default Reports;
