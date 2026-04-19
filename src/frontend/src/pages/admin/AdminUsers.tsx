import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Principal } from "@icp-sdk/core/principal";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "../../backend";
import { EmptyState } from "../../components/EmptyState";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useAssignRole, useListUsers } from "../../hooks/useBackend";

const roleColors: Record<string, string> = {
  admin: "bg-accent/10 text-accent border-accent/30",
  user: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  guest: "bg-muted text-muted-foreground border-border",
};

export default function AdminUsers() {
  const { data: users, isLoading } = useListUsers();
  const assignRole = useAssignRole();

  const handleRoleChange = async (user: Principal, role: UserRole) => {
    try {
      await assignRole.mutateAsync({ user, role });
      toast.success("Role updated");
    } catch {
      toast.error("Failed to update role");
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;

  return (
    <div data-ocid="admin.users.page">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/admin"
          className="text-muted-foreground hover:text-foreground transition-smooth"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Users
        </h1>
      </div>

      {(users ?? []).length === 0 ? (
        <EmptyState
          title="No users yet"
          description="Users will appear here after they sign in"
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm" data-ocid="admin.users.table">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  User
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Joined
                </th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(users ?? []).map((user, i) => (
                <tr
                  key={user.id.toString()}
                  className="bg-card hover:bg-muted/20 transition-colors"
                  data-ocid={`admin.users.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">
                        {user.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {user.id.toString().slice(0, 24)}...
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(
                      Number(user.createdAt) / 1_000_000,
                    ).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      defaultValue={UserRole.user}
                      onValueChange={(v) =>
                        handleRoleChange(user.id, v as UserRole)
                      }
                    >
                      <SelectTrigger
                        className="w-28 h-7"
                        data-ocid={`admin.users.role_select.${i + 1}`}
                      >
                        <Badge
                          className={`text-xs border ${roleColors[UserRole.user]}`}
                        >
                          User
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
