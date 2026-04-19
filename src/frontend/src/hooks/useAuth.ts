import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRole, createActor } from "../backend";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const roleQuery = useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const profileQuery = useQuery({
    queryKey: ["callerUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const handleLogin = () => {
    if (isAuthenticated) {
      clear();
      queryClient.clear();
    } else {
      login();
    }
  };

  const isAdmin = roleQuery.data === UserRole.admin;
  const isUser = roleQuery.data === UserRole.user || isAdmin;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    isAdmin,
    isUser,
    role: roleQuery.data,
    profile: profileQuery.data,
    profileLoading: actorFetching || profileQuery.isLoading,
    profileFetched: !!actor && profileQuery.isFetched,
    handleLogin,
    principal: identity?.getPrincipal(),
  };
}
