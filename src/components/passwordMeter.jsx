import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const strengthLevels = [
  { label: 'Bad', color: '#f56565' }, // red-500
  { label: 'Good', color: '#fbbf24' }, // yellow-500
  { label: 'Great', color: '#48bb78' }, // green-500
  { label: 'Excellent', color: '#4299e1' }, // blue-500
];

export function PasswordMeter() {
  const [password, setPassword] = useState('');
  const [score, setScore] = useState(0);
  const [scoreDesc, setScoreDesc] = useState([]);
  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    allTypes: false,
    longLength: false,
    noSuggestions: false,
  });

  useEffect(() => {
    if (!password) {
      resetScore();
    } else {
      const result = zxcvbn(password);
      calculateScore(password, result.feedback.suggestions);
    }
  }, [password]);

  const resetScore = () => {
    setScore(0);
    setScoreDesc([]);
    setRequirementsMet({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      specialChar: false,
      allTypes: false,
      longLength: false,
    });
  };

  const calculateScore = (password, feedbackSuggestions) => {
    let newScore = 0;
    const newRequirements = { ...requirementsMet };

    // Helper function to update score and description
    const updateScoreAndDesc = (requirement, points, desc) => {
      if (!newRequirements[requirement]) {
        newScore += points;
        setScoreDesc(desc);
        newRequirements[requirement] = true;
      }
    };

    // Helper function to subtract score if requirement no longer met
    const removeScoreAndDesc = (requirement, points) => {
      if (newRequirements[requirement]) {
        newScore -= points;
        setScoreDesc('');
        newRequirements[requirement] = false;
      }
    };

    // Length Check
    if (password.length >= 16) {
      updateScoreAndDesc('length', 20, "+20 Password meets length requirement");
    } else {
      removeScoreAndDesc('length', 20);
    }

    // Lowercase
    if (/[a-z]/.test(password)) {
      updateScoreAndDesc('lowercase', 10, "+10 Password contains lowercase letter");
    } else {
      removeScoreAndDesc('lowercase', 10);
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
      updateScoreAndDesc('uppercase', 10, "+10 Password contains uppercase letter");
    } else {
      removeScoreAndDesc('uppercase', 10);
    }

    // Number
    if (/[0-9]/.test(password)) {
      updateScoreAndDesc('number', 10, "+10 Password contains number");
    } else {
      removeScoreAndDesc('number', 10);
    }

    // Special Character
    if (/[^A-Za-z0-9]/.test(password)) {
      updateScoreAndDesc('specialChar', 10, "+10 Password contains special character");
    } else {
      removeScoreAndDesc('specialChar', 10);
    }

    // Combination of all reqs
    const hasAllTypes =
      newRequirements.length &&
      newRequirements.lowercase &&
      newRequirements.uppercase &&
      newRequirements.number &&
      newRequirements.specialChar;

    if (hasAllTypes) {
      updateScoreAndDesc('allTypes', 20, "+20 Password meets all requirements");
    } else {
      removeScoreAndDesc('allTypes', 20);
    }

    // Longer Than 20 Characters
    if (password.length > 20) {
      updateScoreAndDesc('longLength', 10, "+10 Password is longer than 20 characters");
    } else {
      removeScoreAndDesc('longLength', 10);
    }

    // No Suggestions from zxcvbn
    if (feedbackSuggestions.length === 0) {
      updateScoreAndDesc('noSuggestions', 10, "+10 Password avoids common patterns");
    } else {
      removeScoreAndDesc('noSuggestions', 10);
    }

    setScore(score + newScore);
    setRequirementsMet(newRequirements);
  };

  const getStrengthLevel = () => {
    if (score <= 20) return strengthLevels[0];
    if (score <= 40) return strengthLevels[1];
    if (score <= 70) return strengthLevels[2];
    return strengthLevels[3];
  };

  const strengthLevel = getStrengthLevel();

  return (
    <div className="password-meter-container">
      <div className="password-input-container">
        <label htmlFor="password" className="password-label">
          Password
        </label>
        <input
          id="password"
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="password-input"
        />
      </div>
      <div className="password-strength-container">
        <div className="password-strength-header">
          <span>Password Strength</span>
          <span>{strengthLevel.label}</span>
        </div>
        <div className="password-strength-bar">
          <div
            className="password-strength-level"
            style={{
              width: `${((score) * 100)/100}%`,
              backgroundColor: strengthLevel.color,
            }}
          ></div>
        </div>
      </div>
      <ul className="password-requirements">
        <li className={requirementsMet.length ? 'valid' : ''}>
          • At least 16 characters
        </li>
        <li className={requirementsMet.uppercase ? 'valid' : ''}>
          • At least one uppercase letter
        </li>
        <li className={requirementsMet.lowercase ? 'valid' : ''}>
          • At least one lowercase letter
        </li>
        <li className={requirementsMet.number ? 'valid' : ''}>
          • At least one number
        </li>
        <li className={requirementsMet.specialChar ? 'valid' : ''}>
          • At least one special character
        </li>
        <li className={requirementsMet.noSuggestions ? 'valid' : ''}>
          • Avoids common patterns
        </li>
      </ul>
      <div className="scoring-meter">
        <div className="scoring-header">
          <span>Scoring</span>
          <span style={{ color: '#ea2d8c' }}>{scoreDesc}</span>
        </div>
        <div className='scoring-bar'>
          <CircularProgressbar
            value={score}
            maxValue={100}
            text={`${score}%`}
            styles={buildStyles({
              textColor: strengthLevel.color,
              pathColor: strengthLevel.color,
              trailColor: '#e0e0e0',
            })}
          />
        </div>
      </div>
    </div>
  );
}
