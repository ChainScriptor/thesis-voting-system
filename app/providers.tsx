"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={{
        locale: "el",
        translations: {
          signIn: {
            start: {
              title: "Καλώς ήρθες!",
              subtitle: "Συνδέσου για να συνεχίσεις",
              actionText: "Σύνδεση",
            },
            alternativeMethods: {
              title: "Ή χρησιμοποίησε άλλον τρόπο",
              actionLink: "Εναλλακτική σύνδεση",
            },
            passwordResetLink: "Ξέχασες τον κωδικό σου;",
            noAccount: {
              title: "Δεν έχεις λογαριασμό;",
              actionLink: "Εγγράψου",
            },
          },
          signUp: {
            start: {
              title: "Δημιουργία λογαριασμού",
              subtitle: "Ξεκίνα με το email σου",
              actionText: "Εγγραφή",
            },
            loginLink: {
              title: "Έχεις ήδη λογαριασμό;",
              actionLink: "Σύνδεση",
            },
          },
          socialButtonsBlockButton: "Συνέχεια με {{provider|titleize}}",
          formFieldLabel__emailAddress: "Διεύθυνση Email",
          formFieldLabel__password: "Κωδικός",
          formFieldLabel__confirmPassword: "Επιβεβαίωση Κωδικού",
          formFieldLabel__username: "Όνομα χρήστη",
          formFieldLabel__firstName: "Όνομα",
          formFieldLabel__lastName: "Επώνυμο",
          formFieldInputPlaceholder__emailAddress: "π.χ. maria@example.com",
          formFieldInputPlaceholder__password: "Ο κωδικός σας",
          formFieldInputPlaceholder__confirmPassword: "Επαναλάβετε τον κωδικό",
          formFieldInputPlaceholder__firstName: "π.χ. Μαρία",
          formFieldInputPlaceholder__lastName: "π.χ. Παπαδοπούλου",
          formFieldInputPlaceholder__username: "π.χ. maria123",
          formButtonPrimary: "Συνέχεια",
          backButton: "Πίσω",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ClerkProvider>
  );
}
