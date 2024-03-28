import React, { useState, useEffect, useRef } from 'react';
import './Shell.css';
import axios from 'axios';
function Shell() {
  const [inputValue, setInputValue] = useState('');
  const [shellCommands, setShellCommands] = useState([
    {"role":"user","content":'> type help to see a list of commands'}
  ]);

  const [historyIndex, setHistoryIndex] = useState(shellCommands.length);

  useEffect(() => {
    setHistoryIndex(shellCommands.length);
    scrollToBottom();
  }, [shellCommands]);

  const inputRef = useRef();
  const consoleBodyRef = useRef();

  const scrollToBottom = () => {
    consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
  };



  const openAiRequest = (newCommand: String) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    };
    
    const data = {
      'model': 'gpt-3.5-turbo',
      'messages': [
        ...shellCommands,
        { "role": "user", "content": `Based on the previous commands and responses give the response of a ubuntu instance terminal for this command ${newCommand}. you response should be in a json format with reponse object that has the reponse` }
      ]
    };
    console.log(shellCommands);
    axios.post(url, data, { headers })
      .then(response => {
        const gptResponse=JSON.parse(response.data.choices[0].message.content);

        console.log('Response:', gptResponse.response);
        setShellCommands(prevshellCommands=>[...prevshellCommands,{ "role": "system", "content": gptResponse.response}])

      })
      .catch(error => {
        setShellCommands(prevshellCommands=>[...prevshellCommands,{ "role": "system", "content": "Connection error"}])

      });
  };

  


  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      if (inputValue.trim().toLowerCase() === 'clear') {
        setShellCommands([{"role":"user","content":'> '}]);
      } else {
        setShellCommands((prevCommands) => [...prevCommands,{"role":"user","content":`> ${inputValue}`}]);
        

      }
      openAiRequest(inputValue);

      setInputValue('');
      setHistoryIndex(shellCommands.length);
    } else if (event.key === 'ArrowUp') {
      if (historyIndex > 0) {
        setInputValue(shellCommands[historyIndex - 1].content.slice(2));
        setHistoryIndex(historyIndex - 1);
      }
    } else if (event.key === 'ArrowDown') {
      if (historyIndex < shellCommands.length - 1) {
        setInputValue(shellCommands[historyIndex + 1].content.slice(2));
        setHistoryIndex(historyIndex + 1);
      } else {
        setInputValue('');
        setHistoryIndex(shellCommands.length);
      }
    }

  };
  

  return (
    <div style={{width:"80%"}}>
      <div className="console" style={{ cursor: 'pointer' }} onClick={() => inputRef.current.focus()}>
        <header>
          <p>admin@DistroPackageManager</p>
        </header>
        <div className="consolebody" ref={consoleBodyRef}>
          {shellCommands.map((command, index) => (
            <p key={index}>{command.content}</p>
          ))}
          <p>{'> '} <input ref={inputRef} className='input-style' value={inputValue} onKeyDown={handleKeyPress} onChange={(e) => { setInputValue(e.target.value); }}></input></p>
        </div>
      </div>
    </div>
  );
}

export default Shell;
