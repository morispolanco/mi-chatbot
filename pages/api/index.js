import { useState } from 'react';

export default function Home() {
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');

    const startRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = function(event) {
            setTranscript(event.results[event.results.length-1][0].transcript);
        };

        recognition.start();
    };

    const sendTranscript = () => {
        fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ transcript })
        })
        .then(res => res.json())
        .then(data => setResponse(data.response))
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <button onClick={startRecognition}>Iniciar</button>
            <button onClick={sendTranscript}>Enviar</button>
            <p>{transcript}</p>
            <p>{response}</p>
        </div>
    );
}