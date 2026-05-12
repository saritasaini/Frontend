import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaBehance, FaInstagram } from 'react-icons/fa';
import { cn } from '../../lib/utils';

const DEFAULT_MEMBERS = [
  {
    id: '1',
    name: 'Chadrack',
    role: 'DIRECTOR OF PHOTOGRAPHY',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    social: { twitter: '#', linkedin: '#', behance: '#' },
  },
  {
    id: '2',
    name: 'Mak VieSAinte',
    role: 'FOUNDER',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '3',
    name: 'Osiris Balonga',
    role: 'LEAD FRONT-END',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '4',
    name: 'Jacques',
    role: 'PRODUCT OWNER',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop',
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Riche Makso',
    role: 'CTO - PRODUCT DESIGNER',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop',
    social: { twitter: '#', linkedin: '#' },
  },
  {
    id: '6',
    name: 'Jemima',
    role: 'MAKE-UP ARTISTE',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop',
    social: { instagram: '#' },
  },
];

export default function TeamShowcase({ members = DEFAULT_MEMBERS }) {
  const [hoveredId, setHoveredId] = useState(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 select-none w-full max-w-6xl mx-auto py-12 px-4 md:px-8 font-sans overflow-hidden">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-3 md:gap-4 flex-shrink-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 md:gap-4">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[100px] h-[110px] sm:w-[130px] sm:h-[140px] md:w-[160px] md:h-[180px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 md:gap-4 mt-12 md:mt-16">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[145px] sm:h-[155px] md:w-[180px] md:h-[200px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[105px] h-[115px] sm:w-[135px] sm:h-[145px] md:w-[170px] md:h-[190px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list*/}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-6 md:gap-8 pt-4 lg:pt-12 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card 
───────────────────────────────────────── */

function PhotoCard({ member, className, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 transition-all duration-500 shadow-xl',
        className,
        isDimmed ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100 scale-100',
        isActive ? 'ring-2 ring-primary shadow-primary/20' : 'ring-1 ring-white/10'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover transition-all duration-700"
        style={{
          filter: isActive ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.7)',
          transform: isActive ? 'scale(1.1)' : 'scale(1)'
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({ member, hoveredId, onHover }) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial = member.social?.twitter || member.social?.linkedin || member.social?.instagram || member.social?.behance;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 group',
        isDimmed ? 'opacity-30 translate-x-0' : 'opacity-100 translate-x-2',
        isActive && 'translate-x-4'
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social*/}
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'h-px bg-primary transition-all duration-500',
            isActive ? 'w-12' : 'w-6 opacity-50',
          )}
        />
        <span
          className={cn(
            'text-lg md:text-2xl font-bold tracking-tight transition-colors duration-300',
            isActive ? 'text-primary' : 'text-white/90',
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              'flex items-center gap-3 ml-2 transition-all duration-300',
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4 pointer-events-none',
            )}
          >
            {member.social?.twitter && (
              <a href={member.social.twitter} className="text-white/60 hover:text-primary transition-colors"><FaTwitter size={16} /></a>
            )}
            {member.social?.linkedin && (
              <a href={member.social.linkedin} className="text-white/60 hover:text-primary transition-colors"><FaLinkedinIn size={16} /></a>
            )}
            {member.social?.instagram && (
              <a href={member.social.instagram} className="text-white/60 hover:text-primary transition-colors"><FaInstagram size={16} /></a>
            )}
            {member.social?.behance && (
              <a href={member.social.behance} className="text-white/60 hover:text-primary transition-colors"><FaBehance size={16} /></a>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[7px] md:text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {member.role}
      </p>
    </div>
  );
}
