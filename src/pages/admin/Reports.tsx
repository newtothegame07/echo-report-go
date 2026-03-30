import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const initialReports = [
  { id: "1", report_id: "WM-2026-1234", reporter_name: "Rahul Sharma", location: "123 Main St, Zone A", waste_type: "Household Waste", status: "In Progress", priority: "High", created_at: "2026-03-15" },
  { id: "2", report_id: "WM-2026-5678", reporter_name: "Priya Patel", location: "45 Industrial Rd, Zone C", waste_type: "Hazardous Waste", status: "Pending", priority: "Critical", created_at: "2026-03-20" },
  { id: "3", report_id: "WM-2026-9012", reporter_name: "Amit Kumar", location: "78 Oak Avenue, Zone B", waste_type: "Construction Debris", status: "Resolved", priority: "Medium", created_at: "2026-03-10" },
  { id: "4", report_id: "WM-2026-3456", reporter_name: "Sneha Gupta", location: "12 River Lane, Zone D", waste_type: "Electronic Waste", status: "Assigned", priority: "Low", created_at: "2026-03-22" },
  { id: "5", report_id: "WM-2026-7890", reporter_name: "Vikram Singh", location: "56 Park Blvd, Zone A", waste_type: "Recyclable Materials", status: "Pending", priority: "Medium", created_at: "2026-03-25" },
];

const statusColor: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Assigned: "bg-blue-100 text-blue-800 border-blue-200",
  "In Progress": "bg-accent/20 text-accent-foreground border-accent/30",
  Resolved: "bg-primary/20 text-primary border-primary/30",
};

const Reports = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reports, setReports] = useState(initialReports);
  const { toast } = useToast();

  const updateField = (id: string, field: string, value: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    toast({ title: `${field.charAt(0).toUpperCase() + field.slice(1)} updated` });
  };

  const filtered = reports.filter((r) => {
    const matchSearch = r.report_id.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase()) ||
      r.reporter_name.toLowerCase().includes(search.toLowerCase());
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
            <Button key={s} size="sm" variant={statusFilter === s ? "default" : "outline"} onClick={() => setStatusFilter(s)}>{s}</Button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" /> {filtered.length} Reports</CardTitle>
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
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-mono text-xs">{r.report_id}</td>
                    <td className="py-3 px-2">{r.reporter_name}</td>
                    <td className="py-3 px-2">{r.location}</td>
                    <td className="py-3 px-2">{r.waste_type}</td>
                    <td className="py-3 px-2">
                      <Select defaultValue={r.priority} onValueChange={(v) => updateField(r.id, "priority", v)}>
                        <SelectTrigger className="w-24 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Low", "Medium", "High", "Critical"].map((p) => (<SelectItem key={p} value={p}>{p}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-2">
                      <Select defaultValue={r.status} onValueChange={(v) => updateField(r.id, "status", v)}>
                        <SelectTrigger className="w-28 h-7 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Pending", "Assigned", "In Progress", "Resolved"].map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="py-6 text-center text-muted-foreground">No reports found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
