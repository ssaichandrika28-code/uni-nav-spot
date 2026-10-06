import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Trash2, FileText, CalendarDays, Briefcase, Newspaper } from "lucide-react";
import { PageTitle, FilterChips } from "@/components/layout";
import { resolveSaved, type SavedType } from "@/lib/mock-data";
import { pageHead, useStore } from "@/lib/store";

const tabs = ["All", "Notices", "Events", "Opportunities", "Posts"] as const;
const map: Record<(typeof tabs)[number], SavedType | null> = { All: null, Notices: "notice", Events: "event", Opportunities: "opportunity", Posts: "post" };
const icons = { notice: FileText, event: CalendarDays, opportunity: Briefcase, post: Newspaper };

export const Route = createFileRoute("/_shell/saved")({
  head: pageHead("Saved", "Your saved notices, events, opportunities and posts."),
  component: SavedPage,
});

function SavedPage() {
  const { saved, toggleSave } = useStore();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const items = [...saved].map(resolveSaved).filter((x): x is NonNullable<typeof x> => !!x).filter((x) => !map[tab] || x.type === map[tab]);
  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle title="Saved" subtitle={`${saved.size} item${saved.size === 1 ? "" : "s"} saved for later.`} />
      <FilterChips options={tabs} value={tab} onChange={setTab} />
      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <div className="surface flex flex-col items-center gap-2 p-12 text-center">
            <Bookmark className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">Nothing saved here yet</p>
            <p className="text-sm text-muted-foreground">Tap the bookmark icon on notices, events or posts.</p>
            <Link to="/search" className="btn btn-primary mt-2">Explore campus</Link>
          </div>
        )}
        {items.map((it) => {
          const I = icons[it.type];
          const body = (
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><I className="h-4 w-4" /></div>
              <div className="min-w-0"><p className="truncate text-sm font-semibold">{it.title}</p><p className="text-xs text-muted-foreground">{it.category} · {it.date}</p></div>
            </div>
          );
          return (
            <div key={it.key} className="surface flex items-center gap-3 p-4">
              {"link" in it && it.link ? <Link to="/events/$id" params={{ id: it.link }} className="flex min-w-0 flex-1">{body}</Link> : body}
              <button onClick={() => toggleSave(it.key)} className="btn btn-ghost shrink-0 px-3 text-xs" aria-label="Remove from saved"><Trash2 className="h-4 w-4" /><span className="hidden sm:inline">Remove</span></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
