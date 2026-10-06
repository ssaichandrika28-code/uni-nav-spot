import { useState } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Building2, Clock, Mail, Phone, MapPin, Info } from "lucide-react";
import { Avatar, StatusBadge } from "@/components/cards";
import { LocationModal } from "@/components/location";
import { faculty } from "@/lib/mock-data";

export const Route = createFileRoute("/_shell/faculty/$id")({
  loader: ({ params }) => {
    const f = faculty.find((x) => x.id === params.id);
    if (!f) throw notFound();
    return f;
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.name} — CampusHub` : "Faculty not found — CampusHub";
    const d = loaderData ? `${loaderData.designation}, ${loaderData.department}. Room ${loaderData.room}.` : "Faculty profile";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => <div className="surface p-10 text-center"><p className="font-semibold">Faculty member not found</p><Link to="/search" className="btn btn-primary mt-4">Back to search</Link></div>,
  component: FacultyProfile,
});

function FacultyProfile() {
  const f = Route.useLoaderData();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto max-w-4xl">
      <button onClick={() => router.history.back()} className="btn btn-ghost -ml-3 mb-4"><ArrowLeft className="h-4 w-4" />Back</button>
      <div className="surface overflow-hidden">
        <div className="h-24 border-b bg-primary-soft" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="rounded-full border-4 border-card"><Avatar name={f.name} size="lg" /></div>
            <button onClick={() => setOpen(true)} className="btn btn-primary"><MapPin className="h-4 w-4" />View Campus Location</button>
          </div>
          <h1 className="mt-4 text-2xl font-bold">{f.name}</h1>
          <p className="text-muted-foreground">{f.designation} · {f.department}</p>
          <div className="mt-3 flex flex-wrap gap-2">{f.expertise.map((e) => <span key={e} className="chip">{e}</span>)}</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="surface p-6">
          <h2 className="font-semibold">Availability</h2>
          <div className="mt-4 flex items-center gap-3"><StatusBadge status={f.status} /><span className="text-sm text-muted-foreground">Last updated {f.updated}</span></div>
          <div className="mt-4 flex gap-2 rounded-md bg-muted p-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" /><span><strong className="font-medium text-foreground">Manually updated status.</strong> Set by the faculty member or department office; it may not reflect real-time availability.</span>
          </div>
        </section>
        <section className="surface p-6">
          <h2 className="font-semibold">Office & Contact</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Item icon={Building2} label="Room" value={`${f.room} · ${f.block}, ${f.floor}`} />
            <Item icon={Clock} label="Office hours" value={`Mon – Fri, ${f.officeHours}`} />
            <Item icon={Mail} label="Email" value={f.email} />
            <Item icon={Phone} label="Phone" value={f.phone} />
          </dl>
        </section>
      </div>
      <LocationModal open={open} onClose={() => setOpen(false)} name={`${f.name}'s cabin`} block={f.block} floor={f.floor} room={f.room} />
    </div>
  );
}

function Item({ icon: I, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return <div className="flex gap-3"><I className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" /><div className="min-w-0"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="break-words font-medium">{value}</dd></div></div>;
}
