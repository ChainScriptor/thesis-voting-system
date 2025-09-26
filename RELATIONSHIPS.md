# Συσχετίσεις Βάσης Δεδομένων - Voting System

## Κύριες Συσχετίσεις

### 1. **Elections – Poll_Candidates (1:N)**
**Περιγραφή Τύπου:** Κάθε ψηφοφορία μπορεί να περιλαμβάνει πολλούς υποψήφιους, ενώ κάθε υποψήφιος ανήκει σε μία συγκεκριμένη ψηφοφορία.

**Schema:**
```prisma
model election {
  id                Int       @id @default(autoincrement())
  // ... άλλα πεδία
  poll_candidates   poll_candidates[]
}

model poll_candidates {
  id         Int      @id @default(autoincrement())
  poll_id    Int
  user_id    Int
  invited_at DateTime @default(now())

  election   election @relation(fields: [poll_id], references: [id], onDelete: Cascade)
  user       user     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

### 2. **Users – Poll_Candidates (1:N)**
**Περιγραφή Τύπου:** Κάθε χρήστης μπορεί να είναι υποψήφιος σε πολλές ψηφοφορίες, ενώ κάθε υποψήφιος συνδέεται με έναν χρήστη.

**Schema:**
```prisma
model user {
  id         Int       @id @default(autoincrement())
  // ... άλλα πεδία
  poll_candidates poll_candidates[]
}

model poll_candidates {
  id         Int      @id @default(autoincrement())
  poll_id    Int
  user_id    Int
  invited_at DateTime @default(now())

  election   election @relation(fields: [poll_id], references: [id], onDelete: Cascade)
  user       user     @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
```

### 3. **Elections – Votes (1:N)**
**Περιγραφή Τύπου:** Κάθε ψηφοφορία μπορεί να συγκεντρώσει πολλές ψήφους, ενώ κάθε ψήφος ανήκει σε μία συγκεκριμένη ψηφοφορία.

**Schema:**
```prisma
model election {
  id                Int       @id @default(autoincrement())
  // ... άλλα πεδία
  votes             Vote[]
}

model Vote {
  id          Int       @id @default(autoincrement())
  userId      Int
  electionId  Int
  candidateId Int
  votedAt     DateTime  @default(now())

  user        user      @relation("VoteUser", fields: [userId], references: [id])
  election    election  @relation(fields: [electionId], references: [id])
  candidate   user      @relation("VoteCandidate", fields: [candidateId], references: [id])

  @@unique([userId, electionId])
}
```

### 4. **Users – Votes (1:N)**
**Περιγραφή Τύπου:** Κάθε χρήστης μπορεί να συμμετέχει σε πολλές ψηφοφορίες, καταχωρώντας πολλαπλές ψήφους, ενώ κάθε ψήφος συνδέεται με έναν χρήστη.

**Schema:**
```prisma
model user {
  id         Int       @id @default(autoincrement())
  // ... άλλα πεδία
  votes           Vote[]            @relation("VoteUser")
  candidateVotes  Vote[]            @relation("VoteCandidate")
}

model Vote {
  id          Int       @id @default(autoincrement())
  userId      Int
  electionId  Int
  candidateId Int
  votedAt     DateTime  @default(now())

  user        user      @relation("VoteUser", fields: [userId], references: [id])
  election    election  @relation(fields: [electionId], references: [id])
  candidate   user      @relation("VoteCandidate", fields: [candidateId], references: [id])

  @@unique([userId, electionId])
}
```

### 5. **Candidates – Votes (1:N)**
**Περιγραφή Τύπου:** Κάθε υποψήφιος μπορεί να λάβει πολλές ψήφους, ενώ κάθε ψήφος αφορά έναν συγκεκριμένο υποψήφιο.

**Schema:**
```prisma
model user {
  id         Int       @id @default(autoincrement())
  // ... άλλα πεδία
  candidateVotes  Vote[]            @relation("VoteCandidate")
}

model Vote {
  id          Int       @id @default(autoincrement())
  userId      Int
  electionId  Int
  candidateId Int
  votedAt     DateTime  @default(now())

  user        user      @relation("VoteUser", fields: [userId], references: [id])
  election    election  @relation(fields: [electionId], references: [id])
  candidate   user      @relation("VoteCandidate", fields: [candidateId], references: [id])

  @@unique([userId, electionId])
}
```

### 6. **Elections – Takepart (1:N)**
**Περιγραφή Τύπου:** Κάθε ψηφοφορία έχει ένα ή περισσότερα αποτελέσματα (ένα για κάθε υποψήφιο), ενώ κάθε αποτέλεσμα συνδέεται με μία συγκεκριμένη ψηφοφορία.

**Schema:**
```prisma
model election {
  id                Int       @id @default(autoincrement())
  // ... άλλα πεδία
  takepart          takepart[]
}

model takepart {
  electionId    Int
  candidateId   Int
  numberOfVotes Int

  user          user     @relation("TakepartUser", fields: [candidateId], references: [id])
  election      election @relation(fields: [electionId], references: [id])

  @@id([electionId, candidateId])
  @@index([candidateId])
}
```

### 7. **Candidates – Takepart (1:N)**
**Περιγραφή Τύπου:** Κάθε υποψήφιος μπορεί να έχει πολλά αποτελέσματα (ένα για κάθε συμμετοχή του σε διαφορετικές ψηφοφορίες), ενώ κάθε αποτέλεσμα αφορά έναν συγκεκριμένο υποψήφιο.

**Schema:**
```prisma
model user {
  id         Int       @id @default(autoincrement())
  // ... άλλα πεδία
  takepart        takepart[]        @relation("TakepartUser")
}

model takepart {
  electionId    Int
  candidateId   Int
  numberOfVotes Int

  user          user     @relation("TakepartUser", fields: [candidateId], references: [id])
  election      election @relation(fields: [electionId], references: [id])

  @@id([electionId, candidateId])
  @@index([candidateId])
}
```

## Επιπλέον Συσχετίσεις

### 8. **Users – Elections (1:N)**
**Περιγραφή Τύπου:** Κάθε χρήστης μπορεί να δημιουργήσει πολλές ψηφοφορίες, ενώ κάθε ψηφοφορία δημιουργείται από έναν συγκεκριμένο χρήστη.

**Schema:**
```prisma
model user {
  id         Int       @id @default(autoincrement())
  // ... άλλα πεδία
  election        election[]
}

model election {
  id                Int       @id @default(autoincrement())
  // ... άλλα πεδία
  userId            Int
  user              user              @relation(fields: [userId], references: [id])
}
```

## Σημαντικές Παρατηρήσεις

1. **Περιορισμός Ψήφου**: Κάθε χρήστης μπορεί να ψηφίσει μόνο μία φορά ανά ψηφοφορία (`@@unique([userId, electionId])`)

2. **Cascade Deletes**: Όταν διαγράφεται μια ψηφοφορία, διαγράφονται αυτόματα όλοι οι υποψήφιοι και οι ψήφοι της

3. **Composite Primary Key**: Το `takepart` έχει composite primary key `[electionId, candidateId]` για να αποτρέψει διπλές εγγραφές

4. **Multiple Relations**: Ο `user` model έχει πολλαπλές σχέσεις με το `Vote` model:
   - `VoteUser`: για τον χρήστη που ψηφίζει
   - `VoteCandidate`: για τον υποψήφιο που λαμβάνει την ψήφο
   - `TakepartUser`: για τον υποψήφιο στα αποτελέσματα
