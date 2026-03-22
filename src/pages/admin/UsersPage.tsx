import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserCheck, UserX } from "lucide-react";
import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", reports: 12, joined: "2023-06-15", status: "Active" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", reports: 8, joined: "2023-08-20", status: "Active" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", reports: 5, joined: "2023-09-10", status: "Active" },
  { id: 4, name: "Sneha Gupta", email: "sneha@example.com", reports: 15, joined: "2023-04-05", status: "Active" },
  { id: 5, name: "Vikram Singh", email: "vikram@example.com", reports: 3, joined: "2023-11-22", status: "Inactive" },
  { id: 6, name: "Meera Nair", email: "meera@example.com", reports: 7, joined: "2023-07-18", status: "Active" },
  { id: 7, name: "Karan Joshi", email: "karan@example.com", reports: 20, joined: "2023-03-01", status: "Active" },
  { id: 8, name: "Anita Desai", email: "anita@example.com", reports: 1, joined: "2024-01-02", status: "Inactive" },
];

const UsersPage = () => {
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">User Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockUsers.filter((u) => u.status === "Active").length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <UserX className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{mockUsers.filter((u) => u.status === "Inactive").length}</p>
                <p className="text-sm text-muted-foreground">Inactive Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">Σ</div>
              <div>
                <p className="text-2xl font-bold">{mockUsers.reduce((a, u) => a + u.reports, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Reports Filed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardHeader><CardTitle>Registered Citizens</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3 px-2 font-medium">Name</th>
                  <th className="text-left py-3 px-2 font-medium">Email</th>
                  <th className="text-left py-3 px-2 font-medium">Reports</th>
                  <th className="text-left py-3 px-2 font-medium">Joined</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                  <th className="text-left py-3 px-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-2 font-medium">{u.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{u.email}</td>
                    <td className="py-3 px-2">{u.reports}</td>
                    <td className="py-3 px-2 text-muted-foreground">{u.joined}</td>
                    <td className="py-3 px-2">
                      <Badge variant={u.status === "Active" ? "default" : "secondary"}>{u.status}</Badge>
                    </td>
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

export default UsersPage;
