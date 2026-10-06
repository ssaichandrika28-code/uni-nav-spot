import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Search, Compass, Users } from "lucide-react";
import { images } from "@/lib/mock-data";
import { pageHead } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => {
    const h = pageHead("Sign in", "Sign in to CampusHub — your university's faculty, clubs, events and notices in one place.")();
    return { meta: [...h.meta, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const go = (e?: React.FormEvent) => { e?.preventDefault(); navigate({ to: "/home" }); };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={images.campus} alt="University campus" width={1280} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="relative flex h-full flex-col justify-end p-12 text-primary-foreground">
          <p className="text-sm font-medium uppercase tracking-[0.2em] opacity-80">One campus. One place.</p>
          <h2 className="mt-3 max-w-md text-4xl font-bold leading-tight">Everything happening on campus, finally organised.</h2>
          <div className="mt-8 flex gap-6 text-sm">
            {[{ i: Search, t: "Find" }, { i: Compass, t: "Discover" }, { i: Users, t: "Connect" }].map(({ i: I, t }) => (
              <div key={t} className="flex items-center gap-2"><I className="h-4 w-4" />{t}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground"><GraduationCap className="h-5 w-5" /></div>
            <span className="font-display text-xl font-bold">CampusHub</span>
          </div>
          <h1 className="mt-10 text-3xl font-bold">{signup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-muted-foreground">{signup ? "Join your campus community in seconds." : "Sign in with your university email to continue."}</p>
          <form onSubmit={go} className="mt-8 space-y-4">
            {signup && <Field label="Full name"><input className="input-field" placeholder="Sanchita Verma" /></Field>}
            <Field label="University email"><input type="email" className="input-field" placeholder="name@university.edu" defaultValue="sanchita.verma@university.edu" /></Field>
            <Field label="Password"><input type="password" className="input-field" placeholder="••••••••" defaultValue="demopassword" /></Field>
            <button className="btn btn-primary h-11 w-full">{signup ? "Create account" : "Log in"}</button>
            <button type="button" onClick={() => go()} className="btn btn-outline h-11 w-full">Continue with demo account</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {signup ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => setSignup(!signup)} className="font-medium text-primary hover:underline">{signup ? "Log in" : "Sign up"}</button>
          </p>
          <Link to="/admin" className="mt-10 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><ShieldCheck className="h-3.5 w-3.5" />Demo Admin</Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block space-y-1.5"><span className="text-sm font-medium">{label}</span>{children}</label>;
}
