import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users, CheckCircle2, Ticket } from "lucide-react";
import { SaveButton } from "@/components/cards";
import { events } from "@/lib/mock-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/events/$id")({
  loader: ({ params }) => {
    const e = events.find((x) => x.id === params.id);
    if (!e) throw notFound();
    return { id: e.id, title: e.title, short: e.short };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.title} — CampusHub` : "Event not found — CampusHub";
    const d = loaderData?.short ?? "Campus event";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => <div className="surface p-10 text-center"><p className="font-semibold">Event not found</p><Link to="/events" className="btn btn-primary mt-4">All events</Link></div>,
  component: EventDetail,
});

function EventDetail() {
  const { id } = Route.useLoaderData();
  const e = events.find((x) => x.id === id)!;
  const { registered, toggleRegister } = useStore();
  const done = registered.has(e.id);
  return (
    <div className="mx-auto max-w-5xl">
      <Link to="/events" className="btn btn-ghost -ml-3 mb-4"><ArrowLeft className="h-4 w-4" />All events</Link>
      <img src={e.image} alt={e.title} className="aspect-[16/6] min-h-44 w-full rounded-lg border object-cover" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <span className="chip bg-primary-soft text-primary">{e.category}</span>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">{e.title}</h1>
          <p className="mt-1 text-muted-foreground">Organised by {e.clubId ? <Link to="/clubs/$id" params={{ id: e.clubId }} className="font-medium text-primary hover:underline">{e.organizer}</Link> : e.organizer}</p>
          <h2 className="mt-8 font-semibold">About this event</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{e.description}</p>
        </div>
        <aside className="surface h-fit space-y-4 p-5">
          {[{ i: CalendarDays, v: e.date }, { i: Clock, v: e.time }, { i: MapPin, v: e.venue }, { i: Users, v: e.organizer }, { i: Ticket, v: `${e.seats} seats` }].map(({ i: I, v }) => (
            <p key={v} className="flex items-center gap-3 text-sm"><I className="h-4 w-4 text-muted-foreground" />{v}</p>
          ))}
          {done ? (
            <div className="flex items-center gap-2 rounded-md bg-success-soft p-3 text-sm font-medium text-success"><CheckCircle2 className="h-4 w-4" />Registration saved</div>
          ) : (
            <button onClick={() => toggleRegister(e.id)} className="btn btn-primary w-full">Register now</button>
          )}
          {done && <button onClick={() => toggleRegister(e.id)} className="w-full text-center text-xs text-muted-foreground hover:underline">Cancel registration</button>}
          <SaveButton k={`event:${e.id}`} withLabel className="w-full" />
        </aside>
      </div>
    </div>
  );
}
