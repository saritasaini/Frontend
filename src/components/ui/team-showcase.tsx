import { useState } from 'react';
import { FaLinkedinIn, FaTwitter, FaInstagram, FaQuoteRight } from 'react-icons/fa';
import { cn } from '../../lib/utils';

const DEFAULT_CUSTOMERS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'COFFEE ENTHUSIAST',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "The best brew in the city. The royal essence is truly captured in every cup.",
    social: { twitter: '#', instagram: '#' },
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'REGULAR PATRON',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "The ambiance reminds me of the heritage cafes in Jaipur. A must-visit!",
    social: { linkedin: '#' },
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'FOOD CRITIC',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "Exceptional service and the pastries are to die for. 5 stars!",
    social: { instagram: '#', twitter: '#' },
  },
  {
    id: '4',
    name: 'Marcus Thorne',
    role: 'BUSINESS TRAVELER',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "Perfect spot for morning meetings. The wifi is fast and the coffee is better.",
    social: { linkedin: '#' },
  },
  {
    id: '5',
    name: 'Sophia Lee',
    role: 'LIFESTYLE BLOGGER',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "Every corner is Instagrammable. And the 'Royal Essence' roast is heaven.",
    social: { instagram: '#', twitter: '#' },
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'LOCAL ARTIST',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop',
    quote: "I spend my afternoons here sketching. The natural light is perfect.",
    social: { instagram: '#' },
  },
];

export default function HappyCustomers({ customers = DEFAULT_CUSTOMERS }) {
  const [hoveredId, setHoveredId] = useState(null);

  const activeCustomer = customers.find(c => c.id === hoveredId) || customers[0];

  const col1 = customers.filter((_, i) => i % 3 === 0);
  const col2 = customers.filter((_, i) => i % 3 === 1);
  const col3 = customers.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-16 select-none w-full max-w-7xl mx-auto py-12 px-4 md:px-8 font-sans overflow-visible">
      {/* ── Left: photo grid ── */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 flex-shrink-0 w-full max-w-[600px]">
        {/* Column 1 */}
        <div className="flex flex-col gap-3 md:gap-6">
          {col1.map((customer) => (
            <PhotoCard
              key={customer.id}
              customer={customer}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3 md:gap-6 mt-12 md:mt-20">
          {col2.map((customer) => (
            <PhotoCard
              key={customer.id}
              customer={customer}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3 md:gap-6 mt-6 md:mt-10">
          {col3.map((customer) => (
            <PhotoCard
              key={customer.id}
              customer={customer}
              className="aspect-[4/5] w-full"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Testimonial & List ── */}
      <div className="flex flex-col gap-12 flex-1 w-full xl:max-w-xl">
        {/* Active Testimonial */}
        <div className="min-h-[220px] flex flex-col justify-center bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative overflow-hidden group">
          <FaQuoteRight className="absolute top-4 right-6 text-primary/10 text-6xl" />
          <p className="text-xl md:text-2xl italic text-white/90 leading-relaxed relative z-10">
            "{activeCustomer.quote}"
          </p>
          <div className="mt-6 flex items-center gap-4 relative z-10">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-bold tracking-widest text-sm uppercase">{activeCustomer.name}</span>
          </div>
        </div>

        {/* Customer List */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 xl:flex xl:flex-col gap-6">
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoCard({ customer, className, hoveredId, onHover }) {
  const isActive = hoveredId === customer.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-2xl',
        className,
        isDimmed ? 'opacity-30 scale-90 grayscale blur-[2px]' : 'opacity-100 scale-100',
        isActive ? 'ring-4 ring-primary shadow-primary/30 z-20' : 'ring-1 ring-white/10'
      )}
      onMouseEnter={() => onHover(customer.id)}
      onMouseLeave={() => onHover(null)}
    >
      <img
        src={customer.image}
        alt={customer.name}
        className="w-full h-full object-cover transition-all duration-1000"
        style={{
          transform: isActive ? 'scale(1.15)' : 'scale(1)',
          filter: isActive ? 'brightness(1.1)' : 'brightness(0.8)'
        }}
      />
    </div>
  );
}

function CustomerRow({ customer, hoveredId, onHover }) {
  const isActive = hoveredId === customer.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        'cursor-pointer transition-all duration-300 flex flex-col gap-1',
        isDimmed ? 'opacity-30' : 'opacity-100',
        isActive ? 'translate-x-4' : 'translate-x-0'
      )}
      onMouseEnter={() => onHover(customer.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-center gap-4">
        <span className={cn(
          "h-2 w-2 rounded-full transition-all duration-500",
          isActive ? "bg-primary scale-150" : "bg-white/20"
        )} />
        <span className={cn(
          "text-lg font-bold tracking-tight transition-colors",
          isActive ? "text-primary" : "text-white/80"
        )}>
          {customer.name}
        </span>
      </div>
      <p className={cn(
        "pl-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
        isActive ? "text-primary/60" : "text-white/30"
      )}>
        {customer.role}
      </p>
    </div>
  );
}
