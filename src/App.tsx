import NavBar from './components/ui/navbar';
import Panel from './components/ui/panel';
import { TextArea, TextField, Button, Select } from "@radix-ui/themes";
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import apiHandler from './api/apis';

function App() {

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [apiChoice, setApiChoice] = useState("summarize");

  const handleText1Change = (e: any) => {
    setText1(e.target.value);
  }

  const handleApiChoiceChange = (newApiChoice: string) => {
    console.log('handleApiChoiceChange() was called.');
    setApiChoice(newApiChoice)

  }

  async function callAPI() {
    var res = await apiHandler(apiChoice, text1);
    setText2(res);
  }

  return (
    <div className='m-16'>
      <NavBar />
      <div className='grid grid-cols-12 mt-4'>
        <div className='col-span-4 mx-2'>
          <Panel title='Prompting'>
            <div className='w-full'>
              <Select.Root defaultValue="summarize" onValueChange={handleApiChoiceChange}>
                <Select.Trigger/>
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Action</Select.Label>
                    <Select.Item value="summarize">Summarize</Select.Item>
                    <Select.Item value="topicExtraction">Extarct Topics</Select.Item>
                    <Select.Item value="generate">Generate</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>

            </div>
            <div className='mt-2'>
              <TextArea className='h-[25vh]' placeholder='Enter your text' defaultValue={text1} onChange={handleText1Change}></TextArea>
            </div>
            <div className='mt-2'>
              <Button variant='surface' color='purple' onClick={callAPI}>Run</Button>
            </div>
          </Panel>
        </div>
        <div className='col-span-8 mx-2'>
          <Panel title='Output'>
            <div>
              <TextArea defaultValue={text2} className='h-[60vh]'></TextArea>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

export default App
