
# Exercizer

A reusable React component for rendering and evaluating interactive exercises and assessments.

## Overview

Exercizer is a dynamic exercise renderer and evaluator that takes a subject or skill as input, fetches an exercise structure, renders the appropriate form/questions, and evaluates user responses.

## Features

- Dynamic fetching of exercises based on a subject/skill
- Support for various question types:
  - Multiple choice questions
  - Fill-in-the-blank 
  - Media-based questions (image, video, audio)
- Answer evaluation with detailed feedback
- Retry functionality
- Result tracking

## Installation

```bash
npm install exercizer
# or
yarn add exercizer
```

## Basic Usage

```jsx
import { Exercizer } from 'exercizer';

function MyApp() {
  const handleComplete = (result) => {
    console.log('Exercise completed:', result);
    // result contains { subject, success, score }
  };

  return (
    <div className="container">
      <h1>Math Practice</h1>
      <Exercizer 
        subject="math" 
        onComplete={handleComplete}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `subject` | string | The subject or skill for which to fetch exercises |
| `onComplete` | function | Callback function called when the user completes an exercise |

## API Integration

By default, Exercizer uses mock API functions. To connect to your actual backend:

1. Create an API adapter that matches the interface expected by Exercizer
2. Pass your adapter to the component

Example:

```jsx
import { Exercizer } from 'exercizer';
import myApiAdapter from './myApiAdapter';

function MyApp() {
  return (
    <Exercizer 
      subject="math" 
      apiAdapter={myApiAdapter}
    />
  );
}
```

## License

MIT
