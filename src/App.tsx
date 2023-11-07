import { useState, useEffect } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { BreedingRhombusSpinner } from 'react-epic-spinners'

import NavBar from './components/ui/navbar';
import Panel from './components/ui/panel';


import GenericForm from './components/forms/genericForm';

function App() {

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.getElementById('body')?.classList.add('theme', theme);
    }
  }, []);

  const [responseData, setResponseData] = useState({ data: '', loading: false });

  return (
    <div className='m-16'>
      <NavBar />
      <div className='grid grid-cols-12 mt-4'>
        <div className='col-span-4 mx-2'>
          <Panel title='Prompting'>
            <GenericForm callbackResponse={setResponseData} />
          </Panel>
        </div>
        <div className='col-span-8 mx-2 rounded px-2'>
          <div className="bg-transparent flex justify center content-center cursor-default h-full appearance-none" >
            {
              responseData?.loading ?
                <Panel centered={true}>
                  <BreedingRhombusSpinner
                    color="#8457AA"
                    // loading={responseData.loading}
                    size={150}
                  // aria-label="Loading Spinner"
                  // data-testid="loader"
                  />
                </Panel>
                :
                <Panel title="Output">
                  <div className='whitespace-pre-line'>
                    {responseData.data}
                  </div>
                </Panel>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
