import { useEffect, useState } from 'react';
import { photos, categories, type Category } from '../data/gallery';

export function Gallery() {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [open, setOpen] = useState<number | null>(null);
  const shown = photos.filter((p) => filter === 'All' || p.category === filter);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i === null ? i : (i + 1) % shown.length));
      if (e.key === 'ArrowLeft') setOpen((i) => (i === null ? i : (i - 1 + shown.length) % shown.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, shown.length]);

  const chip = (on: boolean) =>
    `px-5 py-2 rounded-full font-rajdhani tracking-wide border transition-colors ${on ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-white/30 text-white/80 hover:border-[#0066FF]'}`;

  const cur = open !== null ? shown[open] : null;

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10 opacity-0 animate-fade-in-up">
          <div className="font-rajdhani mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>GALLERY</div>
          <h2 className="font-bebas section-title mb-6 inline-block" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#ffffff' }}>
            SEE US IN ACTION
          </h2>
          <p className="font-outfit text-white/80 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.8' }}>
            Our classes, our players and some proud moments.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(['All', ...categories] as const).map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={chip(filter === c)} style={{ fontSize: '15px' }}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shown.map((p, i) => (
            <button
              key={p.file}
              onClick={() => setOpen(i)}
              className="group relative overflow-hidden rounded-lg aspect-square bg-white/5 text-left"
              aria-label={`Open photo: ${p.caption}`}
            >
              <img src={`/gallery/${p.file}`} alt={p.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10">
                <div className="font-outfit text-white" style={{ fontSize: '13px' }}>{p.caption}</div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-center font-outfit text-white/60 mt-10" style={{ fontSize: '14px' }}>More photos coming soon!</p>
      </div>

      {cur && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button aria-label="Close" onClick={() => setOpen(null)} className="absolute top-4 right-4 w-11 h-11 text-white" style={{ fontSize: '32px' }}>×</button>
          <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open! - 1 + shown.length) % shown.length); }} className="absolute left-2 md:left-6 w-11 h-11 text-white" style={{ fontSize: '40px' }}>‹</button>
          <figure className="max-w-4xl text-center" onClick={(e) => e.stopPropagation()}>
            <img src={`/gallery/${cur.file}`} alt={cur.caption} className="max-h-[78vh] max-w-full mx-auto rounded-md" />
            <figcaption className="font-outfit text-white/90 mt-3" style={{ fontSize: '15px' }}>{cur.caption}</figcaption>
          </figure>
          <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open! + 1) % shown.length); }} className="absolute right-2 md:right-6 w-11 h-11 text-white" style={{ fontSize: '40px' }}>›</button>
        </div>
      )}
    </section>
  );
}
