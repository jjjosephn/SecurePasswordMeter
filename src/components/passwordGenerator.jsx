import React, { useState, useEffect } from 'react';
import { generate } from "random-words";

export function PasswordGenerator() {
  const [inputPhrase, setInputPhrase] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);

   const capitalizeRandomWord = (phrase) => {
      return phrase.split(' ').map(word => 
         Math.random() > 0.5 ? word.toUpperCase() : word
      ).join(' ');
   };

   const addRandomPunctuation = (phrase) => {
      const punctuations = '!@#$%^&*()_+-=[]{};:,.<>?';
      const randomPunctuation = punctuations[Math.floor(Math.random() * punctuations.length)];
      return phrase + randomPunctuation;
   };

   const generateNumber = (phrase) => {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      return phrase += randomNumber;
   };

   const generatePassword = () => {
      if (!inputPhrase) {
         setGeneratedPassword('Please enter an input phrase');
         return;
      }

      let password = inputPhrase;

      if(!/[A-Z]/.test(password)) {
         password = capitalizeRandomWord(password);
      }

      if (!/[!@#$%^&*()_+\-=[\]{};:,.<>?]/.test(password)) {
         password = addRandomPunctuation(password);
      }

      if (!/\d/.test(password)) {
         password = generateNumber(password);
      }

      if (password.length < 20) {
         const spaceCount = 20 - password.length;
         const word = generate({minLength: spaceCount});
         console.log(word);
         password += word;
      }

      setGeneratedPassword(password);
   };

  return (
      <div className="password-generator-container">
         <label htmlFor="input-phrase" className="password-label">
            Input Phrase
         </label>
         <input
            id="input-phrase"
            type="text"
            value={inputPhrase}
            onChange={(e) => setInputPhrase(e.target.value)}
            placeholder="Enter a phrase (e.g., I love to read)"
            className="password-input"
         />

         <div className="password-button-container">
            <button onClick={generatePassword} className="button">
               Generate Password
            </button>
         </div>

         <div className="password-input-container">
         <label htmlFor="generated-password" className="password-label">
            Generated Password
         </label>
         <div className="password-output">
            <input
               id="generated-password"
               type="text"
               value={generatedPassword}
               readOnly
               className="generated-password-input"
            />
            <button onClick={() => navigator.clipboard.writeText(generatedPassword)} className="button">
               Copy
            </button>
         </div>
         </div>
      </div>
  );
}
