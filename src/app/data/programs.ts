/**
 * ============================================================
 *  PROGRAMS: edit this file to change what the Programs section shows.
 *  The timings, batch sizes and details below are SUGGESTED text.
 *  Please check every line and change it to match your academy.
 *  Fees: add a `fees` list to a program to show a fee table
 *  (see the example in the Junior Advanced program). If there is
 *  no `fees`, the page says "Contact us for fees".
 * ============================================================
 */

export type Row = { label: string; value: string };

export type Program = {
  id: string;
  name: string;
  group: 'pathway' | 'other';
  color: string;           // accent colour for this program
  audience: string;        // e.g. "Ages 5 to 7"
  summary: string;
  focus: string[];
  objectives: string[];
  specs?: Row[];           // court / ball details
  schedule: Row[];
  fees?: Row[];
};

export const programs: Program[] = [
  {
    id: 'red',
    name: 'Red Ball',
    group: 'pathway',
    color: '#e5383b',
    audience: 'Ages 5 to 7',
    summary:
      'A fun, social first step into tennis. Children learn on a small court with soft, slow balls so they can rally from day one.',
    focus: ['Balance, agility and coordination', 'Hand-eye and footwork basics', 'Teamwork and listening skills', 'Love for the game'],
    objectives: ['Hit and rally with confidence', 'Learn basic strokes through games', 'Build fitness without it feeling like training'],
    specs: [
      { label: 'Court', value: 'Short court (about 36 ft)' },
      { label: 'Net height', value: '80 cm' },
      { label: 'Ball', value: 'Red, slower and lower bounce' },
    ],
    schedule: [
      { label: 'Session length', value: '1 hour' },
      { label: 'Batch size', value: 'Small groups' },
      { label: 'Timings', value: 'Morning and evening batches' },
    ],
  },
  {
    id: 'orange',
    name: 'Orange Ball',
    group: 'pathway',
    color: '#f77f00',
    audience: 'Ages 8 to 9',
    summary:
      'The bridge between mini tennis and the bigger court. Players start to learn proper technique, scoring and simple match play.',
    focus: ['Stroke technique', 'Rules and scoring', 'Basic tactics and consistency', 'Control and movement'],
    objectives: ['Play points and short matches', 'Learn the serve and basic net play', 'Rally with control for longer'],
    specs: [
      { label: 'Court', value: '60 ft x 27 ft' },
      { label: 'Ball', value: 'Orange, medium-slow bounce' },
    ],
    schedule: [
      { label: 'Session length', value: '1 hour' },
      { label: 'Batch size', value: 'Small groups' },
      { label: 'Timings', value: 'Morning and evening batches' },
    ],
  },
  {
    id: 'green',
    name: 'Green Ball',
    group: 'pathway',
    color: '#2a9d4b',
    audience: 'Ages 10 to 12',
    summary:
      'Players move to the full court with a slightly slower ball. The focus shifts to cleaner technique, smarter tactics and fitness.',
    focus: ['Technical refinement', 'Tactical patterns', 'Movement and physical development', 'Match mindset'],
    objectives: ['Play full-court matches', 'Develop a reliable serve and return', 'Get ready for first tournaments'],
    specs: [
      { label: 'Court', value: 'Full court' },
      { label: 'Ball', value: 'Green, slightly slower than standard' },
    ],
    schedule: [
      { label: 'Tennis', value: '90 minutes' },
      { label: 'Fitness', value: '30 to 45 minutes' },
      { label: 'Timings', value: 'Morning and evening batches' },
    ],
  },
  {
    id: 'junior-advanced',
    name: 'Junior Advanced',
    group: 'pathway',
    color: '#0066FF',
    audience: 'Ages 12 to 17, competitive players',
    summary:
      'For players who are ready to compete. Training is goal-based, with regular assessments, match play and tournament preparation.',
    focus: ['Technical and tactical training', 'Decision making under pressure', 'Strength and conditioning', 'Mental toughness'],
    objectives: ['Assess tennis and fitness levels regularly', 'Prepare for district, state and national events', 'Build a clear tournament calendar'],
    schedule: [
      { label: 'Days', value: 'Monday to Saturday' },
      { label: 'Tennis', value: '2 hours' },
      { label: 'Fitness', value: '1 hour' },
      { label: 'Match play', value: 'Weekend practice matches' },
    ],
    // To show fees, add a list like this (then it replaces "Contact us"):
    // fees: [
    //   { label: 'Monthly', value: '₹0,000' },
    //   { label: 'Quarterly', value: '₹0,000' },
    // ],
  },
  {
    id: 'elite',
    name: 'Elite Performance',
    group: 'pathway',
    color: '#7b2cbf',
    audience: 'Tournament players aiming higher',
    summary:
      'High-intensity training for players targeting regional and national rankings. Small groups, video review and a plan built around the tournament calendar.',
    focus: ['Video and match analysis', 'Strength, speed and recovery', 'Tournament strategy', 'Off-season and in-season cycles'],
    objectives: ['Individual goals for tennis and fitness', 'Tournament scheduling with the coach', 'Regular performance reviews with parents'],
    schedule: [
      { label: 'Days', value: 'Monday to Saturday' },
      { label: 'Group size', value: 'Maximum 4 players per court' },
      { label: 'Entry', value: 'After an assessment by the coach' },
    ],
  },
  {
    id: 'adult',
    name: 'Adult Programs',
    group: 'other',
    color: '#0066FF',
    audience: 'Adults, beginner to advanced',
    summary:
      'Learn tennis or sharpen your game in friendly, flexible sessions. Great for fitness, stress relief and social play.',
    focus: ['Fundamentals for beginners', 'Singles and doubles play', 'Fitness and movement', 'Match situations'],
    objectives: ['Hit comfortably and rally', 'Understand scoring and positioning', 'Play social matches with confidence'],
    schedule: [
      { label: 'Session length', value: '1 hour' },
      { label: 'Timings', value: 'Early morning and evening batches' },
      { label: 'Levels', value: 'Beginner, intermediate, advanced' },
    ],
  },
  {
    id: 'private',
    name: 'Private Coaching',
    group: 'other',
    color: '#0066FF',
    audience: 'All ages and levels',
    summary:
      'One-on-one sessions with the coach. Ideal for fixing a stroke, preparing for a tournament, or learning faster.',
    focus: ['Personal stroke correction', 'Serve and return work', 'Match preparation', 'Custom drills'],
    objectives: ['A plan built around your goals', 'Fast, visible improvement', 'Flexible timing'],
    schedule: [
      { label: 'Session length', value: '1 hour' },
      { label: 'Booking', value: 'By appointment' },
    ],
  },
  {
    id: 'camps',
    name: 'Summer Camps',
    group: 'other',
    color: '#0066FF',
    audience: 'Ages 6 to 17, all levels',
    summary:
      'Intensive multi-day camps that mix coaching, fitness, games and match play. A great way to improve during the holidays.',
    focus: ['Skill development', 'Fun games and challenges', 'Match play', 'Fitness'],
    objectives: ['Noticeable progress in a short time', 'Meet and play with other players', 'Finish with a camp tournament'],
    schedule: [
      { label: 'Format', value: 'Full-day or half-day batches' },
      { label: 'When', value: 'School holidays (dates announced in Notices)' },
    ],
  },
  {
    id: 'fitness',
    name: 'Fitness & Conditioning',
    group: 'other',
    color: '#0066FF',
    audience: 'Players of all ages',
    summary:
      'Sport-specific fitness that improves speed, agility and endurance on court, and helps prevent injuries.',
    focus: ['Speed and agility', 'Strength and core', 'Endurance', 'Injury prevention'],
    objectives: ['Move better and recover faster', 'Track progress with simple tests', 'Support tennis training'],
    schedule: [
      { label: 'Session length', value: '45 to 60 minutes' },
      { label: 'Timings', value: 'Before or after tennis batches' },
    ],
  },
];

export const whyUs: { icon: string; title: string; text: string }[] = [
  { icon: '🏅', title: 'Certified coaching', text: 'Led by an ITF Level 1 and AITA certified coach.' },
  { icon: '🪜', title: 'Clear pathway', text: 'A step-by-step route from first rally to tournaments.' },
  { icon: '👥', title: 'Small batches', text: 'Enough attention for every player in the group.' },
  { icon: '💪', title: 'Fitness built in', text: 'Tennis training and conditioning work together.' },
  { icon: '🏆', title: 'Match exposure', text: 'Regular in-house tournaments and match play.' },
  { icon: '🤝', title: 'Parent partnership', text: 'Simple updates on progress and goals.' },
];
