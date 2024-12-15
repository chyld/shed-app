'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewShed() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const shedData = {
      title: formData.get('title'),
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount') as string),
    };
    
    try {
      const response = await fetch('/api/sheds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shedData),
      });
      
      if (response.ok) {
        const { shed } = await response.json();
        router.push(`/sheds/${shed.id}`);
        router.refresh();
      } else {
        throw new Error('Failed to create shed');
      }
    } catch (error) {
      console.error('Error creating shed:', error);
      alert('Failed to create shed');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Create New Shed
      </h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Price ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="0"
            step="0.01"
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: submitting ? '#ccc' : '#0066cc',
              color: 'white',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? 'Creating...' : 'Create Shed'}
          </button>
          
          <Link
            href="/sheds"
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
} 