/**
 * ============================================================
 *  HOW TO UPDATE THE TOURNAMENTS SECTION
 *  Everything shown in "Tournaments" comes from this file.
 *  The names, dates and scores below are SAMPLE DATA: replace them.
 *
 *  1. New tournament  -> copy one block in `tournaments`, change the values.
 *  2. Release a draw  -> fill `draws` for that tournament (see examples).
 *  3. Update a score  -> set `score` and `winner` (1 = first player, 2 = second).
 *  4. Class / general notices -> add a line at the top of `notices`.
 *  Dates are written YYYY-MM-DD.
 * ============================================================
 */

export type Match = {
  p1: string;
  p2: string;
  score?: string;       // e.g. "6-3 6-4"
  winner?: 1 | 2;       // leave out until the match is played
  when?: string;        // e.g. "Sat 9:00 AM, Court 1"
};

export type Round = { name: string; matches: Match[] };
export type Draw = { category: string; rounds: Round[] };

export type Tournament = {
  id: string;
  name: string;
  status: 'upcoming' | 'live' | 'completed';
  startDate: string;
  endDate?: string;
  venue: string;
  categories: string[];
  fee?: string;
  registerBy?: string;
  info?: string;
  draws?: Draw[];
};

export type Notice = {
  date: string;
  type: 'Class' | 'Tournament' | 'General';
  title: string;
  body: string;
  important?: boolean;
};

export const tournaments: Tournament[] = [
  {
    id: 'junior-open-dec',
    name: 'BTE Junior Open',
    status: 'upcoming',
    startDate: '2026-12-12',
    endDate: '2026-12-14',
    venue: 'Bharath Tennis Express',
    categories: ['U10', 'U12', 'U14', 'U16'],
    fee: '₹800 per player',
    registerBy: '2026-12-05',
    info: 'Knockout format. Draws will be released one day before the event.',
  },
  {
    id: 'ranking-nov',
    name: 'BTE Monthly Ranking Tournament',
    status: 'live',
    startDate: '2026-10-31',
    endDate: '2026-11-01',
    venue: 'Bharath Tennis Express',
    categories: ['U12', 'Open'],
    fee: '₹500 per player',
    info: 'Draws are live. Check this page for court timings and scores.',
    draws: [
      {
        category: 'U12',
        rounds: [
          {
            name: 'Semi-finals',
            matches: [
              { p1: 'Aarav S.', p2: 'Rohan K.', score: '6-2 6-3', winner: 1 },
              { p1: 'Ishaan M.', p2: 'Dev P.', when: 'Sun 9:00 AM, Court 1' },
            ],
          },
          {
            name: 'Final',
            matches: [{ p1: 'Aarav S.', p2: 'TBD', when: 'Sun 11:00 AM' }],
          },
        ],
      },
      {
        category: 'Open',
        rounds: [
          {
            name: 'Quarter-finals',
            matches: [
              { p1: 'Karthik R.', p2: 'Vikram N.', score: '6-4 6-4', winner: 1 },
              { p1: 'Sanjay B.', p2: 'Arjun T.', score: '7-5 3-6 6-2', winner: 2 },
              { p1: 'Manoj D.', p2: 'Naveen G.', when: 'Sat 4:00 PM, Court 1' },
              { p1: 'Pranav L.', p2: 'Harsh V.', when: 'Sat 4:00 PM, Court 2' },
            ],
          },
          {
            name: 'Semi-finals',
            matches: [
              { p1: 'Karthik R.', p2: 'Arjun T.' },
              { p1: 'TBD', p2: 'TBD' },
            ],
          },
          { name: 'Final', matches: [{ p1: 'TBD', p2: 'TBD' }] },
        ],
      },
    ],
  },
  {
    id: 'dussehra-cup',
    name: 'Dussehra Cup',
    status: 'completed',
    startDate: '2026-10-17',
    endDate: '2026-10-18',
    venue: 'Bharath Tennis Express',
    categories: ['U14'],
    draws: [
      {
        category: 'U14',
        rounds: [
          {
            name: 'Semi-finals',
            matches: [
              { p1: 'Aditya H.', p2: 'Yash R.', score: '6-1 6-2', winner: 1 },
              { p1: 'Nikhil C.', p2: 'Tarun S.', score: '4-6 6-3 6-4', winner: 1 },
            ],
          },
          {
            name: 'Final',
            matches: [{ p1: 'Aditya H.', p2: 'Nikhil C.', score: '6-4 7-5', winner: 1 }],
          },
        ],
      },
    ],
  },
];

export const notices: Notice[] = [
  {
    date: '2026-10-29',
    type: 'Class',
    title: 'Evening batch timing change',
    body: 'Saturday evening batch will start at 5:00 PM instead of 4:30 PM this week.',
    important: true,
  },
  {
    date: '2026-10-27',
    type: 'Tournament',
    title: 'Ranking Tournament entries closing',
    body: 'Last date to confirm your entry is Thursday. Message us on WhatsApp to register.',
  },
  {
    date: '2026-10-24',
    type: 'General',
    title: 'Fee reminder',
    body: 'Monthly fees are due by the 5th. Please pay at the front desk or by UPI.',
  },
];
