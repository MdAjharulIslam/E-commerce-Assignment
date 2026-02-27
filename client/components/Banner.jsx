'use client'
import Link from 'next/link';

export default function Banner({ 
  title = "Welcome to MyShop", 
  subtitle = "Find the best products at unbeatable prices!", 
  buttonText = "Shop Now", 
  buttonLink = "/allProducts",
}) {
  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-50 via-blue-50/80 to-emerald-50/70">
     
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/15 to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-white/50" />
      
      
      <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 rounded-2xl -rotate-12 blur-sm translate-x-2 sm:translate-x-4 shadow-lg" />
      <div className="absolute bottom-12 left-6 sm:bottom-20 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-emerald-400/50 rounded-full blur-xl translate-y-2 sm:translate-y-4 shadow-xl" />
      <div className="absolute top-1/2 right-12 sm:right-20 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-100/60 to-white/70 rounded-lg -skew-x-12 shadow-md" />
      
      <div className="absolute top-12 sm:top-16 right-16 sm:right-24 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-yellow-400/90 to-amber-300/90 rounded-full shadow-lg" />
      <div className="absolute bottom-16 sm:bottom-24 left-12 sm:left-20 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-emerald-400/90 to-teal-300/90 rounded-full shadow-lg" />

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-12 lg:px-24 text-center">
        <div className="max-w-4xl mx-auto">
          
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-emerald-200/60 text-xs sm:text-sm font-bold tracking-wide">
            <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-1.5 shadow-sm"></span>
            <span className="bg-gradient-to-r from-emerald-700 to-blue-800 bg-clip-text text-transparent">🔥 TRENDING CHOICE</span>
          </div>
          
         
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 bg-clip-text text-transparent mb-4 sm:mb-6 pb-2 sm:pb-4 leading-none drop-shadow-2xl tracking-tight">
            {title}
          </h1>
          
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-slate-800/95 drop-shadow-lg max-w-2xl mx-auto leading-relaxed tracking-wide mb-6 sm:mb-10">
            {subtitle}
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={buttonLink}>
              <button className="group relative bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white px-8 sm:px-10 py-3.5 sm:py-5 rounded-2xl sm:rounded-3xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border-0 overflow-hidden backdrop-blur-md">
                <span className="relative z-10 flex items-center justify-center">
                  {buttonText}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            
            <Link href="/about">
              <button className="px-8 sm:px-10 py-3.5 sm:py-5 bg-white/95 hover:bg-white text-slate-900 font-bold text-lg sm:text-xl rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-slate-200/60 backdrop-blur-md">
                Learn More →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
