
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const FeedbackDisplay = ({ evaluation, exercise, userAnswers, onContinue }) => {
  const { success, score, feedbackItems } = evaluation;
  
  // Find question details from the exercise data
  const getQuestionDetails = (questionId) => {
    return exercise.questions.find(q => q.id === questionId);
  };

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg text-white ${success ? 'bg-green-500' : 'bg-orange-500'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            {success ? 'Great job!' : 'Almost there!'}
          </h3>
          <div className="text-2xl font-bold">{score}%</div>
        </div>
        <p className="mt-2">
          {success 
            ? 'You completed this exercise successfully.' 
            : 'You can review and try again.'}
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Question Feedback</h3>
        
        {feedbackItems.map((item) => {
          const question = getQuestionDetails(item.questionId);
          return (
            <div 
              key={item.questionId}
              className={`p-4 rounded-md border ${
                item.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {item.correct ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                )}
                
                <div>
                  <p className="font-medium text-gray-800">{question?.prompt}</p>
                  <div className="mt-1 text-sm">
                    <p className={item.correct ? 'text-green-700' : 'text-red-700'}>
                      {item.feedback}
                    </p>
                    {!item.correct && (
                      <p className="mt-1 text-gray-600">
                        Your answer: <span className="font-medium">{userAnswers[item.questionId] || '(blank)'}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-right">
        <Button 
          onClick={onContinue}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
