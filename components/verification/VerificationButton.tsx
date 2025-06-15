"use client";

import React, { useState } from "react";
import VerificationDialog from "@/components/verification/VerificationDialog";

interface VerificationButtonProps {
  isVerified: boolean;
  buttonClassName?: string;
  variant?: "default" | "pill" | "icon";
  openDialog?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const VerificationButton = ({
  isVerified,
  buttonClassName = "",
  variant = "default",
  openDialog,
  onOpenChange,
}: VerificationButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openVerificationDialog = () => {
    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setIsDialogOpen(true);
    }
  };

  const closeVerificationDialog = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsDialogOpen(false);
    }
  };

  const dialogOpen = openDialog !== undefined ? openDialog : isDialogOpen;

  let buttonContent;
  let buttonStyle;

  switch (variant) {
    case "pill":
      buttonStyle = `px-2 py-1 rounded-full text-white text-xs ${
        isVerified ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
      } transition-colors ${buttonClassName}`;
      buttonContent = isVerified ? "Επαληθευμένος" : "Μη Επαληθευμένος";
      break;
    case "icon":
      buttonStyle = `p-1 rounded-full ${
        isVerified ? "text-green-500" : "text-yellow-500"
      } ${buttonClassName}`;
      buttonContent = isVerified ? "✓" : "!";
      break;
    default:
      buttonStyle = `${
        isVerified ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
      } text-white rounded ${buttonClassName}`;
      buttonContent = isVerified ? "Επαληθευμένος λογαριασμός" : "Επαλήθευση στοιχείων";
  }

  return (
    <>
      <button className={buttonStyle} onClick={openVerificationDialog}>
        {buttonContent}
      </button>

      <VerificationDialog
        isOpen={dialogOpen}
        onClose={closeVerificationDialog}
        isVerified={isVerified}
        setIsVerified={(verified) => {
          console.log("Verification status updated:", verified);
          closeVerificationDialog();
        }}
      />
    </>
  );
};

export default VerificationButton;
