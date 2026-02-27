'use client'

import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    setStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-50 via-blue-50/80 to-emerald-50/70 py-16 sm:py-20 md:py-24 mt-24">

      
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/15 to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-white/50" />

     
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-2xl -rotate-12 blur-sm translate-x-2 sm:translate-x-4 shadow-lg" />
      <div className="absolute bottom-12 left-6 sm:bottom-20 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-emerald-400/50 rounded-full blur-xl translate-y-2 sm:translate-y-4 shadow-xl" />
      <div className="absolute top-1/2 right-12 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-100/60 to-white/70 rounded-lg -skew-x-12 shadow-md" />
      <div className="absolute top-1/3 left-8 sm:left-16 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-tr from-blue-200/30 to-emerald-100/40 rounded-xl rotate-6 blur-sm shadow-md" />

      
      <div className="absolute top-12 sm:top-16 right-16 sm:right-24 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-yellow-400/90 to-amber-300/90 rounded-full shadow-lg" />
      <div className="absolute bottom-16 sm:bottom-24 left-12 sm:left-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-emerald-400/90 to-teal-300/90 rounded-full shadow-lg" />
      <div className="absolute top-8 left-1/3 w-1.5 h-1.5 bg-gradient-to-r from-blue-400/80 to-indigo-300/80 rounded-full shadow-md" />

      
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-12 lg:px-24 text-center">
        <div className="max-w-2xl mx-auto w-full">

         
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-emerald-200/60 text-xs sm:text-sm font-bold tracking-wide">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-1.5 shadow-sm"></span>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-800 bg-clip-text text-transparent">✉️ STAY IN THE LOOP</span>
          </div>

          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent mb-4 sm:mb-6 pb-2 leading-none drop-shadow-2xl tracking-tight">
            Never Miss a Deal!
          </h1>

          
          <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-800/95 drop-shadow-lg max-w-lg mx-auto leading-relaxed tracking-wide mb-8 sm:mb-10">
            Subscribe for latest offers, new arrivals &amp; exclusive discounts
          </p>

          
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <input
                className="w-full px-5 sm:px-7 py-4 sm:py-5 text-base sm:text-lg bg-transparent outline-none border-0 placeholder-slate-400 text-slate-900 font-medium focus:placeholder-transparent"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || status === 'success'}
                className="group relative m-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transform transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Thank you!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            
            {status && (
              <div className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                status === 'success'
                  ? 'bg-emerald-50/90 border-emerald-200/60 text-emerald-800 shadow-lg'
                  : 'bg-red-50/90 border-red-200/60 text-red-800 shadow-lg'
              }`}>
                {status === 'success' ? (
                  <>
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Successfully subscribed to our newsletter!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-2 0v4a1 1 0 102 0V5z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Something went wrong. Please try again.</span>
                  </>
                )}
              </div>
            )}
          </form>

        
          <p className="mt-5 text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;