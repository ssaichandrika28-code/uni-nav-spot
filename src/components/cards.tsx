import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, BookmarkCheck, CalendarDays, Clock, MapPin, Users, Heart, MessageCircle, Building2, GraduationCap, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Modal } from "./modal";
import type { CampusEvent, Club, Faculty, Notice, Post, Status } from "@/lib/mock-data";

export function SaveButton({ k, withLabel, className }: { k: string; withLabel?: boolean; className?: string }) {
  const { saved, toggleSave } = useStore();
  const on = saved.has(k);
  const Icon = on ? BookmarkCheck : Bookmark;
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(k); }}
      aria-pressed={on}
      aria-label={on ? "Remove from saved" : "Save"}
      className={cn("btn", withLabel ? "btn-outline" : "btn-ghost h-9 w-9 p-0", on && "text-primary", className)}
    >
      <Icon className={cn("h-4 w-4", on && "fill-primary/15")} />
      {withLabel && (on ? "Saved" : "Save")}
    </button>
  );
}

const statusStyle: Record<Status, string> = {
  Available: "bg-success-soft text-success",
  "In Class": "bg-warning-soft text-warning",
  "In Meeting": "bg-warning-soft text-warning",
  "On Leave": "bg-muted text-muted-foreground",
};
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyle[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />{status}
    </span>
  );
}

export function ClubLogo({ club, size = "md" }: { club: Pick<Club, "icon">; size?: "sm" | "md" | "lg" }) {
  const Icon = club.icon;
  const s = size === "lg" ? "h-20 w-20 [&>svg]:h-9 [&>svg]:w-9" : size === "sm" ? "h-9 w-9 [&>svg]:h-4 [&>svg]:w-4" : "h-12 w-12 [&>svg]:h-5 [&>svg]:w-5";
  return <div className={cn("grid shrink-0 place-items-center rounded-md border bg-primary-soft text-primary", s)}><Icon /></div>;
}

function Meta({ icon: Icon, children }: { icon: typeof Clock; children: React.ReactNode }) {
  return <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4 shrink-0" /><span className="truncate">{children}</span></div>;
}

export function EventCard({ e }: { e: CampusEvent }) {
  return (
    <article className="surface surface-hover flex flex-col overflow-hidden">
      <div className="relative aspect-[16/8] overflow-hidden bg-muted">
        <img src={e.image} alt={e.title} loading="lazy" className="h-full w-full object-cover" />
        <span className="chip absolute left-3 top-3 bg-card">{e.category}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug">{e.title}</h3>
        <div className="space-y-1.5">
          <Meta icon={CalendarDays}>{e.date}</Meta>
          <Meta icon={Clock}>{e.time}</Meta>
          <Meta icon={MapPin}>{e.venue}</Meta>
          <Meta icon={Users}>{e.organizer}</Meta>
        </div>
        <div className="mt-auto flex items-center gap-2 pt-1">
          <Link to="/events/$id" params={{ id: e.id }} className="btn btn-primary flex-1">View Event</Link>
          <SaveButton k={`event:${e.id}`} />
        </div>
      </div>
    </article>
  );
}

export function FollowButton({ id, className }: { id: string; className?: string }) {
  const { followed, toggleFollow } = useStore();
  const on = followed.has(id);
  return (
    <button onClick={(e) => { e.preventDefault(); toggleFollow(id); }} className={cn("btn", on ? "btn-outline text-primary" : "btn-primary", className)}>
      {on ? "Following" : "Follow"}
    </button>
  );
}

export function ClubCard({ c }: { c: Club }) {
  return (
    <article className="surface surface-hover flex flex-col gap-4 p-5">
      <div className="flex items-start gap-3">
        <ClubLogo club={c} />
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{c.name}</h3>
          <span className="chip mt-1">{c.category}</span>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">{c.short}</p>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground"><Users className="h-4 w-4" />{c.members} members</div>
      <div className="mt-auto flex gap-2">
        <FollowButton id={c.id} className="flex-1" />
        <Link to="/clubs/$id" params={{ id: c.id }} className="btn btn-outline flex-1">View Club</Link>
      </div>
    </article>
  );
}

