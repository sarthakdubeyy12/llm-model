import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PipelineUI } from './ui';
import { PipelineToolbar } from './toolbar';
import { RunButton } from './RunButton';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={
          <>
            <PipelineToolbar />
            <RunButton />
            <PipelineUI />
          </>
        } />
        
      </Routes>
    </Router>
  );
}

export default App;