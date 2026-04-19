import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { useCallerProfile, useSaveProfile } from "../hooks/useBackend";

export default function ProfilePage() {
  const { isAuthenticated, isInitializing, handleLogin, isAdmin } = useAuth();
  const { data: profile, isLoading } = useCallerProfile();
  const saveProfile = useSaveProfile();
  const qc = useQueryClient();

  const [name, setName] = useState(profile?.name ?? "");
  const [email, setEmail] = useState(profile?.email ?? "");
  const [saving, setSaving] = useState(false);

  if (isInitializing || isLoading) return <LoadingSpinner fullPage />;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProfile.mutateAsync({ name, email });
      toast.success("Profile saved!");
      qc.invalidateQueries({ queryKey: ["callerUserProfile"] });
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto" data-ocid="profile.page">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">
        My Profile
      </h1>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center">
            <User size={28} />
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-lg">
              {profile?.name || "Sports Fan"}
            </p>
            <p className="text-sm text-muted-foreground">
              {profile?.email || "No email set"}
            </p>
            {isAdmin && (
              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                Admin
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label
              htmlFor="name"
              className="flex items-center gap-1.5 text-sm font-medium mb-1"
            >
              <User size={14} /> Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              data-ocid="profile.name_input"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="flex items-center gap-1.5 text-sm font-medium mb-1"
            >
              <Mail size={14} /> Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-ocid="profile.email_input"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
            data-ocid="profile.save_button"
          >
            {saving ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </div>

      {isAuthenticated && (
        <Button
          variant="outline"
          onClick={handleLogin}
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 transition-smooth"
          data-ocid="profile.sign_out_button"
        >
          <LogOut size={16} className="mr-2" /> Sign Out
        </Button>
      )}
    </div>
  );
}
