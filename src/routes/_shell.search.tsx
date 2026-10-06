import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal, Building2, Users, CalendarDays, Briefcase, ChevronRight, SearchX } from "lucide-react";
import { SearchBar, FilterChips } from "@/components/layout";
import { FacultyCard, NoticeCard, SaveButton, ClubLogo } from "@/components/cards";
import { Modal } from "@/components/modal";
import { LocationModal } from "@/components/location";
import { clubs, events, faculty, notices, opportunities, places, type Notice, type Opportunity, type Place } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

const cats = ["All", "Faculty", "Rooms", "Clubs", "Events", "Notices", "Facilities", "Opportunities"] as const;
type Cat = (typeof cats)[number];

export const Route = createFileRoute("/_shell/search")({
  validateSearch: (s: Record<string, unknown>): { q?: string; cat?: string } => ({
    q: typeof s.q === "string" ? s.q : undefined,
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  head: pageHead("Search", "Search faculty, rooms, clubs, events, notices, facilities and opportunities across campus."),
  component: SearchPage,
});

const match = (q: string, ...fields: string[]) => {
  const words = q.toLowerCase().replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  const hay = fields.join(" ").toLowerCase();
  return words.every((w) => hay.includes(w));
};

function SearchPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Cat>((cats as readonly string[]).includes(search.cat ?? "") ? (search.cat as Cat) : "All");
  const [showFilters, setShowFilters] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);
  useEffect(() => { if (search.cat && (cats as readonly string[]).includes(search.cat)) setCat(search.cat as Cat); }, [search.cat]);

  const r = useMemo(() => ({
    Faculty: faculty.filter((f) => match(q, f.name, f.department, f.room, ...f.expertise) && (!availableOnly || f.status === "Available")),
    Rooms: places.filter((p) => p.type === "Room" && match(q, p.name, p.block, p.detail)),
    Clubs: clubs.filter((c) => match(q, c.name, c.category, c.short)),
    Events: events.filter((e) => match(q, e.title, e.category, e.organizer, e.venue)),
    Notices: notices.filter((n) => match(q, n.title, n.category, n.issuer, n.body)),
    Facilities: places.filter((p) => p.type === "Facility" && match(q, p.name, p.block, p.detail)),
    Opportunities: opportunities.filter((o) => match(q, o.title, o.org, o.type, o.body)),
  }), [q, availableOnly]);

  const show = (c: Exclude<Cat, "All">) => (cat === "All" || cat === c) && r[c].length > 0;
  const total = (Object.keys(r) as (keyof typeof r)[]).reduce((n, k) => n + (cat === "All" || cat === k ? r[k].length : 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">Search campus</h1>
      <p className="mt-1 text-muted-foreground">One search for faculty, rooms, clubs, events, notices and more.</p>
      <div className="mt-6 flex gap-2">
        <div className="flex-1"><SearchBar large initial={q} onSearch={setQ} autoFocus /></div>
        <button onClick={() => setShowFilters(!showFilters)} className="btn btn-outline h-14 px-4" aria-expanded={showFilters}>
          <SlidersHorizontal className="h-4 w-4" /><span className="hidden sm:inline">Filters</span>
        </button>
      </div>
      {showFilters && (
        <div className="surface mt-3 flex flex-wrap items-center gap-4 p-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="h-4 w-4 accent-primary" />Show only available faculty</label>
          <button onClick={() => { setQ(""); setCat("All"); setAvailableOnly(false); }} className="text-primary hover:underline">Reset all</button>
        </div>
      )}
      <div className="mt-5"><FilterChips options={cats} value={cat} onChange={setCat} /></div>
      <p className="mt-5 text-sm text-muted-foreground">{total} result{total === 1 ? "" : "s"}{q && <> for "<span className="font-medium text-foreground">{q}</span>"</>}</p>

      <div className="mt-4 space-y-8">
        {total === 0 && (
          <div className="surface flex flex-col items-center gap-2 p-12 text-center">
            <SearchX className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">No results found</p>
            <p className="text-sm text-muted-foreground">Try "Dr. Sharma", "Scholarship" or "Library".</p>
          </div>
        )}
        {show("Faculty") && <Group title="Faculty">{r.Faculty.map((f) => <FacultyCard key={f.id} f={f} />)}</Group>}
        {show("Rooms") && <Group title="Rooms">{r.Rooms.map((p) => <PlaceRow key={p.id} p={p} onOpen={() => setPlace(p)} />)}</Group>}
        {show("Clubs") && <Group title="Clubs">{r.Clubs.map((c) => (
          <Link key={c.id} to="/clubs/$id" params={{ id: c.id }} className="surface surface-hover flex items-center gap-3 p-4">
            <ClubLogo club={c} size="sm" /><Row title={c.name} sub={`${c.category} · ${c.members} members`} />
          </Link>))}</Group>}
        {show("Events") && <Group title="Events">{r.Events.map((e) => (
          <Link key={e.id} to="/events/$id" params={{ id: e.id }} className="surface surface-hover flex items-center gap-3 p-4">
            <Icon i={CalendarDays} /><Row title={e.title} sub={`${e.date} · ${e.venue}`} />
          </Link>))}</Group>}
        {show("Notices") && <Group title="Notices">{r.Notices.map((n) => <NoticeCard key={n.id} n={n} onOpen={() => setNotice(n)} />)}</Group>}
        {show("Facilities") && <Group title="Facilities">{r.Facilities.map((p) => <PlaceRow key={p.id} p={p} onOpen={() => setPlace(p)} />)}</Group>}
        {show("Opportunities") && <Group title="Opportunities">{r.Opportunities.map((o) => (
          <div key={o.id} className="surface surface-hover flex items-center gap-3 p-4">
            <button onClick={() => setOpp(o)} className="flex min-w-0 flex-1 items-center gap-3 text-left"><Icon i={Briefcase} /><Row title={o.title} sub={`${o.org} · ${o.type} · Deadline ${o.deadline}`} /></button>
            <SaveButton k={`opportunity:${o.id}`} />
          </div>))}</Group>}
      </div>

      <Modal open={!!notice} onClose={() => setNotice(null)} title="Notice">
        {notice && <div className="space-y-3">
          <span className="chip bg-primary-soft text-primary">{notice.category}</span>
          <h3 className="text-lg font-semibold">{notice.title}</h3>
          <p className="text-sm text-muted-foreground">{notice.issuer} · {notice.date}</p>
          <p className="text-sm leading-relaxed">{notice.body}</p>
          <SaveButton k={`notice:${notice.id}`} withLabel />
        </div>}
      </Modal>
      <Modal open={!!opp} onClose={() => setOpp(null)} title="Opportunity">
        {opp && <div className="space-y-3">
          <span className="chip bg-primary-soft text-primary">{opp.type}</span>
          <h3 className="text-lg font-semibold">{opp.title}</h3>
          <p className="text-sm text-muted-foreground">{opp.org} · Apply by {opp.deadline}</p>
          <p className="text-sm leading-relaxed">{opp.body}</p>
          <SaveButton k={`opportunity:${opp.id}`} withLabel />
        </div>}
      </Modal>
      {place && <LocationModal open onClose={() => setPlace(null)} name={place.name} block={place.block} floor={place.floor} />}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2><div className="space-y-3">{children}</div></section>;
}
function Icon({ i: I }: { i: typeof Users }) {
  return <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md border bg-primary-soft text-primary"><I className="h-4 w-4" /></div>;
}
function Row({ title, sub }: { title: string; sub: string }) {
  return <><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="truncate text-xs text-muted-foreground">{sub}</p></div><ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" /></>;
}
function PlaceRow({ p, onOpen }: { p: Place; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="surface surface-hover flex w-full items-center gap-3 p-4 text-left">
      <Icon i={Building2} /><Row title={p.name} sub={`${p.block} · ${p.floor} · ${p.hours ?? p.detail}`} />
    </button>
  );
}