export function NoticeCard({ n, onOpen }: { n: Notice; onOpen?: () => void }) {
  return (
    <article className="surface surface-hover flex items-start gap-3 p-4">
      <button onClick={onOpen} className="min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip bg-primary-soft text-primary">{n.category}</span>
          <span className="text-xs text-muted-foreground">{n.date}</span>
        </div>
        <h3 className="mt-2 text-sm font-semibold leading-snug">{n.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{n.issuer}</p>
      </button>
      <SaveButton k={`notice:${n.id}`} />
    </article>
  );
}

export function FacultyCard({ f }: { f: Faculty }) {
  return (
    <Link to="/faculty/$id" params={{ id: f.id }} className="surface surface-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <Avatar name={f.name} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{f.name}</h3>
            <StatusBadge status={f.status} />
          </div>
          <p className="text-sm text-muted-foreground">{f.designation} · {f.department}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <Meta icon={Building2}>Room {f.room}</Meta>
            <Meta icon={Clock}>Office Hours: {f.officeHours}</Meta>
          </div>
        </div>
      </div>
      <span className="btn btn-outline shrink-0">View Profile</span>
    </Link>
  );
}

export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name.replace(/^(Dr\.|Prof\.|Mr\.)\s*/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  const s = size === "lg" ? "h-24 w-24 text-2xl" : size === "sm" ? "h-8 w-8 text-xs" : "h-12 w-12 text-sm";
  return <div className={cn("grid shrink-0 place-items-center rounded-full bg-primary-soft font-display font-semibold text-primary", s)}>{initials}</div>;
}

export function PostCard({ p }: { p: Post }) {
  const { liked, toggleLike } = useStore();
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(p.comments);
  const [draft, setDraft] = useState("");
  const isLiked = liked.has(p.id);
  const Icon = p.icon ?? GraduationCap;
  const followId = p.clubId ?? `org:${p.author}`;
  return (
    <article className="surface overflow-hidden">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border bg-primary-soft text-primary"><Icon className="h-5 w-5" /></div>
          <div className="min-w-0">
            {p.clubId ? (
              <Link to="/clubs/$id" params={{ id: p.clubId }} className="block truncate text-sm font-semibold hover:underline">{p.author}</Link>
            ) : <p className="truncate text-sm font-semibold">{p.author}</p>}
            <p className="text-xs text-muted-foreground">{p.authorType} · {p.time} · {p.kind}</p>
          </div>
        </div>
        <FollowButton id={followId} className="h-8 px-3 text-xs" />
      </header>
      <p className="px-4 pb-3 text-[0.94rem] leading-relaxed">{p.text}</p>
      {p.image && <img src={p.image} alt="" loading="lazy" className="aspect-[16/8] w-full object-cover" />}
      <footer className="flex items-center gap-1 border-t px-2 py-1.5">
        <button onClick={() => toggleLike(p.id)} className={cn("btn btn-ghost h-9 px-3", isLiked && "text-primary")} aria-pressed={isLiked}>
          <Heart className={cn("h-4 w-4", isLiked && "fill-primary")} />{p.likes + (isLiked ? 1 : 0)}
        </button>
        <button onClick={() => setOpen(true)} className="btn btn-ghost h-9 px-3"><MessageCircle className="h-4 w-4" />{comments.length}</button>
        <div className="ml-auto"><SaveButton k={`post:${p.id}`} /></div>
      </footer>
      <Modal open={open} onClose={() => setOpen(false)} title="Comments">
        <div className="space-y-4">
          {comments.length === 0 && <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment.</p>}
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3"><Avatar name={c.name} size="sm" /><div className="rounded-md bg-muted px-3 py-2 text-sm"><p className="font-medium">{c.name}</p><p>{c.text}</p></div></div>
          ))}
          <form onSubmit={(e) => { e.preventDefault(); if (!draft.trim()) return; setComments([...comments, { name: "Sanchita Verma", text: draft }]); setDraft(""); }} className="flex gap-2 pt-2">
            <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a comment…" className="input-field h-10" />
            <button className="btn btn-primary h-10 w-10 shrink-0 p-0" aria-label="Post comment"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      </Modal>
    </article>
  );
}

export function SectionHeader({ title, to, action }: { title: string; to?: "/events" | "/clubs" | "/feed" | "/search" | "/saved"; action?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {to && <Link to={to} className="text-sm font-medium text-primary hover:underline">{action ?? "View all"}</Link>}
    </div>
  );
}
