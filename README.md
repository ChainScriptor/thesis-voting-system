# Online Voting System

**Thesis Project:** Design and Implementation of an Online Voting System

Αυτό το project αποτελεί μέρος της πτυχιακής εργασίας με τίτλο:

> "Design and Implementation of an Online Voting System"

Αναπτύχθηκε με Next.js και TypeScript και προσφέρει μια ασφαλή, φιλική προς τον χρήστη πλατφόρμα για:

* Διαχείριση online εκλογών
* Καταχώρηση υποψηφίων
* Υποβολή ψήφων

---

## 🛠 Technologies Used

* **Next.js** – React framework για SSR/SSG και App Router
* **TypeScript** – Στατικό type checking
* **Tailwind CSS** – Utility-first CSS framework
* **Prisma** – ORM για διαχείριση βάσης δεδομένων (π.χ. PostgreSQL)
* **Clerk** – Authentication & user management
* **Lucide-react** – Icon library
* **React Hook Form** & **Zod** – Φόρμες και validation

## 🚀 Getting Started

Ακολουθήστε τα παρακάτω βήματα για να τρέξετε το project τοπικά:

1. Κλωνοποιήστε το repository:

   ```bash
   git clone https://github.com/ChainScriptor/voting-system.git
   cd voting-system
   ```
2. Εγκαταστήστε τις εξαρτήσεις:

   ```bash
   npm install
   # ή
   yarn install
   # ή
   pnpm install
   ```
3. Ρυθμίστε τα environment variables:

   * Δημιουργήστε ένα αρχείο `.env.local`
   * Προσθέστε τα απαραίτητα variables, π.χ.:

     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/voting
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
     CLERK_SECRET_KEY=...
     ```
4. Τρέξτε τον development server:

   ```bash
   npm run dev
   # ή
   yarn dev
   # ή
   pnpm dev
   ```
5. Ανοίξτε το [http://localhost:3000](http://localhost:3000) στο browser.

---

## 📄 License

Αυτό το project αναπτύχθηκε ως μέρος πτυχιακής εργασίας και προορίζεται για εκπαιδευτική χρήση.

---

## 👨‍🎓 Author

**Efstathios Mavridis**  - Τμήμα μηχανικών πληροφορικής και ηλεκτρονικών συστημάτων - ΔΙΠΑΕ 

* GitHub: [ChainScriptor](https://github.com/ChainScriptor)
