
// Mock API functions to simulate backend interactions
// In a real implementation, these would make actual API calls

/**
 * Fetches an exercise based on the given subject
 * @param {string} subject - The subject for which to fetch an exercise
 * @returns {Promise<Object>} - The exercise data
 */
export const fetchExercise = (subject) => {
  console.log(`Fetching exercise for: ${subject}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock exercise data based on the subject
      const exercises = {
        math: {
          id: 'math-1',
          title: 'Basic Arithmetic',
          description: 'Test your knowledge of arithmetic operations',
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              prompt: 'What is 7 + 8?',
              options: ['13', '14', '15', '16'],
              correctAnswer: '15'
            },
            {
              id: 'q2',
              type: 'fill-in-blank',
              prompt: 'The product of 9 and [] is 63.',
              correctAnswer: '7'
            }
          ]
        },
        language: {
          id: 'lang-1',
          title: 'English Vocabulary',
          description: 'Expand your English vocabulary',
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              prompt: 'What is the antonym of "ancient"?',
              options: ['New', 'Modern', 'Old', 'Historic'],
              correctAnswer: 'Modern'
            },
            {
              id: 'q2',
              type: 'media-question',
              mediaType: 'image',
              mediaSrc: 'https://placekitten.com/300/200',
              prompt: 'What animal is shown in this image?',
              options: ['Dog', 'Cat', 'Bird', 'Rabbit'],
              correctAnswer: 'Cat'
            }
          ]
        },
        programming: {
          id: 'prog-1',
          title: 'JavaScript Basics',
          description: 'Test your knowledge of JavaScript fundamentals',
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              prompt: 'Which of the following is NOT a JavaScript data type?',
              options: ['String', 'Boolean', 'Float', 'Object'],
              correctAnswer: 'Float'
            },
            {
              id: 'q2',
              type: 'fill-in-blank',
              prompt: 'To declare a variable in JavaScript, you can use the keyword [].',
              correctAnswer: 'let'
            }
          ]
        },
        default: {
          id: 'default-1',
          title: 'General Knowledge',
          description: 'Test your general knowledge',
          type: 'quiz',
          questions: [
            {
              id: 'q1',
              type: 'mcq',
              prompt: 'Which planet is known as the Red Planet?',
              options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
              correctAnswer: 'Mars'
            },
            {
              id: 'q2',
              type: 'fill-in-blank',
              prompt: 'The capital of France is [].',
              correctAnswer: 'Paris'
            }
          ]
        }
      };
      
      resolve(exercises[subject] || exercises.default);
    }, 1000); // Simulate network delay
  });
};

/**
 * Submits user answers for evaluation
 * @param {string} exerciseId - The ID of the exercise
 * @param {Object} answers - The user's answers
 * @returns {Promise<Object>} - The evaluation result
 */
export const submitAnswers = (exerciseId, answers) => {
  console.log(`Submitting answers for exercise ${exerciseId}:`, answers);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple evaluation logic (this would be server-side in a real app)
      let correctCount = 0;
      let totalQuestions = 0;
      const feedbackItems = [];
      
      // Fetch the exercise to check against correct answers
      // In a real implementation, this would be done server-side
      const allExercises = [
        {
          id: 'math-1',
          questions: [
            { id: 'q1', correctAnswer: '15' },
            { id: 'q2', correctAnswer: '7' }
          ]
        },
        {
          id: 'lang-1',
          questions: [
            { id: 'q1', correctAnswer: 'Modern' },
            { id: 'q2', correctAnswer: 'Cat' }
          ]
        },
        {
          id: 'prog-1',
          questions: [
            { id: 'q1', correctAnswer: 'Float' },
            { id: 'q2', correctAnswer: 'let' }
          ]
        },
        {
          id: 'default-1',
          questions: [
            { id: 'q1', correctAnswer: 'Mars' },
            { id: 'q2', correctAnswer: 'Paris' }
          ]
        }
      ];
      
      const exercise = allExercises.find(ex => ex.id === exerciseId);
      
      if (exercise) {
        exercise.questions.forEach(question => {
          totalQuestions++;
          const userAnswer = answers[question.id];
          
          if (userAnswer === question.correctAnswer) {
            correctCount++;
            feedbackItems.push({
              questionId: question.id,
              correct: true,
              feedback: 'Correct!'
            });
          } else {
            feedbackItems.push({
              questionId: question.id,
              correct: false,
              feedback: `Incorrect. The correct answer is "${question.correctAnswer}".`
            });
          }
        });
      }
      
      const score = Math.round((correctCount / totalQuestions) * 100);
      const success = score >= 70; // 70% threshold for success
      
      resolve({
        success,
        score,
        correctCount,
        totalQuestions,
        feedbackItems
      });
    }, 1000); // Simulate evaluation delay
  });
};

/**
 * Logs the result of an exercise attempt
 * @param {string} exerciseId - The ID of the exercise
 * @param {boolean} success - Whether the attempt was successful
 * @returns {Promise<void>}
 */
export const logResult = (exerciseId, success) => {
  console.log(`Logging result for exercise ${exerciseId}: ${success ? 'Success' : 'Failure'}`);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, this would send data to the server
      resolve();
    }, 500);
  });
};
