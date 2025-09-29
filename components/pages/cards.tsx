// components/pages/cards.tsx
import { ProjectShowcase } from "@/components/ui/project-showcase";

function openInNewTab(link: string) {
    window.open(link, "_blank", "noopener,noreferrer");
}

const LTRVersion = () => (
    <div className="p-16 rounded-lg min-h-[300px] flex flex-wrap gap-6 items-center justify-center relative">
        <div className="items-center justify-center relative flex" style={{ maxWidth: "1536px" }}>
            <ProjectShowcase
                testimonials={[
                    {
                        name: "Καλωσορίσατε στην πλατφόρμα ηλεκτρονικών ψηφοφοριών!",
                        quote:
                            'Η πλατφόρμα μας προσφέρει πλήρη ασφάλεια και διαφάνεια . Εύκολη χρήση από οποιαδήποτε συσκευή. Aξιοπιστία και εμπιστοσύνη σε κάθε ψηφοφορία.',
                        designation: "Ασφαλείς & Διαφανείς Ηλεκτρονικές Ψηφοφορίες",
                        src: "/system.svg",
                        link: "",
                    },
                    {
                        name: "Πλήρης Διαχείριση Ψηφοφοριών",
                        quote:
                            "Οργανώστε τις εκλογές σας με ευελιξία , ορίστε εύκολα χρονοδιαγράμματα. Παρακολουθήστε τη συμμετοχή ζωντανά και εξάγετε πλήρεις αναφορές για τα αποτελέσματα των ψηφοφοριών.",
                        designation: "Έλεγχος & Ανάλυση σε Πραγματικό Χρόνο",
                        src: "/second.svg",
                        link: "",
                    },
                    // [Μπορείς να συνεχίσεις και με τα υπόλοιπα...]
                ]}
                colors={{
                    name: "var(--project-showcase-name-color)",
                    position: "var(--project-showcase-position-color)",
                    testimony: "var(--project-showcase-testimony-color)",
                }}
                fontSizes={{
                    name: "var(--project-showcase-name-size)",
                    position: "var(--project-showcase-position-size)",
                    testimony: "var(--project-showcase-testimony-size)",
                }}
                spacing={{
                    nameTop: "var(--project-showcase-name-top)",
                    nameBottom: "var(--project-showcase-name-bottom)",
                    positionTop: "var(--project-showcase-position-top)",
                    positionBottom: "var(--project-showcase-position-bottom)",
                    testimonyTop: "var(--project-showcase-testimony-top)",
                    testimonyBottom: "var(--project-showcase-testimony-bottom)",
                    lineHeight: "var(--project-showcase-line-height)",
                }}
                halomotButtonGradient="var(--project-showcase-button-gradient)"
                halomotButtonBackground="var(--project-showcase-button-background)"
                halomotButtonTextColor="var(--project-showcase-button-text-color)"
                halomotButtonOuterBorderRadius="var(--project-showcase-button-outer-radius)"
                halomotButtonInnerBorderRadius="var(--project-showcase-button-inner-radius)"
                halomotButtonHoverTextColor="var(--project-showcase-button-hover-text-color)"
                onItemClick={openInNewTab}
            />
        </div>
    </div>
);

export default LTRVersion;
