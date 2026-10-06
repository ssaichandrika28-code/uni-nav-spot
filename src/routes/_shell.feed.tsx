import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, FilterChips } from "@/components/layout";
import { PostCard, ClubLogo, FollowButton } from "@/components/cards";
import { clubs, posts } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

const cats = ["All", "University", "Club", "Organization"] as const;

export const Route = createFileRoute("/_shell/feed")({
  head: pageHead("Campus Feed", "Achievements, announcements and activities from the university, clubs and student organisations."),
  component: FeedPage,
});

function FeedPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = posts.filter((p) => cat === "All" || p.authorType === cat);
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="mx-auto w-full max-w-2xl">
        <PageTitle title="Campus Feed" subtitle="Updates from across your university." />
        <FilterChips options={cats} value={cat} onChange={setCat} />
        <div className="mt-6 space-y-5">{list.map((p) => <PostCard key={p.id} p={p} />)}</div>
      </div>
      <aside className="hidden lg:block">
        <div className="surface sticky top-24 p-5">
          <h2 className="font-semibold">Suggested clubs</h2>
          <div className="mt-4 space-y-4">
            {clubs.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <ClubLogo club={c} size="sm" />
                <Link to="/clubs/$id" params={{ id: c.id }} className="min-w-0 flex-1 truncate text-sm font-medium hover:underline">{c.name}</Link>
                <FollowButton id={c.id} className="h-8 px-3 text-xs" />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
