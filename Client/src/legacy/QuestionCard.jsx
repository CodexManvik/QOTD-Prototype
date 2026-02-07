import { useState } from 'react';
import './QuestionCard.css';

export default function QuestionCard({ question }) {
  const [isHintExpanded, setIsHintExpanded] = useState(false);

  // If no question is passed, we can show a placeholder or nothing, 
  // but parent should handle loading state.
  if (!question) return null;

  // Normalizing data structure in case parent passes raw DB object
  const displayQuestion = {
    ...question,
    title: question.title,
    tags: question.tags || ['Algorithm'],
    description: question.problemStatement,
    examples: [
      { input: question.sampleInput, output: question.sampleOutput }
    ],
    hint: (question.hints && question.hints[0]) || 'No hints available.'
  };



  return (
    <div className="question-card">
      <div className="card-header">
        <div className="difficulty-badge" role="status">
          {displayQuestion.difficulty}
        </div>
      </div>

      <div className="card-body">
        <h2 className="question-title">{displayQuestion.title}</h2>

        <div className="tags-container">
          {displayQuestion.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="description">
          <p>{displayQuestion.description}</p>
        </div>

        <div className="examples-section">
          <h3 className="section-title">Examples</h3>
          {displayQuestion.examples.map((example, index) => (
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
              <p>{displayQuestion.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
