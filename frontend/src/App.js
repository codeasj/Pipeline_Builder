import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <main className="pipeline-main">
        <PipelineUI />
      </main>
      <footer className="pipeline-footer">
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;
