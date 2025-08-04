// app/admin/page.tsx

import { Box, Settings, Lock, Sparkles, Search } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Box className="h-4 w-4" />}
        title="Εγγραφή στην εφαρμογή"
        description="Προσθέστε τα προσωπικά σας στοιχεία για να ξεκινήσετε."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Settings className="h-4 w-4" />}
        title="Προσθήκη Ψηφοφορίας"
        description="Προσθέστε την ψηφοφορία που θέλετε να δημιουργήσετε."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Lock className="h-4 w-4" />}
        title="Προσθήκη υποψηφίων"
        description="Διαλέξετε την ψηφοφορία που σας ενδιαφέρει και προσθέστε τους υποψηφίους."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" />}
        title="Χρονοδιάγραμμα ψηφοφορίας"
        description="Δείτε τις ενεργές ψηφοφορίες και το χρονοδιάγραμμά τους."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Search className="h-4 w-4" />}
        title="Ηλεκτρονική ψηφοφορία"
        description="Περιηγηθείτε στην αρχική σελίδα για να συμμετέχετε στις ψηφοφορίες που αφορούν το προφίλ σας."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-card text-card-foreground p-6 shadow-sm md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-border bg-muted p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance">
                {title}
              </h3>
              <h2 className="text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground font-sans">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
