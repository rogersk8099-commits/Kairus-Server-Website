/**
 * Service boundary. Every page reads data through these functions, so swapping
 * the mock source for a real API only means editing this file.
 */
import * as mock from "@/data/mock";
import type {
  Achievement,
  LeaderboardEntry,
  MembershipTier,
  MinecraftStats,
  PortalUser,
  ServerStatus,
  SmpEvent,
  Stream,
  World,
} from "@/data/types";

const LATENCY = 0;
const API_BASE_URL: string | undefined = import.meta.env["VITE_SMP_API_URL"]?.replace(/\/$/, "");
const SERVER_POLL_INTERVAL: number | false = API_BASE_URL ? 30_000 : false;
const STREAM_POLL_INTERVAL: number | false = API_BASE_URL ? 60_000 : false;

function resolve<T>(value: T): Promise<T> {
  return LATENCY ? new Promise((r) => setTimeout(() => r(value), LATENCY)) : Promise.resolve(value);
}

async function request<T>(path: string, fallback: T): Promise<T> {
  if (!API_BASE_URL) return resolve(fallback);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`SMP API request failed (${response.status}) for ${path}`);
  }

  return response.json() as Promise<T>;
}

export const smpApi = {
  getServerStatus: (): Promise<ServerStatus> => request("/api/server/status", mock.serverStatus),
  getWorlds: (): Promise<World[]> => request("/api/worlds", mock.worlds),
  getStreams: (): Promise<Stream[]> => request("/api/streams", mock.streams),
  getEvents: (): Promise<SmpEvent[]> => request("/api/events", mock.events),
  getLeaderboard: (): Promise<LeaderboardEntry[]> => request("/api/leaderboard", mock.leaderboard),
  getMembershipTiers: (): Promise<MembershipTier[]> =>
    request("/api/membership/tiers", mock.membershipTiers),
  getAchievements: (): Promise<Achievement[]> => request("/api/me/achievements", mock.achievements),
  getPortalUser: (): Promise<PortalUser> => request("/api/me", mock.portalUser),
  getMinecraftStats: (): Promise<MinecraftStats> =>
    request("/api/me/minecraft", mock.minecraftStats),
};

export const queries = {
  serverStatus: {
    queryKey: ["server-status"],
    queryFn: smpApi.getServerStatus,
    refetchInterval: SERVER_POLL_INTERVAL,
  },
  worlds: { queryKey: ["worlds"], queryFn: smpApi.getWorlds },
  streams: {
    queryKey: ["streams"],
    queryFn: smpApi.getStreams,
    refetchInterval: STREAM_POLL_INTERVAL,
  },
  events: { queryKey: ["events"], queryFn: smpApi.getEvents },
  leaderboard: { queryKey: ["leaderboard"], queryFn: smpApi.getLeaderboard },
  tiers: { queryKey: ["tiers"], queryFn: smpApi.getMembershipTiers },
  achievements: { queryKey: ["achievements"], queryFn: smpApi.getAchievements },
  portalUser: { queryKey: ["portal-user"], queryFn: smpApi.getPortalUser },
  minecraftStats: { queryKey: ["mc-stats"], queryFn: smpApi.getMinecraftStats },
};
