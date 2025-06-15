"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import VerificationButton from "@/components/verification/VerificationButton";

interface VerificationBarProps {
  isVerified: boolean;
}

const VerificationBar = ({ isVerified }: VerificationBarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

 

  if (isVerified) {
    return (
      <div className="bg-green-50 border-b border-green-200 py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-green-700">
              Ο λογαριασμός σας είναι επαληθευμένος. Μπορείτε να συμμετάσχετε σε όλες τις ψηφοφορίες.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border-b border-yellow-200 py-2">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
          <span className="text-sm text-yellow-700">
            Για να συμμετάσχετε στις ψηφοφορίες, πρέπει πρώτα να συμπληρώσετε τα στοιχεία σας.
          </span>
        </div>
        <VerificationButton
          isVerified={isVerified}
          buttonClassName="w-full sm:w-auto mt-1 sm:mt-0"
          openDialog={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>
    </div>
  );
};

export default VerificationBar;