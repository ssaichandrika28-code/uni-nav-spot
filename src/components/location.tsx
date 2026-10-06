import { MapPin, Layers, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "./modal";

const blocks = ["Main Building", "CSE Block", "ECE Block", "Mechanical Block", "Science Block", "Library Block", "Sports Block", "Near Gate 2"];

export function LocationModal({ open, onClose, name, block, floor, room }: { open: boolean; onClose: () => void; name: string; block: string; floor: string; room?: string }) {
  return (
    <Modal open={open} onClose={onClose} title="Campus Location">
      <div className="space-y-5">
        <div>
          <p className="text-sm text-muted-foreground">Location of</p>
          <p className="font-semibold">{name}</p>
        </div>
        <div className="grid grid-cols-4 gap-2 rounded-md border bg-muted p-3" aria-label="Campus block layout">
          {blocks.map((b) => (
            <div key={b} className={cn("grid aspect-[4/3] place-items-center rounded border bg-card p-1 text-center text-[10px] leading-tight text-muted-foreground", b === block && "border-primary bg-primary text-primary-foreground")}>
              {b === block && <MapPin className="h-4 w-4" />}{b}
            </div>
          ))}
        </div>
        <dl className="grid gap-3 sm:grid-cols-3">
          <Item icon={MapPin} label="Block" value={block} />
          <Item icon={Layers} label="Floor" value={floor} />
          {room && <Item icon={DoorOpen} label="Room" value={room} />}
        </dl>
        <p className="text-xs text-muted-foreground">Simplified campus layout for orientation. Directions: enter via Gate 1, follow signage to {block}.</p>
      </div>
    </Modal>
  );
}

function Item({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="rounded-md border p-3">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  );
}
