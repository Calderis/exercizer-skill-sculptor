
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const MCQQuestion = ({ question, value, onChange }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.prompt}</h3>
      
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="space-y-3"
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem 
              id={`${question.id}-option-${index}`} 
              value={option} 
            />
            <Label 
              htmlFor={`${question.id}-option-${index}`}
              className="text-base cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default MCQQuestion;
