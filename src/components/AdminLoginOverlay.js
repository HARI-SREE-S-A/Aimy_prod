'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import useSecretCode from '@/hooks/useSecretCode';

export default function AdminLoginOverlay() {
  const { isTriggered, setIsTriggered } = useSecretCode('Aimy2025');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsTriggered(false);
        setPassword('');
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isTriggered && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200, delay: 0.1 }}
            style={{
              background: '#111',
              padding: '50px',
              borderRadius: '20px',
              border: '1px solid #333',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setIsTriggered(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ✕
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem', fontWeight: 600 }}>System Access</h2>
              <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '10px' }}>Aimy Executive Dashboard</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(227, 30, 36, 0.1)', color: '#E31E24', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(227, 30, 36, 0.2)' }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '25px' }}>
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '1.1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#E31E24'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(90deg, #E31E24, #a01015)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'transform 0.1s',
                  boxShadow: '0 5px 15px rgba(227, 30, 36, 0.3)'
                }}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
