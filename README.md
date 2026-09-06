# Kairu SMP Community Website

Kairu SMP is a cinematic Minecraft community website and player portal built with **TanStack Start, React 19, TypeScript, and Tailwind CSS**. The interface uses a dark cyberpunk visual system with restrained purple, magenta, and electric-blue lighting, custom voxel artwork, glass panels, neon edge treatments, and reduced-motion support.

The project is frontend-complete and runs against realistic local mock data by default. It can connect to a Railway-hosted API by setting one environment variable; no page components need to be rewritten.

## Experience Map

| Area              | Routes                                                                                                                                               | Included capabilities                                                                                                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Public website    | `/`, `/play`, `/worlds`, `/live`, `/events`, `/leaderboards`, `/membership`, `/community`                                                            | Cinematic landing page, copyable Java and Bedrock addresses, server telemetry, visual world browser, creator discovery, platform and status filters, event registration feedback, sortable leaderboards, membership comparison, and creator programme information |
| Authentication    | `/login`                                                                                                                                             | Frontend demonstration sign-in with persistent local session state and protected portal routing                                                                                                                                                                   |
| Player portal     | `/portal`, `/portal/profile`, `/portal/stats`, `/portal/discord`, `/portal/achievements`, `/portal/events`, `/portal/membership`, `/portal/settings` | Player KPIs, linked-account states, Minecraft statistics, achievements, event sign-ups, Discord identity, membership management, preferences, and responsive dashboard navigation                                                                                 |
| Shared foundation | `src/config`, `src/data`, `src/services`, `src/components/site`                                                                                      | Central branding, typed mock data, Railway-ready API service boundary, reusable visual primitives, global navigation, footer, and interaction components                                                                                                          |

## Local Development

Use Node.js 22 or a compatible modern Node.js release. The repository uses `pnpm`.

```sh
pnpm install
pnpm dev
```

The development server binds to `0.0.0.0:3000`. Create a production build with:

```sh
pnpm build
```

The demonstration login accepts any non-empty username. The password field is present for production parity but is not validated by the frontend-only session stub. Replace `src/lib/auth.tsx` when the production authentication contract is available.

## Branding and Content

Change `src/config/site.ts` to update the website name, server addresses, supported Minecraft version, Discord invite, social links, and global description. All major pages consume that configuration.

Visual asset URLs are centralized in `src/config/visuals.ts`. The site currently references CDN-hosted artwork so production builds stay lightweight. Typed demonstration content lives in `src/data/mock.ts`.

High-resolution source artwork is included in `design-assets/` in the downloadable project package. These files are not bundled by the application and can be rehosted or replaced without changing page components.

## Railway API Connection

Set `VITE_SMP_API_URL` to the public base URL of the Railway service:

```sh
VITE_SMP_API_URL=https://your-service.up.railway.app
```

When the variable is absent, the site uses local mock data. When it is present, `src/services/smp.ts` calls the endpoints below and sends cookies with `credentials: "include"`.

| Method | Endpoint                | Expected response    |
| ------ | ----------------------- | -------------------- |
| `GET`  | `/api/server/status`    | `ServerStatus`       |
| `GET`  | `/api/worlds`           | `World[]`            |
| `GET`  | `/api/streams`          | `Stream[]`           |
| `GET`  | `/api/events`           | `SmpEvent[]`         |
| `GET`  | `/api/leaderboard`      | `LeaderboardEntry[]` |
| `GET`  | `/api/membership/tiers` | `MembershipTier[]`   |
| `GET`  | `/api/me`               | `PortalUser`         |
| `GET`  | `/api/me/achievements`  | `Achievement[]`      |
| `GET`  | `/api/me/minecraft`     | `MinecraftStats`     |

The TypeScript contracts are defined in `src/data/types.ts`. The server-status query refreshes every 30 seconds and the stream query refreshes every 60 seconds when a remote API is configured. The Railway service must allow the website origin through Cross-Origin Resource Sharing and must allow credentials if cookie-based authentication is retained.

> The public service layer contains only safe browser requests. API secrets, Discord bot tokens, streaming platform credentials, subscription signing keys, and administrative operations must remain on the Railway backend.

## Validation

The project has been validated with a production build, desktop and mobile route captures, a complete demonstration sign-in, protected-route redirection, and nested portal navigation. Interactive filters, copy controls, registration feedback, membership cadence controls, account-state controls, and session persistence are implemented in the frontend.

## References

[1]: https://tanstack.com/start/latest "TanStack Start Documentation"
[2]: https://react.dev/ "React Documentation"
[3]: https://tailwindcss.com/docs "Tailwind CSS Documentation"
[4]: https://docs.railway.com/ "Railway Documentation"
