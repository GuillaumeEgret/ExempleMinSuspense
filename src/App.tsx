import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CompoSuspendu } from './CompoSuspendu';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  const [isClicked, setIsClicked] = useState(false)
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <QueryClientProvider client={queryClient}>
          <button onClick={() => setIsClicked(!isClicked)}>Cliquer moi</button>
            {isClicked ? <CompoSuspendu /> : <div>Nothing to see</div>}
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
