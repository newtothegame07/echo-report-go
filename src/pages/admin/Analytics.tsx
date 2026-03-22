import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const monthlyData = [
  { month: "Aug", reports: 32, resolved: 28 },
  { month: "Sep", reports: 45, resolved: 38 },
  { month: "Oct", reports: 38, resolved: 35 },
  { month: "Nov", reports: 52, resolved: 44 },
  { month: "Dec", reports: 41, resolved: 36 },
  { month: "Jan", reports: 39, resolved: 29 },
];

const wasteTypeData = [
  { name: "Overflowing Bins", value: 35 },
  { name: "Illegal Dumping", value: 25 },
  { name: "Hazardous Waste", value: 15 },
  { name: "Construction Debris", value: 13 },
  { name: "Street Litter", value: 12 },
];

const zoneData = [
  { zone: "Zone A", reports: 58, resolved: 45 },
  { zone: "Zone B", reports: 42, resolved: 38 },
  { zone: "Zone C", reports: 35, resolved: 30 },
  { zone: "Zone D", reports: 48, resolved: 35 },
  { zone: "Zone E", reports: 64, resolved: 41 },
];

const COLORS = [
  "hsl(145, 65%, 45%)",
  "hsl(200, 85%, 45%)",
  "hsl(45, 90%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(270, 60%, 55%)",
];

const Analytics = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Analytics & Statistics</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle>Monthly Reports vs Resolved</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reports" fill="hsl(200, 85%, 45%)" name="Reports" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(145, 65%, 45%)" name="Resolved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Waste Type Distribution</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={wasteTypeData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {wasteTypeData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Zone-wise Report Comparison</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="reports" fill="hsl(0, 72%, 51%)" name="Total Reports" radius={[4, 4, 0, 0]} />
              <Bar dataKey="resolved" fill="hsl(145, 65%, 45%)" name="Resolved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Analytics;
