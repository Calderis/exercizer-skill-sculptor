
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchExercise, submitAnswers, logResult } from './api';
import LoadingState from './LoadingState';
import ExerciseRenderer from './ExerciseRenderer';
import FeedbackDisplay from './FeedbackDisplay';
import RetryPrompt from './RetryPrompt';
import { Button } from '@/components/ui/button';

const Exercizer = ({ subject, onComplete }) => {
  const [exercise, setExercise] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState('loading'); // loading, exercise, feedback, retry
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const { toast } = useToast();

  // Fetch exercise on mount or when subject changes
  useEffect(() => {
    loadExercise();
  }, [subject]);

  const loadExercise = async () => {
    setCurrentStep('loading');
    setLoading(true);
    setUserAnswers({});
    setEvaluation(null);
    
    try {
      const data = await fetchExercise(subject);
      setExercise(data);
      setCurrentStep('exercise');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load exercise. Please try again.",
        variant: "destructive"
      });
      console.error("Error fetching exercise:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      const result = await submitAnswers(exercise.id, userAnswers);
      setEvaluation(result);
      setExerciseCompleted(true);
      setCurrentStep('feedback');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit answers. Please try again.",
        variant: "destructive"
      });
      console.error("Error submitting answers:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = (retry) => {
    if (retry) {
      loadExercise();
    } else {
      // Log final result and notify completion
      logResult(exercise.id, evaluation.success);
      
      if (onComplete) {
        onComplete({
          subject,
          success: evaluation.success,
          score: evaluation.score
        });
      }
      
      toast({
        title: "Exercise Completed",
        description: `You've completed this ${subject} exercise.`
      });
    }
  };

  const handleRestart = () => {
    toast({
      title: "Restarting Exercise",
      description: "Loading new questions..."
    });
    loadExercise();
  };

  // Render different states based on currentStep
  const renderContent = () => {
    switch (currentStep) {
      case 'loading':
        return <LoadingState />;
      
      case 'exercise':
        return (
          <ExerciseRenderer
            exercise={exercise}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        );
      
      case 'feedback':
        return (
          <FeedbackDisplay
            evaluation={evaluation}
            exercise={exercise}
            userAnswers={userAnswers}
            onContinue={() => setCurrentStep('retry')}
          />
        );
      
      case 'retry':
        return (
          <RetryPrompt
            success={evaluation.success}
            score={evaluation.score}
            onRetryDecision={handleRetry}
          />
        );
      
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div className="exercizer-container w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="exercizer-header mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {exercise?.title || `${subject} Exercise`}
        </h2>
        {exerciseCompleted && (
          <Button 
            variant="outline" 
            onClick={handleRestart}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
            New Questions
          </Button>
        )}
      </div>
      
      {exercise?.description && (
        <p className="text-gray-600 mt-2 mb-6">{exercise.description}</p>
      )}
      
      <div className="exercizer-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Exercizer;
