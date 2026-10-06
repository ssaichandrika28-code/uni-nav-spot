import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, CalendarDays, ClipboardCheck, LayoutDashboard, ArrowLeft, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminUsers, clubs, events, faculty, notices, pendingPosts, places } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: pageHead("Admin Dashboard", "Demo admin dashboard for managing CampusHub users, clubs, events and approvals."),
  component: Admin,
});

const sections = ["Dashboard", "Users", "Clubs", "Faculty", "Locations", "Events", "Notices", "Posts", "Approvals"] as const;
type Sec = (typeof sections)[number];

function Admin() {
  const [sec, setSec] = useState<Sec>("Dashboard");
  const [decisions, setDecisions] = useState<Record<string, "Approved" | "Rejected">>({});
  const pending = pendingPosts.filter((p) => !decisions[p.id]).length;

  const tables: Partial<Record<Sec, { head: string[]; rows: string[][] }>> = {
    Users: { head: ["Name", "Email", "Dept", "Year", "Status"], rows: adminUsers.map((u) => [u.name, u.email, u.dept, u.year, u.status]) },
    Clubs: { head: ["Club", "Category", "Members", "Coordinator"], rows: clubs.map((c) => [c.name, c.category, String(c.members), c.coordinator.name]) },
    Faculty: { head: ["Name", "Department", "Room", "Status"], rows: faculty.map((f) => [f.name, f.department, f.room, f.status]) },
    Locations: { head: ["Name", "Type", "Block", "Floor"], rows: places.map((p) => [p.name, p.type, p.block, p.floor]) },
    Events: { head: ["Event", "Category", "Date", "Venue"], rows: events.map((e) => [e.title, e.category, e.date, e.venue]) },
    Notices: { head: ["Notice", "Category", "Date"], rows: notices.map((n) => [n.title, n.category, n.date]) },
    Posts: { head: ["Post", "Author", "Status"], rows: pendingPosts.map((p) => [p.title, p.author, decisions[p.id] ?? "Pending"]) },
  };

  const approvals = (
    <div className="surface divide-y">
      {pendingPosts.map((p) => (
        <div key={p.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{p.title}</p><p className="text-xs text-muted-foreground">{p.author} · {p.submitted}</p></div>
          {decisions[p.id] ? <span className="chip">{decisions[p.id]}</span> : (
            <div className="flex gap-2">
              <button onClick={() => setDecisions({ ...decisions, [p.id]: "Approved" })} className="btn btn-primary h-9"><Check className="h-4 w-4" />Approve</button>
              <button onClick={() => setDecisions({ ...decisions, [p.id]: "Rejected" })} className="btn btn-outline h-9"><X className="h-4 w-4" />Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const t = tables[sec];
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b bg-sidebar md:w-56 md:border-b-0 md:border-r">
        <div className="flex h-16 items-center justify-between px-4"><span className="font-display font-bold">CampusHub Admin</span>
          <Link to="/home" className="btn btn-ghost h-8 px-2 text-xs"><ArrowLeft className="h-3.5 w-3.5" />App</Link></div>
        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col">
          {sections.map((s) => (
            <button key={s} onClick={() => setSec(s)} className={cn("h-9 shrink-0 rounded-md px-3 text-left text-sm font-medium", sec === s ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-muted")}>{s}</button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Frontend demo only</p>
        <h1 className="mb-6 text-2xl font-bold">{sec}</h1>
        {sec === "Dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[{ l: "Total Students", v: "8,412", i: Users }, { l: "Total Clubs", v: clubs.length, i: LayoutDashboard }, { l: "Upcoming Events", v: events.length, i: CalendarDays }, { l: "Pending Approvals", v: pending, i: ClipboardCheck }].map(({ l, v, i: I }) => (
                <div key={l} className="surface p-5"><I className="h-4 w-4 text-primary" /><p className="mt-3 text-2xl font-bold">{v}</p><p className="text-sm text-muted-foreground">{l}</p></div>
              ))}
            </div>
            <h2 className="font-semibold">Pending post approvals</h2>
            {approvals}
          </div>
        )}
        {sec === "Approvals" && approvals}
        {t && (
          <div className="surface overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase text-muted-foreground"><tr>{t.head.map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y">{t.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className="whitespace-nowrap px-4 py-3">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
