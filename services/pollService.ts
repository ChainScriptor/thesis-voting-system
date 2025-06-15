// services/pollService.ts

import { Poll, Candidate, Targeting } from '@/types/poll';
import { v4 as uuidv4 } from 'uuid';

// In-memory polls storage
let polls: Poll[] = [];

// Helper function to generate a random date within a range
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Initialize with sample data
const initializePolls = (): void => {
  if (polls.length === 0) {
    const now = new Date();
    const oneWeekFromNow = new Date(now);
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    const twoWeeksFromNow = new Date(now);
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    
    polls = [
      {
        id: uuidv4(),
        title: 'Company Retreat Location',
        description: 'Help us decide where to have our annual company retreat this year.',
        options: [
          { id: uuidv4(), text: 'Mountain Resort' },
          { id: uuidv4(), text: 'Beach Destination' },
          { id: uuidv4(), text: 'Urban Hotel' },
          { id: uuidv4(), text: 'Countryside Retreat' },
        ],
        candidates: [],
        targeting: {
          ageRanges: ['All Ages'],
          gender: ['All'],
          locations: ['All Locations'],
          occupation: ['All'],
          education: ['All'],
          maritalStatus: ['All'],
          income: ['All'],
          interests: ['All'],
          politicalViews: ['All'],
          socialPlatforms: ['All'],
          roles: ['All']
        },
        dateRange: {
          startDate: now,
          endDate: oneWeekFromNow
        },
        createdAt: randomDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), now),
        isActive: true
      },
      {
        id: uuidv4(),
        title: 'New Office Equipment',
        description: 'Vote on what new equipment we should purchase for the office.',
        options: [
          { id: uuidv4(), text: 'Standing Desks' },
          { id: uuidv4(), text: 'Ergonomic Chairs' },
          { id: uuidv4(), text: 'New Coffee Machine' },
          { id: uuidv4(), text: 'Office Plants' },
        ],
        candidates: [],
        targeting: {
          ageRanges: ['All Ages'],
          gender: ['All'],
          locations: ['Headquarters'],
          occupation: ['Office Staff'],
          education: ['All'],
          maritalStatus: ['All'],
          income: ['All'],
          interests: ['All'],
          politicalViews: ['All'],
          socialPlatforms: ['All'],
          roles: ['Office Staff']
        },
        dateRange: {
          startDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
          endDate: twoWeeksFromNow
        },
        createdAt: randomDate(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30), now),
        isActive: true
      }
    ];
  }
};
initializePolls();


// ————————————————————————————
// In-Memory Service
// ————————————————————————————

const inMemoryService = {
  getPolls: (): Promise<Poll[]> => Promise.resolve([...polls]),
  getPoll: (id: string): Promise<Poll | undefined> =>
    Promise.resolve(polls.find(p => p.id === id)),
  createPoll: (pollData: Omit<Poll, 'id' | 'createdAt'>): Promise<Poll> => {
    const newPoll: Poll = { ...pollData, id: uuidv4(), createdAt: new Date() };
    polls.push(newPoll);
    return Promise.resolve(newPoll);
  },
  updatePoll: (id: string, pollData: Partial<Omit<Poll, 'id' | 'createdAt'>>): Promise<Poll | undefined> => {
    const idx = polls.findIndex(p => p.id === id);
    if (idx === -1) return Promise.resolve(undefined);
    polls[idx] = { ...polls[idx], ...pollData };
    return Promise.resolve(polls[idx]);
  },
  deletePoll: (id: string): Promise<boolean> => {
    const before = polls.length;
    polls = polls.filter(p => p.id !== id);
    return Promise.resolve(polls.length !== before);
  },
  addCandidate: (pollId: string, candidate: Omit<Candidate, 'id'>): Promise<Candidate | undefined> => {
    const p = polls.find(p => p.id === pollId);
    if (!p) return Promise.resolve(undefined);
    const newC: Candidate = { ...candidate, id: uuidv4() };
    p.candidates.push(newC);
    return Promise.resolve(newC);
  },
  removeCandidate: (pollId: string, candidateId: string): Promise<boolean> => {
    const p = polls.find(p => p.id === pollId);
    if (!p) return Promise.resolve(false);
    const before = p.candidates.length;
    p.candidates = p.candidates.filter(c => c.id !== candidateId);
    return Promise.resolve(p.candidates.length !== before);
  },
  updateTargeting: (pollId: string, targeting: Targeting): Promise<Targeting | undefined> => {
    const p = polls.find(p => p.id === pollId);
    if (!p) return Promise.resolve(undefined);
    p.targeting = targeting;
    return Promise.resolve(p.targeting);
  }
};


// ————————————————————————————
// API-backed Service
// ————————————————————————————

export interface CandidateAPI {
  id: number;
  poll_id: number;
  user_id: number;
  invited_at: string;
  fullName: string;
  email: string;
  occupation: string | null;
}



// ————————————————————————————
// Εξαγωγή
// ————————————————————————————
export default {
  ...inMemoryService, // κρατάς την local έκδοση
};
