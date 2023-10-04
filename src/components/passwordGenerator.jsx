import React, { useState } from 'react';

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSpecialChars) {
  const charset = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    '!@#$%^&*()_+{}[]|:;"<>,.?/~',
  ].filter((set, index) => {
    if ((index === 0 && useUppercase) || 
        (index === 1 && useLowercase) || 
        (index === 2 && useNumbers) || 
        (index === 3 && useSpecialChars)) {
      return true;
    }
    return false;
  }).join('');

  let newPassword = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    newPassword += charset[randomIndex];
  }
  return newPassword;
}

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecialChars, setUseSpecialChars] = useState(true);

  const handleGenerateClick = () => {
    if (!useUppercase && !useLowercase && !useNumbers && !useSpecialChars) {
      alert('Selecciona al menos un tipo de carácter.');
      return;
    }
    
    const newPassword = generatePassword(length, useUppercase, useLowercase, useNumbers, useSpecialChars);
    setPassword(newPassword);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(password);
    alert('Contraseña copiada al portapapeles.');
  };

  return (
    <div className="App">
      <h1>GENEREADOR DE CONTRASEÑAS</h1>
      <div>
        <label>Longitud de la Contraseña:</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div class="container-chek">
        <label>Caracteres a incluir:</label>
        <div>
          <label>
            <input type="checkbox" checked={useUppercase} onChange={() => setUseUppercase(!useUppercase)} /> Letras Mayúsculas
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={useLowercase} onChange={() => setUseLowercase(!useLowercase)} /> Letras Minúsculas
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} /> Números
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={useSpecialChars} onChange={() => setUseSpecialChars(!useSpecialChars)} /> Caracteres Especiales
          </label>
        </div>
      </div>
      <button onClick={handleGenerateClick}>Generar Contraseña</button>
      {password && (
        <div class="container-buttons">
          <label>Contraseña Generada:</label>
          <input type="text" value={password} readOnly />
          <button onClick={handleCopyClick}>Copiar al Portapapeles</button>
        </div>
      )}
    </div>
  );
}

export default App;