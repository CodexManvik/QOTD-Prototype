import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import './CodeEditor.css';
import { useUser } from '../contexts/UserContext';

export default function CodeEditor({ questionId }) {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('output');
  const [language, setLanguage] = useState('javascript');

  const languageTemplates = {
    javascript: `function solve(nums, target) {
  // Write your solution here
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        
        return new int[]{};
    }
}`,
    cpp: `#include <unordered_map>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    
    return {};
}`,
    python: `def twoSum(nums, target):
    # Write your solution here
    map_dict = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in map_dict:
            return [map_dict[complement], i]
        map_dict[num] = i
    
    return []`
  };

  const [code, setCode] = useState(languageTemplates[language]);

  const getExtension = (lang) => {
    switch (lang) {
      case 'javascript':
        return javascript();
      case 'java':
        return java();
      case 'cpp':
        return cpp();
      case 'python':
        return python();
      default:
        return javascript();
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(languageTemplates[newLang]);
  };

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'x-user-id': user.userId,
    'x-user-role': user.role
  });

  const handleRun = async () => {
    setIsRunning(true);
    setActiveTab('output');
    setExecutionResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/run`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ questionId, code, language })
      });
      const data = await res.json();
      setExecutionResult({
        type: 'run',
        status: data.status,
        output: data.output,
        time: data.executionTime,
        testResults: data.testResults // New field from backend
      });
      // Switch to test cases tab if we have them
      if (data.testResults && data.testResults.length > 0) {
        setActiveTab('test-cases');
      }
    } catch (e) {
      setExecutionResult({ type: 'error', output: 'Network/Server Error: ' + e.message });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setActiveTab('output');
    setExecutionResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/submissions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ questionId, code, language })
      });
      const data = await res.json();
      setExecutionResult({
        type: 'submit',
        status: data.status,
        score: data.score,
        message: data.message || (data.status === 'correct' ? 'All Test Cases Passed!' : 'Wrong Answer'),
        testResults: data.testResults
      });
      if (data.testResults && data.testResults.length > 0) {
        setActiveTab('test-cases');
      }
    } catch (e) {
      setExecutionResult({ type: 'error', output: 'Network/Server Error: ' + e.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <select className="language-tab" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
        <div className="text-xs text-gray-400 mr-2">
          User: {user.userId} ({user.role})
        </div>
      </div>

      <CodeMirror
        value={code}
        onChange={(val) => setCode(val)}
        extensions={[getExtension(language)]}
        theme="dark"
        height="300px"
        className="code-mirror-editor"
      />

      <div className="output-section">
        <div className="output-tabs">
          <button
            className={`tab-button ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            Output
          </button>
          <button
            className={`tab-button ${activeTab === 'test-cases' ? 'active' : ''}`}
            onClick={() => setActiveTab('test-cases')}
          >
            Test Cases
          </button>
        </div>

        <div className="output-content">
          {activeTab === 'output' && (
            <div className="output-result">
              <div className="p-4 text-gray-400">Run or Submit code to see output.</div>

              {(isRunning || isSubmitting) && <div className="p-4 text-brand-300 animate-pulse">Processing...</div>}

              {executionResult && (
                <div className={`result-box ${executionResult.status === 'correct' ? 'success' : 'error'}`}>
                  <div className="success-message" style={{ color: executionResult.status === 'correct' ? '#4ade80' : '#f87171' }}>
                    {executionResult.status === 'correct' ? '✅' : '❌'}
                    <span> {executionResult.message || (executionResult.status === 'correct' ? 'Success!' : 'Execution Failed')}</span>
                  </div>

                  <div className="runtime-info" style={{ marginTop: '1rem' }}>
                    {executionResult.output && (
                      <pre className="bg-black/30 p-2 rounded text-sm font-mono whitespace-pre-wrap">{executionResult.output}</pre>
                    )}
                    {executionResult.time && (
                      <div className="info-item mt-2">
                        <span className="info-label">Runtime:</span>
                        <span className="info-value">{executionResult.time}</span>
                      </div>
                    )}
                    {executionResult.score !== undefined && (
                      <div className="info-item">
                        <span className="info-label">Score:</span>
                        <span className="info-value">{executionResult.score}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'test-cases' && (
            <div className="test-cases">
              {(!executionResult || !executionResult.testResults) ? (
                <div className="p-4 text-gray-400">Run code to see test case results.</div>
              ) : (
                executionResult.testResults.map((testCase) => (
                  <div key={testCase.id} className="test-case-item">
                    <div className="test-case-header">
                      <span className={`test-status ${testCase.status}`}>
                        {testCase.status === 'passed' ? '✓' : '✗'} Test {testCase.id}
                      </span>
                    </div>
                    <div className="test-case-body">
                      <div className="test-line">
                        <span className="test-label">Input:</span>
                        <code className="test-code">{testCase.input}</code>
                      </div>
                      <div className="test-line">
                        <span className="test-label">Expected:</span>
                        <code className="test-code">{testCase.expected}</code>
                      </div>
                      <div className="test-line">
                        <span className="test-label">Got:</span>
                        <code className="test-code">{testCase.got}</code>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn btn-secondary"
          onClick={handleRun}
          disabled={isRunning || !questionId}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !questionId}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
