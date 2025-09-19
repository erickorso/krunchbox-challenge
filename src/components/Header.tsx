'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image 
                src="/Krunchbox-logo.svg" 
                alt="Krunchbox Logo" 
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Krunchbox
                </h1>
                <p className="text-xs text-gray-500">
                  Analytics Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/demo" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Demo
            </Link>
          </nav>

          {/* Versión */}
          <div className="hidden sm:flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              v2.0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
