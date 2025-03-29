
import React from 'react';
import { Input } from '@/components/ui/input';

const FillInBlankQuestion = ({ question, value, onChange, themeColor = "#0891b2" }) => {
  // Split the prompt by the placeholder brackets []
  const promptParts = question.prompt.split('[]');
  
  const inputStyles = {
    borderColor: themeColor,
    outline: "none",
  };
  
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-lg">
        {promptParts.map((part, index) => (
          <React.Fragment key={index}>
            <span>{part}</span>
            {index < promptParts.length - 1 && (
              <Input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="inline-block w-32 md:w-40 h-8 text-center focus:ring-2 focus:ring-opacity-50"
                style={{
                  ...inputStyles,
                  focusRing: themeColor
                }}
                aria-label="Fill in the blank"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FillInBlankQuestion;
