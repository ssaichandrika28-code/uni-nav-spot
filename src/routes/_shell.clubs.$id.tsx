import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Users, UserRound, Check, Award, Mail, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClubLogo, EventCard, PostCard, FollowButton, Avatar } from "@/components/cards";
import { achievements, clubs, events, images, posts } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/clubs/$id")({
  loader: ({ params }) => {
    const c = clubs.find((x) => x.id === params.id);
    if (!c) throw notFound();
    return { id: c.id, name: c.name, short: c.short };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} — CampusHub` : "Club not found — CampusHub";
    const d = loaderData?.short ?? "Club profile";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => <div className="surface p-10 text-center"><p className="font-semibold">Club not found</p><Link to="/clubs" className="btn btn-primary mt-4">All clubs</Link></div>,
  component: ClubProfile,
});

const tabs = ["Overview", "Posts", "Events", "Achievements", "Media"] as const;

function ClubProfile() {
  const { id } = Route.useLoaderData();
  const c = clubs.find((x) => x.id === id)!;
  const { joined, toggleJoin } = useStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const isJoined = joined.has(c.id);
  const clubPosts = posts.filter((p) => p.clubId === c.id);
  const clubEvents = events.filter((e) => e.clubId === c.id);
  const clubAch = achievements.filter((a) => a.clubId === c.id);
  const media = [images.cloudImg, images.hackImg, images.campus, images.roboImg, images.hackImg, images.cloudImg];
  const cover = c.id === "cloud-computing" ? images.cloudImg : c.id === "ai-robotics" ? images.roboImg : images.campus;

  return (
    <div>
      <Link to="/clubs" className="btn btn-ghost -ml-3 mb-4"><ArrowLeft className="h-4 w-4" />All clubs</Link>
      <div className="surface overflow-hidden">
        <img src={cover} alt="" className="aspect-[16/5] min-h-36 w-full object-cover" />
        <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="-mt-10 w-fit rounded-md border-4 border-card bg-card"><ClubLogo club={c} size="lg" /></div>
            <div>
              <h1 className="text-2xl font-bold">{c.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="chip">{c.category}</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{c.members + (isJoined ? 1 : 0)} members</span>
                <span className="flex items-center gap-1.5"><UserRound className="h-4 w-4" />{c.coordinator.name}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => toggleJoin(c.id)} className={cn("btn flex-1 sm:flex-none", isJoined ? "btn-outline text-success" : "btn-primary")}>
              {isJoined ? <><Check className="h-4 w-4" />Joined</> : "Join Club"}
            </button>
            <FollowButton id={c.id} className="btn-outline flex-1 sm:flex-none" />
          </div>
        </div>
        <div className="flex overflow-x-auto border-t px-2 sm:px-4" role="tablist">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={cn("shrink-0 border-b-2 px-4 py-3 text-sm font-medium", tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{t}</button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        {tab === "Overview" && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <section className="surface p-6"><h2 className="font-semibold">About the club</h2><p className="mt-3 leading-relaxed text-muted-foreground">{c.about}</p><p className="mt-3 text-sm text-muted-foreground">Founded {c.founded}</p></section>
              <section className="surface p-6"><h2 className="font-semibold">Activities</h2>
                <ul className="mt-3 space-y-2">{c.activities.map((a) => <li key={a} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{a}</li>)}</ul>
              </section>
            </div>
            <section className="surface h-fit p-6"><h2 className="font-semibold">Coordinator</h2>
              <div className="mt-4 flex items-center gap-3"><Avatar name={c.coordinator.name} /><div><p className="font-medium">{c.coordinator.name}</p><p className="text-sm text-muted-foreground">{c.coordinator.role}</p></div></div>
              <p className="mt-4 flex items-center gap-2 break-all text-sm text-muted-foreground"><Mail className="h-4 w-4 shrink-0" />{c.coordinator.email}</p>
            </section>
          </div>
        )}
        {tab === "Posts" && <div className="mx-auto max-w-2xl space-y-4">{clubPosts.length ? clubPosts.map((p) => <PostCard key={p.id} p={p} />) : <Empty text="No posts from this club yet." />}</div>}
        {tab === "Events" && (clubEvents.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{clubEvents.map((e) => <EventCard key={e.id} e={e} />)}</div> : <Empty text="No upcoming events scheduled." />)}
        {tab === "Achievements" && (clubAch.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{clubAch.map((a) => (
            <article key={a.id} className="surface p-5">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary"><Award className="h-5 w-5" /></div>
              <h3 className="mt-4 font-semibold leading-snug">{a.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" />{a.date}</p>
              <p className="mt-3 text-sm text-muted-foreground">{a.body}</p>
            </article>))}</div>
        ) : <Empty text="Achievements will appear here." />)}
        {tab === "Media" && <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{media.map((m, i) => <img key={i} src={m} alt={`${c.name} media ${i + 1}`} loading="lazy" className="aspect-[4/3] w-full rounded-md border object-cover" />)}</div>}
      </div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="surface p-10 text-center text-sm text-muted-foreground">{text}</p>;
}
