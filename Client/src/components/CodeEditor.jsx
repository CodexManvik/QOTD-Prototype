import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import './CodeEditor.css';

export default function CodeEditor() {
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

  const testCases = [
    {
      id: 1,
      status: 'passed',
      input: 'nums = [2,7,11,15], target = 9',
      expected: '[0,1]',
      got: '[0,1]',
    },
    {
      id: 2,
      status: 'passed',
      input: 'nums = [3,2,4], target = 6',
      expected: '[1,2]',
      got: '[1,2]',
    },
    {
      id: 3,
      status: 'passed',
      input: 'nums = [3,3], target = 6',
      expected: '[0,1]',
      got: '[0,1]',
    },
  ];

  return (
    <div className="code-editor">
      <div className="editor-header">
        <select className="language-tab" value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
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
              <div className="success-message">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>All Test Cases Passed!</span>
              </div>
              <div className="runtime-info">
                <div className="info-item">
                  <span className="info-label">Runtime:</span>
                  <span className="info-value">52ms</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Memory:</span>
                  <span className="info-value">42.1MB</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'test-cases' && (
            <div className="test-cases">
              {testCases.map((testCase) => (
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
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn btn-secondary">Run Code</button>
        <button className="btn btn-primary">Submit</button>
      </div>
    </div>
  );
}
