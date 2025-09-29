# Troubleshooting Vote Submission Issues

## Συχνά Προβλήματα και Λύσεις

### 1. "Φόρτωση υποψηφίων..." δεν τελειώνει ποτέ

**Αιτία**: Δεν υπάρχουν υποψήφιοι στη ψηφοφορία ή πρόβλημα με το authentication.

**Λύσεις**:
1. **Ελέγξτε αν υπάρχουν υποψήφιοι**:
   - Πηγαίνετε στο `/admin/candidates`
   - Επιλέξτε την ψηφοφορία
   - Προσθέστε υποψηφίους αν δεν υπάρχουν

2. **Ελέγξτε το authentication**:
   - Βεβαιωθείτε ότι είστε logged in
   - Ελέγξτε τα browser developer tools για σφάλματα
   - Δοκιμάστε να κάνετε logout/login

3. **Ελέγξτε το network**:
   - Ανοίξτε τα browser developer tools (F12)
   - Πηγαίνετε στο Network tab
   - Ανοίξτε το modal και δείτε αν υπάρχουν failed requests

### 2. "Σφάλμα κατά την υποβολή της ψήφου"

**Αιτίες**:
- Δεν έχετε επιλέξει υποψήφιο
- Έχετε ήδη ψηφίσει
- Πρόβλημα με το authentication
- Πρόβλημα με τη βάση δεδομένων

**Λύσεις**:
1. **Επιλέξτε υποψήφιο**:
   - Βεβαιωθείτε ότι έχετε επιλέξει έναν υποψήφιο πριν πατήσετε "Υποβολή ψήφου"

2. **Ελέγξτε αν έχετε ήδη ψηφίσει**:
   - Αν έχετε ήδη ψηφίσει, θα εμφανιστεί μήνυμα "Έχετε ήδη ψηφίσει"

3. **Ελέγξτε το authentication**:
   - Βεβαιωθείτε ότι είστε logged in
   - Ελέγξτε τα browser console logs για σφάλματα

### 3. Debugging Steps

**Βήμα 1: Ελέγξτε τα Console Logs**
```javascript
// Ανοίξτε τα browser developer tools (F12)
// Πηγαίνετε στο Console tab
// Ανοίξτε το modal και δείτε τα error messages
```

**Βήμα 2: Ελέγξτε το Network Tab**
```javascript
// Στο Network tab, δείτε αν υπάρχουν:
// - Failed requests (κόκκινα)
// - 401 Unauthorized errors
// - 404 Not Found errors
// - 500 Internal Server Error
```

**Βήμα 3: Ελέγξτε τη Βάση Δεδομένων**
```sql
-- Ελέγξτε αν υπάρχουν υποψήφιοι για την ψηφοφορία
SELECT * FROM takepart WHERE electionId = [ID_ΤΗΣ_ΨΗΦΟΦΟΡΙΑΣ];

-- Ελέγξτε αν υπάρχει η ψηφοφορία
SELECT * FROM election WHERE id = [ID_ΤΗΣ_ΨΗΦΟΦΟΡΙΑΣ];
```

### 4. Common Error Messages

| Error Message | Αιτία | Λύση |
|---------------|-------|------|
| "Not authenticated" | Δεν είστε logged in | Κάντε login |
| "User not found" | Το user δεν υπάρχει στη βάση | Ελέγξτε το user registration |
| "Election not found" | Η ψηφοφορία δεν υπάρχει | Ελέγξτε το election ID |
| "You have already voted" | Έχετε ήδη ψηφίσει | Δεν μπορείτε να ψηφίσετε ξανά |
| "Invalid payload" | Λάθος δεδομένα | Ελέγξτε το candidate ID |

### 5. Testing Steps

1. **Δημιουργήστε μια test ψηφοφορία**
2. **Προσθέστε υποψηφίους**
3. **Δοκιμάστε να ψηφίσετε**
4. **Ελέγξτε τα αποτελέσματα**

### 6. Contact Information

Αν τα προβλήματα συνεχίζουν:
- Ελέγξτε τα server logs
- Ελέγξτε τη βάση δεδομένων
- Ελέγξτε το network connectivity





