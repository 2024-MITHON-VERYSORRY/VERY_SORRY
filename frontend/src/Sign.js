import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './Sign.css';
import miniLogo from './img/miniLogo.png';
import share from './img/share.png';
import keyboard from './img/Samsung.png';
import myMessage from './img/Sender message content (1).png';
import apple from './img/apple.png';

function Sign() {
    const [inputValue, setInputValue] = useState("");
    const [submittedMessages, setSubmittedMessages] = useState([]);
    const [showApple, setShowApple] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(true);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    
    const Img = {
        marginTop: '137px',
        marginLeft: '52px',
    };
    const Btn = {
        width: '200px',
        height: '80px',
        backgroundColor: '#445807',
        color: '#ffffff',
        fontSize: '25px',
        borderRadius: '61.94px',
        cursor: 'pointer',
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim()) {
            setSubmittedMessages([...submittedMessages, inputValue]);
            setInputValue("");
        }
    };

    const handleButtonClick = () => {
        setShowApple(true);
        setShowKeyboard(false);

        setTimeout(() => {
            navigate('/Result');
        }, 3000);
    }

    return (
        <div className='Sign'>
            <div className='header'>
                <img src={miniLogo} style={Img} className='Img' alt="Logo" />
                <button style={Btn} className='Btn' onClick={handleButtonClick}>화해 완료</button>
            </div>
            <div className='messages-container'>
                {submittedMessages.map((message, index) => (
                    <div key={index} className='my-message-container'>
                        <img src={myMessage} className='my-message-img' alt="My message" />
                        <div className='message-text'>{message}</div>
                    </div>
                ))}
            </div>
            <div className='input-container'>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='여기를 눌러 입력하세요'
                    className='input-field'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit} className='share-button'>
                    <img src={share} className='share-icon' alt="Share" />
                </button>
            </div>
            <img src={keyboard} className='keyboard-image' alt="Keyboard" />
            {showKeyboard && (
                <img src={keyboard} className='keyboard-img' />
            )}
            {showApple && (
                <div className='apple-container'>
                    <img src={apple} className='apple-img'  />
                </div>
            )}
        </div>
    );
}

export default Sign;
