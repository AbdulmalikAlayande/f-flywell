import React from 'react';
import './App.css';
import {Read} from "./csv reader/Read"
import CSVReader from './csv reader/CSVReader';
import Read2 from './csv reader/Read2';
import PapaParseCsv from './csv reader/papaParseCsv';

function App() {
  return (
    <div className="App">
      {/* <CSVReader/> */}
      {/* <Read2/> */}
      <PapaParseCsv/>
    </div>
  );
}

export default App;
