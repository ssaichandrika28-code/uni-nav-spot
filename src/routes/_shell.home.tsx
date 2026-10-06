import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Building2, Users, CalendarDays, ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/layout";
import { EventCard, NoticeCard, ClubLogo, SectionHeader } from "@/components/cards";
import { clubs, events, highlights, notices } from "@/lib/mock-data";
import { pageHead, useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/home")({
  head: pageHead("Home", "Your campus dashboard: upcoming events, important notices and followed clubs."),
  component: HomePage,
});

const quick = [
  { label: "Find Faculty", desc: "Cabins & office hours", icon: GraduationCap, to: "/search" as const, cat: "Faculty" },
  { label: "Campus Directory", desc: "Rooms & facilities", icon: Building2, to: "/search" as const, cat: "Rooms" },
  { label: "Clubs", desc: "Discover communities", icon: Users, to: "/clubs" as const },
  { label: "Events", desc: "What's happening", icon: CalendarDays, to: "/events" as const },
];

function HomePage() {
  const { profile, followed } = useStore();
  const [greet, setGreet] = useState("Good morning");
  useEffect(() => { const h = new Date().getHours(); setGreet(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"); }, []);
  const homeNotices = [notices[0], notices[1], notices[2]];
  const myClubs = clubs.filter((c) => followed.has(c.id)).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="surface relative overflow-hidden p-6 sm:p-10">
        <p className="text-sm font-medium text-primary">Riverdale University</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{greet}, {profile.name.split(" ")[0]}</h1>
        <p className="mt-2 text-muted-foreground">Stay connected with everything happening on campus.</p>
        <div className="mt-6 max-w-2xl"><SearchBar large /></div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>Try:</span>
          {["Dr. Sharma", "Scholarship", "Library", "Hackathon"].map((t) => (
            <Link key={t} to="/search" search={{ q: t }} className="chip hover:bg-accent">{t}</Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Quick Access" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {quick.map(({ label, desc, icon: Icon, to, cat }) => (
            <Link key={label} to={to} search={cat ? { cat } : undefined} className="surface surface-hover group flex flex-col gap-4 p-4 sm:p-5">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="h-5 w-5" /></div>
              <div><p className="font-semibold">{label}</p><p className="text-sm text-muted-foreground">{desc}</p></div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Upcoming Events" to="/events" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => <EventCard key={e.id} e={e} />)}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section>
          <SectionHeader title="Important Notices" to="/search" action="All notices" />
          <div className="space-y-3">{homeNotices.map((n) => <NoticeCard key={n.id} n={n} />)}</div>
        </section>
        <section>
          <SectionHeader title="Followed Clubs" to="/clubs" />
          <div className="surface divide-y">
            {myClubs.length === 0 && <p className="p-4 text-sm text-muted-foreground">You aren't following any clubs yet.</p>}
            {myClubs.map((c) => (
              <Link key={c.id} to="/clubs/$id" params={{ id: c.id }} className="flex items-center gap-3 p-4 hover:bg-muted">
                <ClubLogo club={c} size="sm" />
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{c.name}</p><p className="text-xs text-muted-foreground">{c.category}</p></div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionHeader title="Campus Highlights" to="/feed" action="Open feed" />
        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((h) => (
            <Link key={h.title} to="/feed" className="surface surface-hover flex overflow-hidden">
              <img src={h.image} alt="" loading="lazy" className="w-32 shrink-0 object-cover sm:w-40" />
              <div className="p-4"><span className="chip bg-primary-soft text-primary">{h.tag}</span><p className="mt-2 font-semibold leading-snug">{h.title}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
