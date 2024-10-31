import React from 'react';
import { Calculator } from './components/Calculator';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Navigation />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              CTC Calculator
            </h1>
            <p className="text-gray-600">
              Calculate your take-home salary and understand your complete compensation structure
            </p>
          </header>
          <Calculator />
          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>© 2024 CTC Calculator. All calculations are for illustration purposes only.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;