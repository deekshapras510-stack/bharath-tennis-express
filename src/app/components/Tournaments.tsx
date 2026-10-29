import { useState } from 'react';
import { tournaments, notices, type Tournament, type Match } from '../data/tournaments';

const PHONE_WA = '919663483651';

const fmt = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const dateRange = (t: Tournament) =>
  t.endDate && t.endDate !== t.startDate ? `${fmt(t.startDate)} to ${fmt(t.endDate)}` : fmt(t.startDate);

const statusStyle: Record<Tournament['status'], { label: string; bg: string }> = {
  upcoming: { label: 'UPCOMING', bg: '#0066FF' },
  live: { label: 'LIVE NOW', bg: '#d4183d' },
  completed: { label: 'COMPLETED', bg: '#666666' },
};

const noticeColor = { Class: '#0066FF', Tournament: '#d97706', General: '#666666' } as const;

function MatchCard({ m }: { m: Match }) {
  const row = (name: string, won: boolean, lost: boolean) => (
    <div
      className="flex items-center justify-between gap-3 px-3 py-2 font-outfit"
      style={{
        fontSize: '14px',
        background: won ? '#e6f0ff' : '#ffffff',
        color: name === 'TBD' ? '#999999' : lost ? '#888888' : '#000000',
        fontWeight: won ? 600 : 400,
      }}
    >
      <span>{name}</span>
      {won && <span style={{ color: '#0066FF' }}>✓</span>}
    </div>
  );
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden w-56 shadow-sm bg-white">
      {row(m.p1, m.winner === 1, m.winner === 2)}
      <div className="border-t border-gray-200" />
      {row(m.p2, m.winner === 2, m.winner === 1)}
      {(m.score || m.when) && (
        <div className="bg-gray-50 border-t border-gray-200 px-3 py-1 font-outfit" style={{ fontSize: '12px', color: '#555555' }}>
          {m.score ?? m.when}
        </div>
      )}
    </div>
  );
}

