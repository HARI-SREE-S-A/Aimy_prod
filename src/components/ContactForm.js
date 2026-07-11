'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("Supabase not configured. Simulated submission:", formData);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 1000);
      return;
    }

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);
        
      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '10px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
        <h3 style={{ marginBottom: '10px' }}>Message Sent Successfully!</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>Thank you for reaching out. We will get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline btn-sm">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      {status === 'error' && (
        <div style={{ background: '#ffeeee', color: '#E31E24', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          {errorMessage}
        </div>
      )}
      
      <div className="form-group">
        <label className="form-label" htmlFor="name">Full Name *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className="form-input" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            className="form-input" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="subject">Subject *</label>
        <input 
          type="text" 
          id="subject" 
          name="subject" 
          className="form-input" 
          value={formData.subject} 
          onChange={handleChange} 
          required 
        />
      </div>
      
      <div className="form-group">
        <label className="form-label" htmlFor="message">Message *</label>
        <textarea 
          id="message" 
          name="message" 
          className="form-textarea" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%' }}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
