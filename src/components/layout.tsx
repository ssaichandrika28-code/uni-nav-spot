import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Home, Search, Users, CalendarDays, Newspaper, Bookmark, UserRound, Bell, PanelLeftClose, PanelLeftOpen, ShieldCheck, LogOut, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { notifications } from "@/lib/mock-data";
import { Avatar } from "./cards";

const nav = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/clubs", label: "Clubs", icon: Users },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/feed", label: "Feed", icon: Newspaper },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/home" className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><GraduationCap className="h-5 w-5" /></div>
      {!compact && <span className="font-display text-lg font-bold tracking-tight">CampusHub</span>}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => { if (window.innerWidth < 1024) setCollapsed(true); }, []);
  return (
    <aside className={cn("sticky top-0 hidden h-screen shrink-0 flex-col border-r bg-sidebar transition-[width] md:flex", collapsed ? "w-[76px]" : "w-60")}>
      <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
        <Logo compact={collapsed} />
        {!collapsed && <button onClick={() => setCollapsed(true)} className="btn btn-ghost h-8 w-8 p-0" aria-label="Collapse sidebar"><PanelLeftClose className="h-4 w-4" /></button>}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {collapsed && <button onClick={() => setCollapsed(false)} className="btn btn-ghost mb-2 h-10 w-full p-0" aria-label="Expand sidebar"><PanelLeftOpen className="h-4 w-4" /></button>}
        {nav.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} title={label}
            className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium text-sidebar-foreground hover:bg-muted", collapsed && "justify-center px-0")}
            activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent" }}>
            <Icon className="h-[18px] w-[18px] shrink-0" />{!collapsed && label}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t p-3">
        <Link to="/admin" title="Demo Admin" className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted", collapsed && "justify-center px-0")}>
          <ShieldCheck className="h-[18px] w-[18px] shrink-0" />{!collapsed && "Demo Admin"}
        </Link>
        <Link to="/login" title="Log out" className={cn("flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground hover:bg-muted", collapsed && "justify-center px-0")}>
          <LogOut className="h-[18px] w-[18px] shrink-0" />{!collapsed && "Log out"}
        </Link>
      </div>
    </aside>
  );
}

export function MobileNavigation() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-7 border-t bg-card md:hidden">
      {nav.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className="flex flex-col items-center gap-1 py-2 text-[10px] font-medium text-muted-foreground"
          activeProps={{ className: "text-primary" }}>
          <Icon className="h-5 w-5" />{label}
        </Link>
      ))}
    </nav>
  );
}

export function SearchBar({ large, initial = "", onSearch, autoFocus }: { large?: boolean; initial?: string; onSearch?: (q: string) => void; autoFocus?: boolean }) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();
  useEffect(() => setQ(initial), [initial]);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(q); else navigate({ to: "/search", search: { q } });
  };
  return (
    <form onSubmit={submit} className="relative w-full" role="search">
      <Search className={cn("pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground", large ? "h-5 w-5" : "h-4 w-4")} />
      <input value={q} autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value); }}
        placeholder="Search faculty, clubs, rooms, events..."
        className={cn("input-field", large ? "h-14 pl-11 text-base shadow-sm" : "h-10 bg-muted pl-10")} />
    </form>
  );
}

export function Header() {
  const { profile } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur sm:px-6">
      <div className="md:hidden"><Logo compact /></div>
      <div className="min-w-0 max-w-xl flex-1"><SearchBar /></div>
      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <div className="relative">
          <button onClick={() => setOpen(!open)} className="btn btn-ghost relative h-10 w-10 p-0" aria-label="Notifications">
            <Bell className="h-5 w-5" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>
          {open && (
            <div className="surface absolute right-0 top-12 w-80 max-w-[calc(100vw-2rem)] p-2 shadow-lg">
              <p className="px-3 py-2 text-sm font-semibold">Notifications</p>
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 rounded-md px-3 py-2.5 hover:bg-muted">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div><p className="text-sm">{n.text}</p><p className="text-xs text-muted-foreground">{n.time} ago</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Link to="/profile" className="flex items-center gap-2 rounded-md p-1 hover:bg-muted" aria-label="Profile">
          <Avatar name={profile.name} size="sm" />
          <span className="hidden text-sm font-medium lg:block">{profile.name}</span>
        </Link>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 lg:px-8 lg:pt-8">{children}</main>
      </div>
      <MobileNavigation />
    </div>
  );
}

export function PageTitle({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>{subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}</div>
      {children}
    </div>
  );
}

export function FilterChips<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={cn("h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors", value === o ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground")}>
          {o}
        </button>
      ))}
    </div>
  );
}
