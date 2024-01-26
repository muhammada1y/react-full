import React, { useState, useCallback, useEffect, useRef } from 'react';

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()|-';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    document.execCommand('copy');
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="w-full max-w-md rounded-lg mx-auto bg-gray-700 text-orange-500 p-4 my-8">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          placeholder="Password"
          className="outline-none w-full py-1 px-3"
          ref={passwordRef}
          readOnly
        />
        <button
          className="outline-none bg-yellow-900 text-white px-1"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="range"
          min={8}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
        <input
          type="checkbox"
          checked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label>Number</label>
        <input
          type="checkbox"
          checked={charAllowed}
          id="charInput"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label>Character</label>
      </div>
    </div>
  );
}

export default PasswordGenerator;
