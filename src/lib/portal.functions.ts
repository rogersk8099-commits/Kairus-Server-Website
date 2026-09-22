import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import { centralAuth } from "@/server/control-plane";
import { parseCookie, SESSION_COOKIE } from "@/server/auth-cookies";

export type PortalOverview = {
  accounts: Array<{ discordUserId: string; minecraftUuid: string; javaUsername: string; linkedAt: string; isPrimary: boolean }>;
  primary: { discordUserId: string; minecraftUuid: string; javaUsername: string; linkedAt: string; isPrimary: boolean } | null;
  statistics: { minecraftUuid: string; name: string; playtimeSeconds: number; blocksBroken: number; kills: number; deaths: number; distanceMeters: number; balance: number; rankName: string; worldName: string | null; updatedAt: string } | null;
};

export const getPortalOverview = createServerFn({ method: "GET" }).handler(async (): Promise<PortalOverview> => {
  setResponseHeader("Cache-Control", "private, no-store");
  const sessionToken = parseCookie(getRequestHeader("cookie") ?? null, SESSION_COOKIE);
  if (!sessionToken) throw new Error("Sign in is required");
  return centralAuth<PortalOverview>("/internal/portal/overview", { sessionToken });
});

export const getPortalAchievements = createServerFn({ method: "GET" }).handler(async (): Promise<{ achievements: Array<{ id: string; name: string; unlocked: boolean; progress: number; target: number; unit: string }> }> => {
  setResponseHeader("Cache-Control", "private, no-store");
  const sessionToken = parseCookie(getRequestHeader("cookie") ?? null, SESSION_COOKIE);
  if (!sessionToken) throw new Error("Sign in is required");
  return centralAuth("/internal/portal/achievements", { sessionToken });
});
