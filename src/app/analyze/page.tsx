'use client';

import React, { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function AnalyzePage() {
  const [caseText, setCaseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<{
    plaintiff: string[];
    defense: string[];
  } | null>(null);

  const analyzeCaseStudy = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseText }),
      });

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error analyzing case:', error);
      // TODO: Add proper error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Case Analysis</h1>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <label className="block text-lg text-gray-300 mb-4">
                Enter your case study:
              </label>
              <textarea
                className="w-full h-64 p-4 bg-gray-700/50 backdrop-blur-sm text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                placeholder="Paste your case study text here..."
              />
              <button
                onClick={analyzeCaseStudy}
                disabled={loading || !caseText.trim()}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Case'
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {analysis && (
              <>
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                    Plaintiff Arguments
                  </h2>
                  <ul className="list-disc list-inside space-y-3">
                    {analysis.plaintiff.map((point, index) => (
                      <li key={index} className="text-gray-300 leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                    Defense Arguments
                  </h2>
                  <ul className="list-disc list-inside space-y-3">
                    {analysis.defense.map((point, index) => (
                      <li key={index} className="text-gray-300 leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 