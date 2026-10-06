import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { currentUser } from "./mock-data";

function useSet(initial: string[]) {
  const [set, setSet] = useState(() => new Set(initial));
  const toggle = useCallback((k: string) => {
    setSet((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k); else next.add(k);
      return next;
    });
  }, []);
  return [set, toggle] as const;
}

type Profile = typeof currentUser;
interface Store {
  saved: Set<string>; toggleSave: (k: string) => void;
  followed: Set<string>; toggleFollow: (k: string) => void;
  joined: Set<string>; toggleJoin: (k: string) => void;
  registered: Set<string>; toggleRegister: (k: string) => void;
  liked: Set<string>; toggleLike: (k: string) => void;
  profile: Profile; setProfile: (p: Profile) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, toggleSave] = useSet(["notice:midsem-schedule", "event:ai-seminar", "opportunity:google-step", "post:p3"]);
  const [followed, toggleFollow] = useSet(["coding", "ai-robotics", "photography", "org:Student Council"]);
  const [joined, toggleJoin] = useSet(["coding"]);
  const [registered, toggleRegister] = useSet([]);
  const [liked, toggleLike] = useSet([]);
  const [profile, setProfile] = useState<Profile>(currentUser);
  return (
    <Ctx.Provider value={{ saved, toggleSave, followed, toggleFollow, joined, toggleJoin, registered, toggleRegister, liked, toggleLike, profile, setProfile }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside StoreProvider");
  return s;
}

export const pageHead = (title: string, description: string) => () => ({
  meta: [
    { title: `${title} — CampusHub` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — CampusHub` },
    { property: "og:description", content: description },
  ],
});
