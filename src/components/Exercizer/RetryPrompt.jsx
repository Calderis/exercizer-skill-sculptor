
import React from 'react';
import { Button } from '@/components/ui/button';

const RetryPrompt = ({ success, score, onRetryDecision }) => {
  return (
    <div className="text-center py-8">
      <h3 className="text-2xl font-bold mb-2">
        {success ? 'Well done!' : 'Keep practicing!'}
      </h3>
      
      <p className="text-lg text-gray-600 mb-6">
        {success 
          ? `You scored ${score}%. Would you like to try another exercise?` 
          : `You scored ${score}%. Would you like to try again?`}
      </p>
      
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={() => onRetryDecision(false)}
          className="border-gray-300 hover:bg-gray-100"
        >
          No, I'm done
        </Button>
        
        <Button
          onClick={() => onRetryDecision(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Yes, {success ? 'new exercise' : 'try again'}
        </Button>
      </div>
    </div>
  );
};

export default RetryPrompt;
