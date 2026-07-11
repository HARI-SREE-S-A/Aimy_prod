'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <button 
      onClick={handleLogout}
      style={{ 
        width: '100%', 
        padding: '12px', 
        background: 'transparent', 
        border: '1px solid #444', 
        color: '#E31E24', 
        borderRadius: '8px', 
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'background 0.2s'
      }}
      onMouseOver={(e) => e.target.style.background = 'rgba(227, 30, 36, 0.1)'}
      onMouseOut={(e) => e.target.style.background = 'transparent'}
    >
      Sign Out
    </button>
  );
}
