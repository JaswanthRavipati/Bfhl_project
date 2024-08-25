import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Import your custom CSS

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonData);
            const res = await axios.post('http://localhost:5000/bfhl', { data: parsedData.data });
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or server error');
        }
    };

    return (
        <div className="container">
            <h1>BFHL Challenge</h1>
            <textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder="Enter JSON here"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div className="response-container">
                    <div className="select-container">
                        <Select
                            isMulti
                            options={options}
                            onChange={(selected) => setSelectedOptions(selected.map((opt) => opt.value))}
                        />
                    </div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                    <div>
                        {selectedOptions.includes('alphabets') && <div>Alphabets: {JSON.stringify(response.alphabets)}</div>}
                        {selectedOptions.includes('numbers') && <div>Numbers: {JSON.stringify(response.numbers)}</div>}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
