'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Objection<span className="text-blue-500">.ai</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-12">
            Your AI-powered legal assistant for mastering case studies
          </p>
          
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                What we offer:
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-700/50 backdrop-blur-sm rounded-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">
                    Plaintiff Arguments
                  </h3>
                  <p className="text-gray-300">
                    Generate compelling arguments for the plaintiff's perspective using constitutional principles and legal precedents.
                  </p>
                </div>
                <div className="p-6 bg-gray-700/50 backdrop-blur-sm rounded-lg transform transition-all duration-300 hover:scale-105">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">
                    Defense Strategies
                  </h3>
                  <p className="text-gray-300">
                    Develop strong defense arguments backed by legal frameworks and BARBRI exam materials.
                  </p>
                </div>
              </div>
            </div>

            <Link 
              href="/analyze"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Start Analyzing Cases
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 