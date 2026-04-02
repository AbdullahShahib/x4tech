import React, { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Twitter } from 'lucide-react';

type SocialLink = {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
};

type ActionButtonProps = {
  text: string;
  href: string;
};

export type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  title: string;
  bio: string;
  socialLinks?: SocialLink[];
  actionButton?: ActionButtonProps;
};

export function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-background transition-colors duration-500 sm:p-8 w-full">
      <ProfileCardDemo />
    </div>
  );
}

const ProfileCardDemo = () => {
  const cardProps: ProfileCardProps = {
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&q=80',
    name: 'Ravi Katiyar',
    title: 'Sr. Designer',
    bio: 'Building beautiful and intuitive digital experiences. Passionate about design systems and web animation.',
    socialLinks: [
      { id: 'github', icon: Github, label: 'GitHub', href: '#' },
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '#' },
      { id: 'twitter', icon: Twitter, label: 'Twitter', href: '#' },
    ],
    actionButton: {
      text: 'Contact Me',
      href: '#',
    },
  };

  return <GlassmorphismProfileCard {...cardProps} />;
};

export function GlassmorphismProfileCard({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
  actionButton,
}: ProfileCardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-sm">
      <div
        className="relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl bg-card/40 border-white/10"
        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="w-24 h-24 mb-4 rounded-full p-1 border-2 border-white/20">
          <img
            src={avatarUrl}
            alt={`${name}'s Avatar`}
            className="w-full h-full rounded-full object-cover"
            onError={(event) => {
              const target = event.currentTarget;
              target.onerror = null;
              target.src = `https://placehold.co/96x96/6366f1/white?text=${encodeURIComponent(name.charAt(0).toUpperCase())}`;
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-card-foreground">{name}</h2>
        <p className="mt-1 text-sm font-medium text-primary">{title}</p>
        <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">{bio}</p>

        <div className="w-1/2 h-px my-6 rounded-full bg-border" />

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {socialLinks.map((item) => (
            <SocialButton key={item.id} item={item} setHoveredItem={setHoveredItem} hoveredItem={hoveredItem} />
          ))}
        </div>

        {actionButton && <ActionButton action={actionButton} />}
      </div>

      <div className="absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ease-out blur-2xl opacity-30 bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />
    </div>
  );
}

type SocialButtonProps = {
  item: SocialLink;
  setHoveredItem: React.Dispatch<React.SetStateAction<string | null>>;
  hoveredItem: string | null;
};

function SocialButton({ item, setHoveredItem, hoveredItem }: SocialButtonProps) {
  return (
    <div className="relative">
      <a
        href={item.href}
        target={item.href.startsWith('mailto:') ? undefined : '_blank'}
        rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
        className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group overflow-hidden bg-secondary/50 hover:bg-secondary"
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
        aria-label={item.label}
      >
        <div className="relative z-10 flex items-center justify-center">
          <item.icon size={20} className="transition-all duration-200 ease-out text-secondary-foreground/70 group-hover:text-secondary-foreground" />
        </div>
      </a>
      <Tooltip item={item} hoveredItem={hoveredItem} />
    </div>
  );
}

function ActionButton({ action }: { action: ActionButtonProps }) {
  return (
    <a
      href={action.href}
      target={action.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={action.href.startsWith('mailto:') ? undefined : 'noreferrer'}
      className="flex items-center gap-2 px-6 py-3 mt-8 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 group bg-primary text-primary-foreground"
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
    >
      <span>{action.text}</span>
      <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
    </a>
  );
}

function Tooltip({ item, hoveredItem }: { item: SocialLink; hoveredItem: string | null }) {
  return (
    <div
      role="tooltip"
      className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs font-medium whitespace-nowrap transition-all duration-300 ease-out pointer-events-none bg-popover text-popover-foreground border-border ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
    >
      {item.label}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-popover border-b border-r border-border" />
    </div>
  );
}
