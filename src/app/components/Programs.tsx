import { useState } from 'react';
import { programs, whyUs, type Program } from '../data/programs';

const PHONE_WA = '919663483651';

function List({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-2">
      {items.map((x) => (
        <li key={x} className="font-outfit flex items-start gap-3" style={{ fontSize: '15px', color: '#cccccc', lineHeight: '1.6' }}>
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
          {x}
        </li>
      ))}
    </ul>
  );
}

function Heading({ children, color }: { children: string; color: string }) {
  return (
    <h4 className="font-rajdhani mb-3" style={{ fontSize: '14px', color, letterSpacing: '2px' }}>
      {children}
    </h4>
  );
}

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="divide-y divide-white/10 border border-white/10 rounded-md">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between gap-4 px-4 py-2.5 font-outfit" style={{ fontSize: '14px' }}>
          <dt style={{ color: '#999999' }}>{r.label}</dt>
          <dd className="text-right" style={{ color: '#ffffff' }}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Programs({ onContact }: { onContact?: () => void }) {
  const [id, setId] = useState(programs[0].id);
  const p: Program = programs.find((x) => x.id === id) ?? programs[0];
  const pathway = programs.filter((x) => x.group === 'pathway');
  const other = programs.filter((x) => x.group === 'other');

  const pill = (x: Program) => (
    <button
      key={x.id}
      onClick={() => setId(x.id)}
      aria-pressed={id === x.id}
      className="px-4 py-2 rounded-full font-rajdhani tracking-wide border transition-colors"
      style={{
        fontSize: '15px',
        background: id === x.id ? x.color : 'transparent',
        borderColor: x.color,
        color: '#ffffff',
      }}
    >
      {x.name}
    </button>
  );

  const enquire = `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(`Hello, I would like to know more about the ${p.name} program.`)}`;

  return (
    <section id="programs" className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 opacity-0 animate-fade-in-up">
          <div className="font-rajdhani mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>OUR PROGRAMS</div>
          <h2 className="font-bebas section-title mb-6 inline-block" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#ffffff' }}>
            TRAINING FOR EVERY LEVEL
          </h2>
          <p className="font-outfit text-white/80 max-w-2xl mx-auto" style={{ fontSize: '16px', lineHeight: '1.8' }}>
            Players move step by step through our junior pathway, using the right ball and court size for their age.
            Pick a program to see exactly what it covers.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div>
            <div className="font-rajdhani mb-3 text-center" style={{ fontSize: '12px', color: '#888888', letterSpacing: '2px' }}>
              JUNIOR PATHWAY
            </div>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {pathway.map((x, i) => (
                <span key={x.id} className="flex items-center gap-2">
                  {pill(x)}
                  {i < pathway.length - 1 && <span aria-hidden style={{ color: '#555555' }}>→</span>}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="font-rajdhani mb-3 text-center" style={{ fontSize: '12px', color: '#888888', letterSpacing: '2px' }}>
              ALSO AVAILABLE
            </div>
            <div className="flex flex-wrap justify-center gap-2">{other.map(pill)}</div>
          </div>
        </div>

        <div className="glass-effect rounded-lg p-6 md:p-10" key={p.id}>
          <div className="h-1 w-16 mb-6" style={{ background: p.color }} />
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h3 className="font-bebas" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#ffffff', letterSpacing: '1px' }}>
                {p.name.toUpperCase()}
              </h3>
              <div className="font-rajdhani" style={{ fontSize: '15px', color: p.color === '#0066FF' ? '#00AAFF' : p.color, letterSpacing: '1px' }}>
                {p.audience.toUpperCase()}
              </div>
            </div>
            <a href={enquire} target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-3 rounded-md font-rajdhani tracking-wide text-white">
              ENQUIRE ON WHATSAPP
            </a>
          </div>

          <p className="font-outfit mb-8 max-w-3xl" style={{ fontSize: '17px', lineHeight: '1.8', color: '#dddddd' }}>{p.summary}</p>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <Heading color={p.color}>WHAT WE FOCUS ON</Heading>
                <List items={p.focus} color={p.color} />
              </div>
              <div>
                <Heading color={p.color}>OBJECTIVES</Heading>
                <List items={p.objectives} color={p.color} />
              </div>
            </div>
            <div className="space-y-8">
              {p.specs && (
                <div>
                  <Heading color={p.color}>COURT &amp; BALL</Heading>
                  <Rows rows={p.specs} />
                </div>
              )}
              <div>
                <Heading color={p.color}>SCHEDULE</Heading>
                <Rows rows={p.schedule} />
              </div>
              <div>
                <Heading color={p.color}>FEES</Heading>
                {p.fees ? (
                  <Rows rows={p.fees} />
                ) : (
                  <p className="font-outfit" style={{ fontSize: '14px', color: '#aaaaaa' }}>
                    Contact us for current fees and batch availability.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-bebas text-center mb-10" style={{ fontSize: 'clamp(30px, 4vw, 40px)', color: '#ffffff', letterSpacing: '1px' }}>
            WHY CHOOSE BHARATH TENNIS EXPRESS
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="glass-effect rounded-lg p-6 flex gap-4">
                <div style={{ fontSize: '32px' }} aria-hidden>{w.icon}</div>
                <div>
                  <div className="font-rajdhani" style={{ fontSize: '17px', color: '#ffffff', letterSpacing: '1px' }}>{w.title.toUpperCase()}</div>
                  <p className="font-outfit mt-1" style={{ fontSize: '14px', lineHeight: '1.6', color: '#aaaaaa' }}>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="font-outfit text-white/80 mb-6" style={{ fontSize: '17px' }}>
            Not sure which program is right for you? Tell us your age and level and we will suggest one.
          </p>
          <button onClick={onContact} className="btn-primary px-8 py-4 rounded-md font-rajdhani tracking-wide text-white" style={{ fontSize: '16px' }}>
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
}