export function Tournaments() {
  const [tab, setTab] = useState<'upcoming' | 'draws' | 'notices'>('upcoming');
  const withDraws = tournaments.filter((t) => t.draws?.length);
  const [tid, setTid] = useState(withDraws[0]?.id ?? '');
  const [cat, setCat] = useState('');
  const [filter, setFilter] = useState<'All' | 'Class' | 'Tournament' | 'General'>('All');

  const current = withDraws.find((t) => t.id === tid) ?? withDraws[0];
  const draw = current?.draws?.find((d) => d.category === cat) ?? current?.draws?.[0];

  const openDraws = (id: string) => { setTid(id); setCat(''); setTab('draws'); };
  const register = (t: Tournament) =>
    `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(`Hello, I would like to register for ${t.name} (${dateRange(t)}).`)}`;

  const active = tournaments.filter((t) => t.status !== 'completed');
  const past = tournaments.filter((t) => t.status === 'completed');
  const shownNotices = notices.filter((n) => filter === 'All' || n.type === filter);

  const tabs = [
    { id: 'upcoming', label: 'TOURNAMENTS' },
    { id: 'draws', label: 'DRAWS' },
    { id: 'notices', label: `NOTICES (${notices.length})` },
  ] as const;

  const chip = (on: boolean) =>
    `px-4 py-2 rounded-full font-outfit border transition-colors ${on ? 'bg-[#0066FF] text-white border-[#0066FF]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#0066FF]'}`;

  return (
    <section id="tournaments" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 opacity-0 animate-fade-in-up">
          <div className="font-rajdhani mb-4" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '3px' }}>
            COMPETE WITH US
          </div>
          <h2 className="font-bebas section-title mb-6 inline-block" style={{ fontSize: 'clamp(40px, 6vw, 64px)', color: '#000000' }}>
            TOURNAMENTS, DRAWS &amp; NOTICES
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 rounded-md font-rajdhani tracking-wide transition-colors ${tab === t.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              style={{ fontSize: '16px' }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'upcoming' && (
          <div>
            {active.length === 0 && (
              <p className="text-center font-outfit text-gray-600">No tournaments scheduled right now. Check back soon!</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {active.map((t) => (
                <div key={t.id} className="rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col bg-white">
                  <span className="self-start text-white rounded-full px-3 py-1 font-rajdhani mb-4" style={{ fontSize: '12px', letterSpacing: '1px', background: statusStyle[t.status].bg }}>
                    {statusStyle[t.status].label}
                  </span>
                  <h3 className="font-bebas mb-3" style={{ fontSize: '28px', color: '#000', letterSpacing: '1px' }}>{t.name}</h3>
                  <ul className="font-outfit space-y-2 mb-4" style={{ fontSize: '14px', color: '#444' }}>
                    <li>📅 {dateRange(t)}</li>
                    <li>📍 {t.venue}</li>
                    <li>🎾 {t.categories.join(', ')}</li>
                    {t.fee && <li>💰 {t.fee}</li>}
                    {t.registerBy && <li>⏰ Register by {fmt(t.registerBy)}</li>}
                  </ul>
                  {t.info && <p className="font-outfit mb-5" style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{t.info}</p>}
                  <div className="mt-auto flex flex-wrap gap-3">
                    {t.status === 'upcoming' && (
                      <a href={register(t)} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-3 rounded-md font-rajdhani text-white tracking-wide">
                        REGISTER
                      </a>
                    )}
                    {t.draws?.length ? (
                      <button onClick={() => openDraws(t.id)} className="px-5 py-3 rounded-md font-rajdhani border border-black tracking-wide hover:bg-black hover:text-white transition-colors">
                        VIEW DRAWS
                      </button>
                    ) : (
                      <span className="font-outfit self-center" style={{ fontSize: '13px', color: '#888' }}>Draws not released yet</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {past.length > 0 && (
              <div className="mt-14">
                <h3 className="font-bebas mb-4" style={{ fontSize: '28px', letterSpacing: '1px' }}>PAST TOURNAMENTS</h3>
                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
                  {past.map((t) => (
                    <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 p-4 font-outfit">
                      <div>
                        <div style={{ fontSize: '16px', color: '#000' }}>{t.name}</div>
                        <div style={{ fontSize: '13px', color: '#666' }}>{dateRange(t)} · {t.categories.join(', ')}</div>
                      </div>
                      {t.draws?.length ? (
                        <button onClick={() => openDraws(t.id)} className="text-[#0066FF] font-rajdhani tracking-wide">VIEW RESULTS →</button>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'draws' && (
          <div>
            {!current ? (
              <p className="text-center font-outfit text-gray-600">No draws have been released yet.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <label className="font-outfit" style={{ fontSize: '14px', color: '#444' }}>
                    Tournament{' '}
                    <select
                      value={current.id}
                      onChange={(e) => { setTid(e.target.value); setCat(''); }}
                      className="ml-2 border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
                    >
                      {withDraws.map((t) => <option key={t.id} value={t.id}>{t.name} ({statusStyle[t.status].label.toLowerCase()})</option>)}
                    </select>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {current.draws!.map((d) => (
                      <button key={d.category} onClick={() => setCat(d.category)} className={chip(draw?.category === d.category)} style={{ fontSize: '14px' }}>
                        {d.category}
                      </button>
                    ))}
                  </div>
                </div>

                {draw && (
                  <div className="overflow-x-auto pb-4">
                    <div className="flex gap-10 min-w-max">
                      {draw.rounds.map((r) => (
                        <div key={r.name} className="flex flex-col">
                          <div className="font-rajdhani mb-3 text-center" style={{ fontSize: '14px', color: '#0066FF', letterSpacing: '2px' }}>
                            {r.name.toUpperCase()}
                          </div>
                          <div className="flex flex-col justify-around gap-4 flex-1">
                            {r.matches.map((m, i) => <MatchCard key={i} m={m} />)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <p className="font-outfit mt-4" style={{ fontSize: '13px', color: '#777' }}>Scroll sideways to see all rounds. ✓ marks the winner.</p>
              </>
            )}
          </div>
        )}

        {tab === 'notices' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {(['All', 'Class', 'Tournament', 'General'] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={chip(filter === f)} style={{ fontSize: '14px' }}>{f}</button>
              ))}
            </div>
            <div className="space-y-4">
              {shownNotices.length === 0 && <p className="text-center font-outfit text-gray-600">No notices in this category.</p>}
              {shownNotices.map((n, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" style={{ borderLeft: `5px solid ${noticeColor[n.type]}` }}>
                  <div className="flex flex-wrap items-center gap-3 mb-2 font-rajdhani" style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    <span style={{ color: noticeColor[n.type] }}>{n.type.toUpperCase()}</span>
                    {n.important && <span className="bg-red-600 text-white rounded-full px-2 py-0.5">IMPORTANT</span>}
                    <span className="text-gray-500">{fmt(n.date)}</span>
                  </div>
                  <h4 className="font-outfit" style={{ fontSize: '17px', color: '#000', fontWeight: 600 }}>{n.title}</h4>
                  <p className="font-outfit mt-1" style={{ fontSize: '15px', color: '#555', lineHeight: '1.6' }}>{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
