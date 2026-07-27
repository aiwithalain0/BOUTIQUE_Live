'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useShop } from '@/context/ShopContext';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export const extractNameFromEmail = (emailStr: string): string => {
  if (!emailStr || !emailStr.includes('@')) return 'Valued Client';
  const prefix = emailStr.split('@')[0];
  const tokens = prefix.split(/[\._\-\+0-9]+/).filter(Boolean);
  if (tokens.length === 0) return 'Valued Client';
  return tokens
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
    .join(' ');
};

export const isValidEmailSyntax = (emailStr: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailStr.trim());
};

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, user, setUser, t } = useShop();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEmailValid = isValidEmailSyntax(email);
  const isPasswordValid = password.trim().length >= 4;
  const isFormValid = activeTab === 'signin'
    ? isEmailValid && isPasswordValid
    : isEmailValid && isPasswordValid && name.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      const msg = 'Please enter a valid email address and password.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!isValidEmailSyntax(email)) {
      const msg = 'Please enter a valid email address (e.g., name@domain.com).';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (!password || password.trim().length < 4) {
      const msg = 'Password must be at least 4 characters in length.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    if (activeTab === 'signup' && !name.trim()) {
      const msg = 'Full Name is required for account creation.';
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const computedName = activeTab === 'signup' && name.trim() ? name.trim() : extractNameFromEmail(email);
      const userProfile = {
        name: computedName,
        email: email.trim(),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
      setUser(userProfile);
      toast.success(
        activeTab === 'signin'
          ? `Welcome back, ${userProfile.name}!`
          : `Account created! Welcome to L’AVENIR, ${userProfile.name}.`
      );
      setAuthModalOpen(false);
      // Reset form
      setEmail('');
      setPassword('');
      setName('');
      setErrorMessage('');
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const googleUser = {
        name: 'Sara Designer',
        email: 'sara.designer@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      };
      setUser(googleUser);
      toast.success('Signed in with Google as Sara Designer');
      setAuthModalOpen(false);
    }, 800);
  };

  return (
    <Dialog open={authModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="max-w-md w-[92vw] sm:w-full bg-[#F3EDE2] border border-[#C2D0C0] text-[#222831] p-0 overflow-hidden rounded-3xl shadow-2xl">
        {/* Top Header */}
        <div className="bg-[#435B47] p-6 text-center relative border-b border-[#86A386]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#86A386] text-white border border-[#86A386] text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Atelier Client Portal</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
            L’AVENIR
          </DialogTitle>
          <DialogDescription className="text-xs text-white/90 mt-1 font-light leading-relaxed">
            {activeTab === 'signin'
              ? (t('auth.signInSubheading') || "Welcome back to L’AVENIR. Access your curated wishlist and cart.")
              : (t('auth.signUpSubheading') || "Join L’AVENIR for exclusive releases and personalized recommendations.")}
          </DialogDescription>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          {/* Universal Hard Wall Warning Banner */}
          {!user && (
            <div className="p-3.5 rounded-2xl bg-[#86A386]/20 border border-[#86A386] text-[#435B47] text-xs font-semibold flex items-center gap-2.5 shadow-sm">
              <AlertCircle className="w-4 h-4 text-[#435B47] shrink-0" />
              <span>Authentication required to add items or access your cart.</span>
            </div>
          )}

          {/* Tab Selection */}
          <div className="flex bg-white p-1 rounded-2xl border border-[#C2D0C0]">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'signin'
                  ? 'bg-[#435B47] text-white shadow-md'
                  : 'text-[#222831]/60 hover:text-[#222831]'
              }`}
            >
              {t('auth.login') || 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMessage('');
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                activeTab === 'signup'
                  ? 'bg-[#435B47] text-white shadow-md'
                  : 'text-[#222831]/60 hover:text-[#222831]'
              }`}
            >
              {t('auth.signup') || 'Create Account'}
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Google Social Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F3EDE2] text-[#222831] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 transition-all shadow-sm border border-[#C2D0C0]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t('auth.continueGoogle') || 'Continue with Google'}</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#C2D0C0] w-full"></div>
            <span className="bg-[#F3EDE2] px-3 text-[10px] uppercase font-bold text-[#222831]/50 tracking-widest absolute">
              or email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#222831]/80 mb-1.5">
                  {t('auth.fullName') || 'Full Name'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#222831]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Sara Designer"
                    className="w-full bg-white border border-[#C2D0C0] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47] transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#222831]/80 mb-1.5">
                {t('auth.email') || 'Email Address'} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#222831]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="sara.designer@gmail.com"
                  className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#222831] placeholder-[#222831]/40 focus:outline-none transition-all ${
                    email && !isEmailValid ? 'border-rose-500/80' : 'border-[#C2D0C0] focus:border-[#435B47]'
                  }`}
                />
              </div>
              {email && !isEmailValid && (
                <p className="text-[10px] text-rose-600 mt-1 font-medium">
                  Requires valid format with &apos;@&apos; and domain (e.g. sara.designer@gmail.com)
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#222831]/80 mb-1.5">
                {t('auth.password') || 'Password'} *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#222831]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="At least 4 characters"
                  className="w-full bg-white border border-[#C2D0C0] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#222831] placeholder-[#222831]/40 focus:outline-none focus:border-[#435B47] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#222831]/40 hover:text-[#222831]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => toast.info('Password reset link sent to your email.')}
                  className="text-[11px] text-[#435B47] hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
                isFormValid
                  ? 'bg-[#435B47] hover:bg-[#354938] text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 opacity-60 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {activeTab === 'signin'
                      ? (t('auth.login') || 'Sign In')
                      : (t('auth.registerAccount') || 'Register Account')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-[10px] text-[#222831]/60 text-center font-light pt-2 border-t border-[#C2D0C0]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#435B47]" />
            <span>Encrypted 256-bit SSL luxury checkout protection</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

