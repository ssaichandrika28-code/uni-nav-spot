import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Building2, GraduationCap, Pencil, Bookmark, Users, IdCard } from "lucide-react";
import { Avatar, ClubLogo } from "@/components/cards";
import { Modal } from "@/components/modal";
import { clubs } from "@/lib/mock-data";
import { pageHead, useStore } from "@/lib/store";

export const Route = createFileRoute("/_shell/profile")({
  head: pageHead("My Profile", "Your CampusHub student profile, followed clubs and saved items."),
  component: ProfilePage,
});

function ProfilePage() {
  const { profile, setProfile, followed, saved, joined } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(profile);
  const myClubs = clubs.filter((c) => followed.has(c.id));
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar name={profile.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <span className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /><span className="truncate">{profile.email}</span></span>
              <span className="flex items-center gap-2"><Building2 className="h-4 w-4 shrink-0" />{profile.department}</span>
              <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4 shrink-0" />{profile.year}</span>
              <span className="flex items-center gap-2"><IdCard className="h-4 w-4 shrink-0" />{profile.roll}</span>
            </div>
          </div>
          <button onClick={() => { setForm(profile); setOpen(true); }} className="btn btn-outline self-start"><Pencil className="h-4 w-4" />Edit Profile</button>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Followed clubs", v: myClubs.length, i: Users }, { l: "Clubs joined", v: joined.size, i: Users }, { l: "Saved items", v: saved.size, i: Bookmark }].map(({ l, v, i: I }) => (
          <div key={l} className="surface p-4 sm:p-5"><I className="h-4 w-4 text-primary" /><p className="mt-3 text-2xl font-bold">{v}</p><p className="text-xs text-muted-foreground sm:text-sm">{l}</p></div>
        ))}
      </div>

      <section className="surface p-6">
        <div className="flex items-center justify-between"><h2 className="font-semibold">Followed clubs</h2><Link to="/clubs" className="text-sm font-medium text-primary hover:underline">Discover more</Link></div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {myClubs.map((c) => (
            <Link key={c.id} to="/clubs/$id" params={{ id: c.id }} className="flex items-center gap-3 rounded-md border p-3 hover:bg-muted">
              <ClubLogo club={c} size="sm" /><div className="min-w-0"><p className="truncate text-sm font-semibold">{c.name}</p><p className="text-xs text-muted-foreground">{c.category}</p></div>
            </Link>
          ))}
        </div>
        <Link to="/saved" className="btn btn-outline mt-5"><Bookmark className="h-4 w-4" />View saved items</Link>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Profile">
        <form onSubmit={(e) => { e.preventDefault(); setProfile(form); setOpen(false); }} className="space-y-4">
          {(["name", "email", "department", "year"] as const).map((k) => (
            <label key={k} className="block space-y-1.5"><span className="text-sm font-medium capitalize">{k}</span>
              <input value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="input-field" /></label>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Save changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
