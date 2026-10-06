import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageTitle, FilterChips } from "@/components/layout";
import { ClubCard } from "@/components/cards";
import { clubs } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

const cats = ["All", "Technical", "Cultural", "Sports", "Social", "Creative"] as const;

export const Route = createFileRoute("/_shell/clubs/")({
  head: pageHead("Discover Clubs", "Explore technical, cultural, sports, social and creative clubs on campus."),
  component: ClubsPage,
});

function ClubsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = clubs.filter((c) => (cat === "All" || c.category === cat) && (c.name + c.short).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <PageTitle title="Discover Clubs" subtitle={`${clubs.length} student communities to learn, build and belong.`}>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clubs" className="input-field pl-9" />
        </div>
      </PageTitle>
      <FilterChips options={cats} value={cat} onChange={setCat} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => <ClubCard key={c.id} c={c} />)}
      </div>
      {list.length === 0 && <p className="surface mt-6 p-10 text-center text-sm text-muted-foreground">No clubs match your search.</p>}
    </div>
  );
}
