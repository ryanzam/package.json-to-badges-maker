import { useCallback, useState } from 'react';
import Header from './components/Header'
import Intro from './components/Intro'
import JsonInput from './components/JsonInput'
import { getAllPackages, parsePackagesFromJSON } from './utils/jsonParser';

function App() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = useCallback(async (jsonData: any) => {
    try {
      setLoading(true);
      setError(null);

      const parsedPackages = parsePackagesFromJSON(jsonData);
      const allPackages = getAllPackages(parsedPackages);

      if (allPackages.length === 0) {
        setError('No packages found in JSON data. Make sure your JSON contains dependencies, devDependencies, peerDependencies, or optionalDependencies.');
        return;
      }

      //generate badge
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate badges');


    } finally {
      setLoading(false);
    }
  }, []);

  const handleError = useCallback((errorMessage: string | null) => {
    setError(errorMessage);

  }, []);

  return (
    <div className='min-h-screen'>
      <Header />

      <main className='container px-5 py-8'>
        <Intro />

        <JsonInput onJsonChange={handleJsonChange} onError={handleError} />


      </main>
    </div>
  )
}

export default App
