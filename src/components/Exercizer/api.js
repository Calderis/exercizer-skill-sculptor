// Mock API functions to simulate backend interactions
// In a real implementation, these would make actual API calls

/**
 * Fetches an exercise based on the given subject
 * @param {string} subject - The subject for which to fetch an exercise
 * @param {string} studentContext - Optional student context for personalized exercises
 * @param {string} contentType - Optional content type preference
 * @returns {Promise<Object>} - The exercise data
 */
export const fetchExercise = (subject, studentContext = "", contentType = "multiple_choice") => {
  console.log(`Fetching exercise for: ${subject}`);
  
  const apiUrl = "https://inframatic.app.n8n.cloud/webhook/091cf9db-07c7-4db6-901c-624ac2552bdf";
  
  // Prepare the request body
  const requestBody = {
    student_context: studentContext || "",
    type: "string",
    skill_to_validate: subject
  };

  // Make the actual API call
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the API response based on format
    if (Array.isArray(data) ) {
      const questions = [];
      data.forEach(({ output }) => questions.push(...output.questions));
      // const { questions } = data[0]?.output;
      // const questions = JSON.parse(data[0]?.choices[0]?.message?.content).form;
      // Nouveau format API - liste de questions
      return {
        id: `exercise-${subject}-${Date.now()}`,
        title: `Exercise: ${subject}`,
        description: `Exercise for skill: ${subject}`,
        type: 'quiz',
        questions: questions.map((q, index) => ({
          id: `q${index + 1}`,
          type: q.type,
          question: q.question,
          answers: q.answers,
        }))
      };
    }
    
    // Format existant - retourner tel quel
    return data;
  })
  .catch(error => {
    console.error("Error fetching exercise:", error);
    
    // Fallback to mock data in case of API failure
    // const exercises = {
    //   default: {
    //     "id": "conjugaison-1",
    //     "title": "Conjugaison – Passé simple",
    //     "description": "Choisis la bonne forme du verbe conjugué au passé simple.",
    //     "type": "quiz",
    //     "questions": [
    //       {
    //         "question": "Pendant la pause shopping, Camille (essayer) une robe bleue qui lui rappelait ses vacances en Polynésie.",
    //         "type": "multiple_choice",
    //         "answers": [
    //           {
    //             "answer": "essaya",
    //             "correct": true,
    //             "position": 1
    //           },
    //           {
    //             "answer": "essayait",
    //             "correct": false,
    //             "position": 2
    //           },
    //           {
    //             "answer": "essayaient",
    //             "correct": false,
    //             "position": 3
    //           },
    //           {
    //             "answer": "essayaît",
    //             "correct": false,
    //             "position": 4
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   passeSimple: {
    //     "id": "conjugaison-fun-1",
    //     "title": "Conjugaison au Passé simple",
    //     "description": "Choisis la bonne forme du verbe conjugué au passé simple dans ces situations rigolotes.",
    //     "type": "quiz",
    //     "questions": [
    //       {
    //         "question": "En sortant d’une cabine d’essayage, elle (tomber) nez à nez avec… sa prof de maths !",
    //         "type": "multiple_choice",
    //         "answers": [
    //           {
    //             "answer": "tomba",
    //             "correct": true,
    //             "position": 1
    //           },
    //           {
    //             "answer": "tombait",
    //             "correct": false,
    //             "position": 2
    //           },
    //           {
    //             "answer": "tombèrent",
    //             "correct": false,
    //             "position": 3
    //           },
    //           {
    //             "answer": "tombé",
    //             "correct": false,
    //             "position": 4
    //           }
    //         ]
    //       },
    //       {
    //         "question": "Pendant la répétition de la pièce, elle (oublier) tout son texte… mais inventa une chanson à la place !",
    //         "type": "multiple_choice",
    //         "answers": [
    //           {
    //             "answer": "oublia",
    //             "correct": true,
    //             "position": 1
    //           },
    //           {
    //             "answer": "oubliais",
    //             "correct": false,
    //             "position": 2
    //           },
    //           {
    //             "answer": "oublient",
    //             "correct": false,
    //             "position": 3
    //           },
    //           {
    //             "answer": "oublièrent",
    //             "correct": false,
    //             "position": 4
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // };
    const exercises = {
      default: {
        id: 'default-1',
        title: 'General Knowledge',
        description: 'Test your general knowledge',
        type: 'quiz',
        questions: [
          {
            "question": "Quel est le plus grand océan du monde ?",
            "type": "multiple_choice",
            "answers": [
              {
                "text": "Océan Atlantique",
                "correct": false,
                "position": 1
              },
              {
                "text": "Océan Indien",
                "correct": false,
                "position": 2
              },
              {
                "text": "Océan Pacifique",
                "correct": true,
                "position": 3
              },
              {
                "text": "Océan Arctique",
                "correct": false,
                "position": 4
              }
            ]
          },
          {
            "question": "Quel est le plus grand océan du $$$ ?",
            "type": "fill_in_the_blanks",
            "answers": [
              {
                "text": "monde",
                "correct": true,
                "position": 1
              }
            ]
          },
          {
            "question": "Quel est le plus grand $$$ du $$$ ?",
            "type": "drag_the_words",
            "answers": [
              {
                "text": "monde",
                "correct": true,
                "position": 2
              },
              {
                "text": "océan",
                "correct": true,
                "position": 1
              },
              {
                "text": "voiture",
                "correct": false,
                "position": 0
              }
            ]
          }
        ]
      }
    };

    console.log("exercises", exercises);

    const exercice = (exercises[subject] || exercises.default);
    exercice.questions = exercice.questions.map((e, i) => ({
      ...e,
      id: `q${i + 1}`
    }));
    
    return exercice;
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
      
      // Fonction pour normaliser un texte (supprimer accents, casse, ponctuation)
      const normalizeText = (text) => {
        if (!text) return '';
        return text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
          .replace(/[^\w\s]/g, ""); // Supprimer les caractères spéciaux
      };
      
      // Fonction pour comparer les réponses en tenant compte de la normalisation
      const compareAnswers = (userAnswer, correctAnswer) => {
        console.log("compareAnswers", userAnswer, correctAnswer);
        if (typeof userAnswer === 'object' && userAnswer !== null) {
          // Pour les réponses de type objet (MCQ dans le nouveau format, drag_the_words)
          if (Array.isArray(userAnswer)) {
            // Pour les réponses de type drag_the_words
            if (Array.isArray(correctAnswer)) {
              // S'assurer que les tableaux ont la même longueur et contiennent des éléments
              if (!userAnswer.length || userAnswer.length !== correctAnswer.length) {
                return false;
              }
              
              // Vérifier chaque position
              return userAnswer.every((answer, index) => {
                // Si une position est vide, c'est incorrect
                if (!text || !correctAnswer[index]) return false;
                
                // Vérifier si le texte correspond
                const userAnswerText = normalizeText(answer.text || answer);
                const correctAnswerText = normalizeText(correctAnswer[index].text || correctAnswer[index]);
                const positionMatch = answer.position === correctAnswer[index].position;
                
                // Pour drag_the_words, l'ordre est important
                return userAnswerText === correctAnswerText && 
                       (answer.position === undefined || positionMatch);
              });
            }
          } else if (userAnswer.text) {
            // Pour les réponses de type MCQ dans le nouveau format
            return normalizeText(userAnswer.text) === normalizeText(correctAnswer.text);
          }
        } else if (typeof userAnswer === 'string' && typeof correctAnswer === 'string') {
          // Pour les réponses de type texte (fill-in-blank dans l'ancien format)
          return normalizeText(userAnswer) === normalizeText(correctAnswer);
        } else if (typeof userAnswer === 'string' && typeof correctAnswer === 'object' && correctAnswer.text) {
          // Pour les réponses de type texte contre un objet (fill_in_the_blanks dans le nouveau format)
          return normalizeText(userAnswer) === normalizeText(correctAnswer.text);
        }
        
        // Si aucune condition n'est remplie, retourne false
        return false;
      };
      
      // Fetch the exercise to check against correct answers
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
      
      // Obtenir les données de l'exercice depuis le sessionStorage pour les exercices du nouveau format
      let exercise = null;
      try {
        const exerciseData = sessionStorage.getItem('current_exercise');
        if (exerciseData) {
          exercise = JSON.parse(exerciseData);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'exercice:", error);
      }
      
      // Si on n'a pas trouvé l'exercice dans sessionStorage, chercher dans allExercises
      if (!exercise) {
        exercise = allExercises.find(ex => ex.id === exerciseId);
      }
      
      if (exercise) {
        exercise.questions.forEach(question => {
          totalQuestions++;
          const userAnswer = answers[question.id];
          let isCorrect = false;
          let correctAnswerText = '';
          
          // Déterminer si la réponse est correcte selon le type de question
          if (question.answers) {
            // Nouveau format d'API
            if (question.type === 'multiple_choice') {
              // Pour les questions à choix multiples, trouver la réponse correcte
              const correctAnswer = question.answers.find(a => a.correct === true);
              
              if (correctAnswer) {
                correctAnswerText = correctAnswer.text;
                
                // Vérifier si l'utilisateur a sélectionné la réponse correcte
                if (userAnswer && typeof userAnswer === 'object') {
                  isCorrect = userAnswer.correct === true || 
                             (userAnswer.text && normalizeText(userAnswer.text) === normalizeText(correctAnswer.text));
                }
              }
            } else if (question.type === 'fill_in_the_blanks') {
              // Pour les questions à trous
              // Trouver les réponses correctes (il peut y en avoir plusieurs)
              const correctAnswers = question.answers.filter(a => a.correct === true);
              
              if (correctAnswers.length > 0) {
                correctAnswerText = correctAnswers.map(a => a.text).join(' ou ');
                
                // Vérifier si la réponse de l'utilisateur correspond à une des réponses correctes
                isCorrect = correctAnswers.some(answer => 
                  compareAnswers(userAnswer, answer)
                );
              }
            } else if (question.type === 'drag_the_words') {
              // Pour les questions de type glisser-déposer
              // Trouver les réponses correctes et les trier par position
              const correctAnswers = question.answers
                .filter(a => a.correct === true)
                .sort((a, b) => a.position - b.position);
              
              if (correctAnswers.length > 0) {
                correctAnswerText = correctAnswers.map(a => a.text).join(', ');
                
                // Préparer un tableau ordonné des réponses de l'utilisateur, en remplaçant les éléments null par des objets vides
                let orderedUserAnswers = [];
                if (Array.isArray(userAnswer)) {
                  // Transformer les éléments null en objets vides pour faciliter la comparaison
                  orderedUserAnswers = userAnswer.map(ans => ans || { text: '', position: -1 });
                }
                
                // Vérifier que les réponses sont dans le bon ordre
                if (orderedUserAnswers.length === correctAnswers.length) {
                  isCorrect = true; // Supposons que c'est correct jusqu'à preuve du contraire
                  
                  for (let i = 0; i < correctAnswers.length; i++) {
                    const userAns = orderedUserAnswers[i];
                    const correctAns = correctAnswers[i];
                    
                    // Si une réponse est vide ou ne correspond pas, c'est incorrect
                    if (!userAns || !userAns.text || normalizeText(userAns.text) !== normalizeText(correctAns.text)) {
                      isCorrect = false;
                      break;
                    }
                  }
                } else {
                  isCorrect = false; // Nombre incorrect de réponses
                }
              }
            }
          } else {
            // Ancien format
            correctAnswerText = question.correctAnswer;
            isCorrect = compareAnswers(userAnswer, question.correctAnswer);
          }
          
          if (isCorrect) {
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
              feedback: `Incorrect. La réponse correcte est "${correctAnswerText}".`
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
