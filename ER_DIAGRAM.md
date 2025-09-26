
# Διάγραμμα ER - Voting System

## Entity-Relationship Diagram

```mermaid
erDiagram
    USER {
        int id PK
        string clerkId UK
        string fullName
        string username UK
        string password
        boolean isAdmin
        string gender
        string email UK
        datetime birthdate
        string occupation
        string location
    }

    ELECTION {
        int id PK
        string title
        string description
        datetime start_date
        datetime end_date
        boolean is_active
        string target_occupation
        string target_location
        datetime birthdate_min
        datetime birthdate_max
        string target_gender
        int userId FK
    }

    POLL_CANDIDATES {
        int id PK
        int poll_id FK
        int user_id FK
        datetime invited_at
    }

    VOTE {
        int id PK
        int userId FK
        int electionId FK
        int candidateId FK
        datetime votedAt
    }

    TAKEPART {
        int electionId PK,FK
        int candidateId PK,FK
        int numberOfVotes
    }

    %% Συσχετίσεις
    USER ||--o{ ELECTION : "creates"
    USER ||--o{ POLL_CANDIDATES : "is_candidate"
    ELECTION ||--o{ POLL_CANDIDATES : "has_candidates"
    USER ||--o{ VOTE : "votes"
    ELECTION ||--o{ VOTE : "receives_votes"
    USER ||--o{ VOTE : "receives_votes_as_candidate"
    ELECTION ||--o{ TAKEPART : "has_results"
    USER ||--o{ TAKEPART : "has_results"
```

## Επεξήγηση Διαγράμματος

### Κύριες Οντότητες (Entities)

1. **USER** - Χρήστες του συστήματος
   - Περιλαμβάνει όλες τις πληροφορίες χρήστη
   - Μπορεί να είναι admin, ψηφοφόρος, ή υποψήφιος

2. **ELECTION** - Ψηφοφορίες
   - Περιλαμβάνει όλες τις πληροφορίες ψηφοφορίας
   - Συνδέεται με τον δημιουργό της (userId)

3. **POLL_CANDIDATES** - Υποψήφιοι σε ψηφοφορίες
   - Junction table μεταξύ USER και ELECTION
   - Καταγράφει ποιοι χρήστες είναι υποψήφιοι σε ποιες ψηφοφορίες

4. **VOTE** - Ψήφοι
   - Καταγράφει τις ψήφους των χρηστών
   - Συνδέει ψηφοφόρο, ψηφοφορία και υποψήφιο

5. **TAKEPART** - Αποτελέσματα ψηφοφοριών
   - Καταγράφει τα τελικά αποτελέσματα
   - Composite primary key (electionId, candidateId)

### Συσχετίσεις (Relationships)

- **USER ||--o{ ELECTION**: Ένας χρήστης μπορεί να δημιουργήσει πολλές ψηφοφορίες
- **USER ||--o{ POLL_CANDIDATES**: Ένας χρήστης μπορεί να είναι υποψήφιος σε πολλές ψηφοφορίες
- **ELECTION ||--o{ POLL_CANDIDATES**: Μία ψηφοφορία μπορεί να έχει πολλούς υποψήφιους
- **USER ||--o{ VOTE**: Ένας χρήστης μπορεί να ψηφίσει πολλές φορές (σε διαφορετικές ψηφοφορίες)
- **ELECTION ||--o{ VOTE**: Μία ψηφοφορία μπορεί να λάβει πολλές ψήφους
- **USER ||--o{ VOTE**: Ένας χρήστης μπορεί να λάβει πολλές ψήφους ως υποψήφιος
- **ELECTION ||--o{ TAKEPART**: Μία ψηφοφορία έχει πολλά αποτελέσματα
- **USER ||--o{ TAKEPART**: Ένας χρήστης μπορεί να έχει πολλά αποτελέσματα

### Σημαντικά Χαρακτηριστικά

1. **Περιορισμοί Ψήφου**: `@@unique([userId, electionId])` - Κάθε χρήστης μόνο μία ψήφο ανά ψηφοφορία
2. **Cascade Deletes**: Όταν διαγράφεται ψηφοφορία, διαγράφονται αυτόματα υποψήφιοι και ψήφοι
3. **Composite Keys**: Το TAKEPART έχει composite primary key για αποφυγή διπλών εγγραφών
4. **Multiple Relations**: Ο USER έχει πολλαπλές σχέσεις με το VOTE για διαφορετικούς ρόλους

## Εναλλακτική Προβολή - Σχηματικό Διάγραμμα

```mermaid
graph TB
    subgraph "Users"
        U1[User 1]
        U2[User 2]
        U3[User 3]
    end

    subgraph "Elections"
        E1[Election 1]
        E2[Election 2]
    end

    subgraph "Candidates"
        C1[Candidate 1]
        C2[Candidate 2]
        C3[Candidate 3]
    end

    subgraph "Votes"
        V1[Vote 1]
        V2[Vote 2]
        V3[Vote 3]
    end

    subgraph "Results"
        R1[Result 1]
        R2[Result 2]
    end

    %% Συνδέσεις
    U1 --> E1
    U2 --> E2
    U1 --> C1
    U2 --> C2
    U3 --> C3
    E1 --> C1
    E1 --> C2
    E2 --> C3
    U3 --> V1
    V1 --> E1
    V1 --> C1
    E1 --> R1
    C1 --> R1
    E2 --> R2
    C3 --> R2

    %% Styling
    classDef userClass fill:#e1f5fe
    classDef electionClass fill:#f3e5f5
    classDef candidateClass fill:#e8f5e8
    classDef voteClass fill:#fff3e0
    classDef resultClass fill:#fce4ec

    class U1,U2,U3 userClass
    class E1,E2 electionClass
    class C1,C2,C3 candidateClass
    class V1,V2,V3 voteClass
    class R1,R2 resultClass
```

## Σύνοψη Συσχετίσεων

| Συσχέτιση | Τύπος | Περιγραφή |
|-----------|-------|-----------|
| USER - ELECTION | 1:N | Χρήστης δημιουργεί πολλές ψηφοφορίες |
| USER - POLL_CANDIDATES | 1:N | Χρήστης είναι υποψήφιος σε πολλές ψηφοφορίες |
| ELECTION - POLL_CANDIDATES | 1:N | Ψηφοφορία έχει πολλούς υποψήφιους |
| USER - VOTE | 1:N | Χρήστης ψηφίζει πολλές φορές |
| ELECTION - VOTE | 1:N | Ψηφοφορία λαμβάνει πολλές ψήφους |
| USER - VOTE (candidate) | 1:N | Χρήστης λαμβάνει πολλές ψήφους ως υποψήφιος |
| ELECTION - TAKEPART | 1:N | Ψηφοφορία έχει πολλά αποτελέσματα |
| USER - TAKEPART | 1:N | Χρήστης έχει πολλά αποτελέσματα |
