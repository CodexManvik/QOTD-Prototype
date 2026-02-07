import { useState } from 'react';
import './QuestionCard.css';

export default function QuestionCard() {
  const [isHintExpanded, setIsHintExpanded] = useState(false);

  const question = {
    difficulty: 'Easy',
    title: 'Two Sum',
    tags: ['Arrays', 'Hash Table'],
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation:
          'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
    ],
    hint: 'A really brute force way would be to search for every possible pair of numbers, but that would be too slow. Again, it\'s best to try out brute force solutions for just for completeness. It might be that this problem was easily solvable with brute force in the time given during an interview.',
  };

  const getDifficultyClass = (difficulty) => {
    return `difficulty-${difficulty.toLowerCase()}`;
  };

  return (
    <div className="question-card">
      <div className="card-header">
        <div className="difficulty-badge" role="status">
          {question.difficulty}
        </div>
      </div>

      <div className="card-body">
        <h2 className="question-title">{question.title}</h2>

        <div className="tags-container">
          {question.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="description">
          <p>{question.description}</p>
        </div>

        <div className="examples-section">
          <h3 className="section-title">Examples</h3>
          {question.examples.map((example, index) => (
            <div key={index} className="example-block">
              <div className="example-item">
                <span className="example-label">Input:</span>
                <code className="example-code">{example.input}</code>
              </div>
              <div className="example-item">
                <span className="example-label">Output:</span>
                <code className="example-code">{example.output}</code>
              </div>
              {example.explanation && (
                <div className="example-item">
                  <span className="example-label">Explanation:</span>
                  <span className="example-text">{example.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hint-section">
          <button
            className="hint-button"
            onClick={() => setIsHintExpanded(!isHintExpanded)}
            aria-expanded={isHintExpanded}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={isHintExpanded ? 'hint-icon-expanded' : ''}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            Need a hint?
          </button>
          {isHintExpanded && (
            <div className="hint-content">
              <p>{question.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
