import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { PageTitle, FilterChips } from "@/components/layout";
import { EventCard, SaveButton } from "@/components/cards";
import { events } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

const cats = ["All", "Workshop", "Hackathon", "Competition", "Seminar", "Club Event"] as const;

export const Route = createFileRoute("/_shell/events/")({
  head: pageHead("Campus Events", "Workshops, hackathons, competitions, seminars and club events happening on campus."),
  component: EventsPage,
});

function EventsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const featured = events[0]!;
  const list = events.filter((e) => (cat === "All" || e.category === cat) && (e.title + e.organizer + e.short).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageTitle title="Campus Events" subtitle="Never miss what's happening across campus.">
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events" className="input-field pl-9" />
        </div>
      </PageTitle>

      <article className="surface mb-8 grid overflow-hidden md:grid-cols-2">
        <img src={featured.image} alt={featured.title} className="aspect-[16/9] h-full w-full object-cover md:aspect-auto" />
        <div className="flex flex-col gap-4 p-6 lg:p-8">
          <span className="chip w-fit bg-primary-soft text-primary">Featured · {featured.category}</span>
          <h2 className="text-2xl font-bold">{featured.title}</h2>
          <p className="text-muted-foreground">{featured.short}</p>
          <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{featured.date}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{featured.time}</span>
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{featured.venue}</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" />{featured.organizer}</span>
          </div>
          <div className="mt-auto flex gap-2">
            <Link to="/events/$id" params={{ id: featured.id }} className="btn btn-primary">View Event</Link>
            <SaveButton k={`event:${featured.id}`} withLabel />
          </div>
        </div>
      </article>

      <FilterChips options={cats} value={cat} onChange={setCat} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => <EventCard key={e.id} e={e} />)}
      </div>
      {list.length === 0 && <p className="surface mt-6 p-10 text-center text-sm text-muted-foreground">No events match your search.</p>}
    </div>
  );
}
