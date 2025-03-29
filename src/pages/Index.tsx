
import React from 'react';
import Exercizer from '../components/Exercizer';

const Index = () => {
  const handleExercizeComplete = (result) => {
    console.log('Exercise completed:', result);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Exercizer Demo</h1>
        <p className="mt-3 text-xl text-gray-500">
          A reusable component for interactive skill assessments
        </p>
      </header>
      
      <main className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <Exercizer 
            subject="programming" 
            onComplete={handleExercizeComplete}
          />
        </div>
      </main>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Exercizer Component Demo
      </footer>
    </div>
  );
};

export default Index;
