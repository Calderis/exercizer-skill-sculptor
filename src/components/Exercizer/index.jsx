
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchExercise, submitAnswers, logResult } from './api';
import LoadingState from './LoadingState';
import ExerciseRenderer from './ExerciseRenderer';
import FeedbackDisplay from './FeedbackDisplay';
import RetryPrompt from './RetryPrompt';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Exercizer = ({ 
  subject, 
  onComplete,
  themeColor = "#0891b2" // Default teal color
}) => {
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

  // Custom styling based on theme color
  const customStyles = {
    header: {
      borderLeft: `4px solid ${themeColor}`,
      paddingLeft: '1rem',
    },
    iconButton: {
      color: themeColor,
    },
    container: {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    }
  };

  // Render different states based on currentStep
  const renderContent = () => {
    switch (currentStep) {
      case 'loading':
        return <LoadingState themeColor={themeColor} />;
      
      case 'exercise':
        return (
          <ExerciseRenderer
            exercise={exercise}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            themeColor={themeColor}
          />
        );
      
      case 'feedback':
        return (
          <FeedbackDisplay
            evaluation={evaluation}
            exercise={exercise}
            userAnswers={userAnswers}
            onContinue={() => setCurrentStep('retry')}
            themeColor={themeColor}
          />
        );
      
      case 'retry':
        return (
          <RetryPrompt
            success={evaluation.success}
            score={evaluation.score}
            onRetryDecision={handleRetry}
            themeColor={themeColor}
          />
        );
      
      default:
        return <div>Something went wrong</div>;
    }
  };

  return (
    <div 
      className="exercizer-container w-full max-w-3xl mx-auto p-6 bg-white rounded-lg"
      style={customStyles.container}
    >
      <div className="exercizer-header mb-8 flex justify-between items-center">
        <div style={customStyles.header}>
          <h2 className="text-2xl font-bold text-gray-800">
            {exercise?.title || `${subject} Exercise`}
          </h2>
          {exercise?.description && (
            <p className="text-gray-600 mt-2">{exercise.description}</p>
          )}
        </div>
        
        {exerciseCompleted && (
          <Button 
            variant="outline" 
            onClick={handleRestart}
            className="flex items-center gap-2 border-gray-200"
            style={customStyles.iconButton}
          >
            <RefreshCw size={16} />
            New Questions
          </Button>
        )}
      </div>
      
      <div className="exercizer-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Exercizer;
