/**
 * ============================================================
 *  GALLERY: how to add a photo
 *  1. Copy the picture into the  public/gallery  folder.
 *  2. Add one line below with the file name, a short caption
 *     and a category (Training, Tournaments or Conferences).
 *  The newest line should go at the top. Delete a line to remove a photo.
 *  Tip: use sharp, large photos (at least 1000 pixels wide).
 * ============================================================
 */

export type Category = 'Training' | 'Tournaments' | 'Conferences';
export type Photo = { file: string; caption: string; category: Category };

export const categories: Category[] = ['Training', 'Tournaments', 'Conferences'];

export const photos: Photo[] = [
  { file: 'group-kids-1.jpg', caption: 'Coach with the junior group', category: 'Training' },
  { file: 'group-class-1.jpg', caption: 'Group class on court', category: 'Training' },
  { file: 'group-class-2.jpg', caption: 'Our training group', category: 'Training' },
  { file: 'group-clay.jpg', caption: 'Junior batch on the clay court', category: 'Training' },
  { file: 'coach-with-players.jpg', caption: 'Coach with two young players', category: 'Training' },
  { file: 'coaching-session.jpg', caption: 'Coaching session', category: 'Training' },
  { file: 'night-training.jpg', caption: 'Evening training', category: 'Training' },
  { file: 'night-session.jpg', caption: 'Evening session', category: 'Training' },
  { file: 'junior-champion.jpg', caption: 'Tournament winner', category: 'Tournaments' },
  { file: 'tournament-winners.jpg', caption: 'Tournament winners', category: 'Tournaments' },
  { file: 'tournament-trophies.jpg', caption: 'Tournament trophies', category: 'Tournaments' },
  { file: 'conference-stage.jpg', caption: 'ITF Worldwide Coaches Conference', category: 'Conferences' },
  { file: 'conference-news.jpg', caption: 'In the news: coaches conference', category: 'Conferences' },
  { file: 'conference-1.jpg', caption: 'Coaching conference', category: 'Conferences' },
  { file: 'conference-2.jpg', caption: 'Coaching conference', category: 'Conferences' },
  { file: 'conference-3.jpg', caption: 'Coaching conference', category: 'Conferences' },
  { file: 'conference-4.jpg', caption: 'Coaching conference', category: 'Conferences' },
  { file: 'conference-5.jpg', caption: 'Coaching conference', category: 'Conferences' },
];
