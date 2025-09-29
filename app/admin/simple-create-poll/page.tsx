"use client";

import { useState } from "react";

export default function SimpleCreatePoll() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        voting_type: "public",
        access_code: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);

        try {
            const response = await fetch('/api/elections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    voting_type: formData.voting_type,
                    access_code: formData.access_code || null,
                    start_date: new Date().toISOString(),
                    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 days
                    options: ["Επιλογή 1", "Επιλογή 2"],
                }),
            });

            if (response.ok) {
                alert("Ψηφοφορία δημιουργήθηκε επιτυχώς!");
            } else {
                alert("Σφάλμα στη δημιουργία ψηφοφορίας");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Σφάλμα στη δημιουργία ψηφοφορίας");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Απλή Δημιουργία Ψηφοφορίας</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Τίτλος</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Τίτλος ψηφοφορίας"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Περιγραφή</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Περιγραφή ψηφοφορίας"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Τύπος Ψηφοφορίας</label>
                    <select
                        value={formData.voting_type}
                        onChange={(e) => setFormData({ ...formData, voting_type: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="public">🌐 Δημόσια - Όλοι μπορούν να ψηφίσουν</option>
                        <option value="private">🔒 Ιδιωτική - Με κωδικό πρόσβασης</option>
                        <option value="invitation_only">📧 Προσκεκλημένοι - Μόνο ειδικά προσκεκλημένοι</option>
                        <option value="restricted">🎯 Περιορισμένη - Με targeting criteria</option>
                    </select>
                </div>

                {formData.voting_type === "private" && (
                    <div>
                        <label className="block text-sm font-medium mb-2">Κωδικός Πρόσβασης</label>
                        <input
                            type="text"
                            value={formData.access_code}
                            onChange={(e) => setFormData({ ...formData, access_code: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="π.χ. VOTE2025"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
                >
                    Δημιουργία Ψηφοφορίας
                </button>
            </form>

            <div className="mt-6 p-4 bg-gray-100 rounded-md">
                <h3 className="font-medium mb-2">Debug Info:</h3>
                <pre className="text-sm">{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </div>
    );
}





