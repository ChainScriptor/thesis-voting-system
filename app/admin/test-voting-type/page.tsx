"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TestPage() {
    const [votingType, setVotingType] = useState("public");

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Test - Τύπος Ψηφοφορίας</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Τύπος Ψηφοφορίας</label>
                    <Select value={votingType} onValueChange={setVotingType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Επιλέξτε τύπο ψηφοφορίας" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="public">🌐 Δημόσια - Όλοι μπορούν να ψηφίσουν</SelectItem>
                            <SelectItem value="private">🔒 Ιδιωτική - Με κωδικό πρόσβασης</SelectItem>
                            <SelectItem value="invitation_only">📧 Προσκεκλημένοι - Μόνο ειδικά προσκεκλημένοι</SelectItem>
                            <SelectItem value="restricted">🎯 Περιορισμένη - Με targeting criteria</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-600 mt-2">
                        Επιλεγμένος τύπος: <strong>{votingType}</strong>
                    </p>
                </div>

                {votingType === "restricted" && (
                    <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
                        <h3 className="text-sm font-medium text-purple-800 mb-4">
                            🎯 Κριτήρια Στόχευσης (Εμφανίζονται μόνο για Περιορισμένη)
                        </h3>
                        <p className="text-sm text-purple-700">
                            Εδώ θα εμφανίζονται τα πεδία για επάγγελμα, τοποθεσία, ηλικία, κλπ.
                        </p>
                    </div>
                )}

                {votingType === "private" && (
                    <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                        <h3 className="text-sm font-medium text-orange-800 mb-4">
                            🔒 Ιδιωτική Ψηφοφορία
                        </h3>
                        <p className="text-sm text-orange-700">
                            Εδώ θα εμφανίζεται το πεδίο για κωδικό πρόσβασης.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}


