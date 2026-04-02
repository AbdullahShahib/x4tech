import React, { useState } from 'react';
import { Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';

type SocialConnectProps = {
  compact?: boolean;
};

const links = [
  { name: 'Instagram', href: '#', Icon: Instagram, color: 'hover:bg-pink-500' },
  { name: 'Discord', href: '#', Icon: MessageCircle, color: 'hover:bg-indigo-500' },
  { name: 'GitHub', href: '#', Icon: Github, color: 'hover:bg-zinc-700' },
  { name: 'LinkedIn', href: '#', Icon: Linkedin, color: 'hover:bg-sky-600' },
];

const SocialConnect = ({ compact = false }: SocialConnectProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${compact ? 'w-full' : 'min-h-screen'} bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4 font-sans`}>
      <div className={`w-full ${compact ? 'max-w-6xl' : 'max-w-3xl'} mx-auto text-center ${compact ? 'mb-8' : 'mb-16'}`}>
        <h1 className={`${compact ? 'text-3xl md:text-5xl' : 'text-6xl md:text-7xl'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4`}>
          Connect <span className="text-white">With Us</span>
        </h1>
        <p className={`text-gray-300 ${compact ? 'text-sm md:text-base max-w-3xl' : 'text-xl max-w-2xl'} mx-auto`}>
          Join our community and stay updated with the latest news, releases, and exclusive content
        </p>
      </div>

      <div className="relative w-full max-w-2xl">
        <div
          className="rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/90 border border-gray-700/50 shadow-2xl backdrop-blur-3xl overflow-hidden p-8 transition-all duration-500 hover:scale-[1.02]"
          style={{ boxShadow: '0 0 50px rgba(139, 92, 246, 0.35), 0 0 80px rgba(124, 58, 237, 0.2)' }}
        >
          <div className="flex flex-wrap justify-center gap-8">
            {links.map(({ name, href, Icon, color }) => (
              <a key={name} href={href} className="group flex flex-col items-center text-decoration-none transition-all duration-300">
                <div className={`inline-flex w-16 h-16 md:w-20 md:h-20 rounded-full justify-center items-center bg-white/5 shadow-xl backdrop-blur border border-white/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 ${color}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span className="mt-3 text-white/80 text-sm font-medium tracking-wide group-hover:text-white">{name}</span>
              </a>
            ))}
          </div>
        </div>

        {!compact && (
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="mx-auto mt-4 px-4 py-2 border border-white/20 text-white/80 text-sm rounded-full hover:text-white hover:border-white/40 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>
    </div>
  );
};

export { SocialConnect };
