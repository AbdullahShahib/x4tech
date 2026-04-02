import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SocialConnect } from '../ui/connect-with-us';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--x4-border)' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', letterSpacing: '0.05em', color: '#fff', marginBottom: '1rem' }}>
              X4<span style={{ color: 'var(--x4-cyan)' }}>TECH</span>
            </div>
            <p style={{ color: 'var(--x4-muted)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '300px', marginBottom: '1.5rem' }}>
              A freelance tech agency building apps, websites, and brand identities that grow businesses.
            </p>
            <p style={{ color: 'var(--x4-cyan)', fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Contact Us
            </p>
          </div>

          {/* Links */}
          {[
            { title: 'Services', links: ['Web Development', 'App Development', 'Logo Design', 'Brand Identity', 'UI/UX Design', 'Poster Design'] },
            { title: 'Company', links: ['About Us', 'Our Work', 'Process', 'Blog', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.3em', color: 'var(--x4-cyan)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{title}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href={title === 'Company' && link === 'About Us' ? '/about' : '#'} style={{ color: 'var(--x4-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseEnter={e => e.target.style.color = 'var(--x4-text)'}
                      onMouseLeave={e => e.target.style.color = 'var(--x4-muted)'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem', border: '1px solid var(--x4-border)', background: 'var(--x4-dark)' }}>
          <SocialConnect compact />
        </div>

        <div style={{ paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--x4-muted)' }}>
            © 2025 X4TECH. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--x4-muted)' }}>
            BUILT WITH ♥ IN INDIA
          </p>
          <button onClick={scrollTop} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--x4-muted)', background: 'transparent', border: '1px solid var(--x4-border)', padding: '0.5rem 1rem', cursor: 'pointer', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--x4-cyan)'; e.currentTarget.style.color = 'var(--x4-cyan)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--x4-border)'; e.currentTarget.style.color = 'var(--x4-muted)'; }}>
            Back to Top <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
