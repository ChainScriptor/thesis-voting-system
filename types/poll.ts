// types/poll.ts

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  candidates: Candidate[];   // <- εδώ θα βλέπει πλέον email & occupation
  targeting: Targeting;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  createdAt: Date;
  isActive: boolean;
}

export interface PollOption {
  id: string;
  text: string;
}

export interface Candidate {
  id: number;
  name: string;
  /** Νέο: διεύθυνση email του χρήστη */
  email?: string;
  /** Νέο: επάγγελμα ή θέση */
  occupation?: string | null;
  position?: string;
  imageUrl?: string;
}

export interface Targeting {
  ageRanges?: string[];
  gender?: string[];
  locations?: string[];
  occupation?: string[];
  education?: string[];
  maritalStatus?: string[];
  income?: string[];
  interests?: string[];
  politicalViews?: string[];
  socialPlatforms?: string[];
  roles?: string[];
}
