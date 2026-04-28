"use client";
import { useState } from 'react';
import { createClient } from '../../lib/supabase';
import { cn } from '../../lib/utils';
const supabase = createClient()
export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login & Sign Up

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Registration successful! Check your email for verification.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = '/dashboard'; // লগইন হলে ড্যাশবোর্ডে পাঠিয়ে দেবে
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-[32px] shadow-2xl border border-gray-100 mt-10">
      <h2 className="text-3xl font-bold mb-2 text-brand-dark">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
      <p className="text-gray-500 mb-8 text-sm">{isSignUp ? 'Join the Royal Bengal Tigers Cleaning service today.' : 'Manage your bookings and profile.'}</p>
      
      <form onSubmit={handleAuth} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-2 ml-1">Email</label>
          <input 
            type="email" required placeholder="name@email.com"
            className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
          <input 
            type="password" required placeholder="••••••••"
            className="w-full p-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-brand-yellow outline-none transition-all"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          disabled={loading}
          className="w-full bg-brand-yellow hover:bg-brand-hoverYellow text-brand-dark font-bold py-4 rounded-2xl transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-brand-yellow/20"
        >
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-brand-dark font-bold underline hover:text-brand-yellow transition-colors"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>

        {message && (
          <div className={cn("p-4 rounded-xl text-center text-sm font-medium", message.includes('Error') || message.includes('fail') ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600")}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}