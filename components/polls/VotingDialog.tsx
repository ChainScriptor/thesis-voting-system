//app/components/polls/VotingDialog.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Poll } from "@/types/poll";
import { useToast } from "@/hooks/use-toast";

interface VotingDialogProps {
    poll: Poll;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (pollId: string, optionId: string) => void;
}

const VotingDialog = ({ poll, isOpen, onClose, onSubmit }: VotingDialogProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSubmit = () => {
        if (!selectedOption) {
            toast({
                title: "Προσοχή",
                description: "Παρακαλώ επιλέξτε μια από τις διαθέσιμες επιλογές.",
                variant: "destructive",
            });
            return;
        }

        onSubmit(poll.id, selectedOption);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Συμμετοχή στην ψηφοφορία</DialogTitle>
                    <DialogDescription>{poll.title}</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="text-sm text-gray-500 mb-4">{poll.description}</div>

                    <div className="space-y-2">
                        {poll.options.map((option) => (
                            <Button
                                key={option.id}
                                variant="outline"
                                className={`w-full justify-start text-left h-auto py-3 ${selectedOption === option.id
                                        ? "border-2 border-purple-500 bg-purple-50"
                                        : "border border-gray-200"
                                    }`}
                                onClick={() => setSelectedOption(option.id)}
                            >
                                <div className="flex items-center w-full">
                                    <div
                                        className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${selectedOption === option.id
                                                ? "bg-purple-500 text-white"
                                                : "border border-gray-300"
                                            }`}
                                    >
                                        {selectedOption === option.id && <Check className="h-3 w-3" />}
                                    </div>
                                    {option.text}
                                </div>
                            </Button>
                        ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-700">
                        <p className="font-medium mb-1">Σημαντική ενημέρωση</p>
                        <p>
                            Πριν την υποβολή της ψήφου σας, παρακαλώ επαληθεύστε τα στοιχεία σας και προσθέστε τυχόν επιπλέον
                            πληροφορίες που απαιτούνται. Η ψήφος είναι οριστική και δεν μπορεί να αλλάξει μετά την υποβολή.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Ακύρωση
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={!selectedOption}
                    >
                        Υποβολή ψήφου
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default VotingDialog;
