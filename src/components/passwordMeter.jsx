import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';

const strengthLevels = [
  { label: 'Bad', color: '#f56565' }, // red-500
  { label: 'Good', color: '#fbbf24' }, // yellow-500
  { label: 'Great', color: '#48bb78' }, // green-500
  { label: 'Excellent', color: '#4299e1' }, // blue-500
];

export function PasswordMeter() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setStrength(result.score);
    } else {
      setStrength(0);
    }
  }, [password]);

  const getStrengthLevel = () => {
    if (strength === 0) return strengthLevels[0];
    if (strength === 1) return strengthLevels[1];
    if (strength === 2) return strengthLevels[2];
    if (strength === 3) return strengthLevels[3];
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
          type="password"
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
              width: `${(strength + 1) * 25}%`,
              backgroundColor: strengthLevel.color,
            }}
          ></div>
        </div>
      </div>
      <ul className="password-requirements">
        <li className={password.length >= 8 ? 'valid' : ''}>
          • At least 8 characters
        </li>
        <li className={/[A-Z]/.test(password) ? 'valid' : ''}>
          • At least one uppercase letter
        </li>
        <li className={/[a-z]/.test(password) ? 'valid' : ''}>
          • At least one lowercase letter
        </li>
        <li className={/[0-9]/.test(password) ? 'valid' : ''}>
          • At least one number
        </li>
        <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : ''}>
          • At least one special character
        </li>
      </ul>
    </div>
  );
}
