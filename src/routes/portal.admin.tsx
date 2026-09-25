import { createFileRoute, redirect } from "@tanstack/react-router";
import { ShieldCheck, FilePenLine, Globe2, Megaphone, Map } from "lucide-react";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/portal/admin")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    if (!session.isOwner) throw redirect({ to: "/portal" });
  },
  component: OwnerControl,
});

function OwnerControl() {
  const cards = [
    [FilePenLine, "Site content", "Homepage copy, rules, navigation and featured content."],
    [Megaphone, "Announcements", "Create and schedule network-wide notices."],
    [Globe2, "World registry", "Create, edit, archive and publish registered worlds."],
    [Map, "Spawn map", "Set the public map-image URL used by the Spawn display."],
  ] as const;
  return <section className="space-y-6"><header className="panel rounded-lg p-6"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-magenta"><ShieldCheck className="h-4 w-4" /> Owner control</p><h1 className="mt-3 text-3xl font-black">Kairu management</h1><p className="mt-2 max-w-2xl text-muted-foreground">Access is verified against your Discord server ownership or Kairu Owner role on every protected session check.</p></header><div className="grid gap-4 md:grid-cols-2">{cards.map(([Icon, title, description]) => <article key={title} className="panel rounded-lg p-5"><Icon className="h-5 w-5 text-electric"/><h2 className="mt-4 font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-magenta">CMS controls coming next</p></article>)}</div></section>;
}
