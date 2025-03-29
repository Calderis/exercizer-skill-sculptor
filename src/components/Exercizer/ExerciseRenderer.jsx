
import React from 'react';
import { Button } from '@/components/ui/button';
import MCQQuestion from './question-types/MCQQuestion';
import FillInBlankQuestion from './question-types/FillInBlankQuestion';
import MediaQuestion from './question-types/MediaQuestion';

const ExerciseRenderer = ({ 
  exercise, 
  userAnswers, 
  onAnswerChange, 
  onSubmit,
  submitting 
}) => {
  const allQuestionsAnswered = exercise.questions.every(
    question => userAnswers[question.id] !== undefined
  );
  
  const renderQuestion = (question, index) => {
    switch (question.type) {
      case 'mcq':
        return (
          <MCQQuestion
            key={question.id}
            question={question}
            value={userAnswers[question.id]}
            onChange={(answer) => onAnswerChange(question.id, answer)}
          />
        );
        
      case 'fill-in-blank':
        return (
          <FillInBlankQuestion
            key={question.id}
            question={question}
            value={userAnswers[question.id] || ''}
            onChange={(answer) => onAnswerChange(question.id, answer)}
          />
        );
        
      case 'media-question':
        return (
          <MediaQuestion
            key={question.id}
            question={question}
            value={userAnswers[question.id]}
            onChange={(answer) => onAnswerChange(question.id, answer)}
          />
        );
        
      default:
        return (
          <div key={question.id} className="p-4 bg-red-100 text-red-800 rounded-md">
            Unknown question type: {question.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {exercise.questions.map(renderQuestion)}
      
      <div className="mt-8 flex justify-between items-center">
        <div>
          {!allQuestionsAnswered && (
            <p className="text-yellow-600">
              Please answer all questions before submitting.
            </p>
          )}
        </div>
        
        <Button
          onClick={onSubmit}
          disabled={!allQuestionsAnswered || submitting}
          className="bg-blue-500 hover:bg-blue-600"
        >
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </Button>
      </div>
    </div>
  );
};

export default ExerciseRenderer;
