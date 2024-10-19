import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './Write.css';
import miniLogo from './img/miniLogo.png';

function Write() {  
    const navigate = useNavigate();
    const [yourName, setYourName] = useState('');
    const [receiverName, setReceiverName] = useState('');

    const container = {
        fontFamily: 'KCC-Hanbit', 
        marginLeft: '161.7px',
        marginRight: '161.7px',
    };
    const Img = {
        marginTop: '137px',
        marginLeft: '-100px',
    };
    const Title = {
        fontSize: '62.31px',
        fontWeight: 'lighter',
        marginBottom: '93.46px',
        marginTop: '373.59px',
    };
    const subTitle = {
        fontSize: '38.94px',
        fontWeight: 'lighter',
    };
    const subText = {
        fontSize: '31.15px',
        padding: '50px',
        borderRadius: '36.35px',
        width: '650px',
        height: 'auto',
        marginBottom: "36.35px",
    };
    const Btn = {
        width: '754.18px',
        height: 'auto',
        backgroundColor: '#E13D38',
        fontSize: '46.7px',
        paddingTop: '57.69px',
        paddingBottom: '57.69px',
        borderRadius: '36.35px',
        marginTop: '93.46px',
        fontFamily: 'KCC-Hanbit', 
        color: '#ffffff',
    };

    // 서버 연결
    // const handleButtonClick = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3000/create-room', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to create room');
    //         }
    //         const data = await response.json();
    //         const roomId = data.roomId; // 서버에서 반환한 roomId
            
    //         // Write_After 페이지로 roomId와 함께 이동
    //         navigate(`/Write_After?roomId=${roomId}`);
    //     } catch (error) {
    //         console.error('Error creating room:', error);
    //     }
    // };
    const handleButtonClick = () => {
        setTimeout(() => {
            navigate('/Accept');
        }, 2000);
      };
    return (
        <div className='container' style={container}>
            <img src={miniLogo} style={Img} className='Img' alt="Logo" />
            <h3 style={Title}>
                친구에게 <span style={{color: '#398E43'}}>사과</span>를 보내기 위해 <br />
                간단한 정보를 작성해주세요!
            </h3>
            <div className='inputContainer'>
                <h3 style={subTitle}>화해 신청자 이름</h3>
                <input 
                    type='text' 
                    name='yourName' 
                    placeholder='화해 신청자 이름을 입력해주세요.' 
                    style={subText}
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                />
                <h3 style={subTitle}>화해하고 싶은 친구 이름</h3>
                <input 
                    type='text' 
                    name='receiver' 
                    placeholder='화해하고 싶은 친구 이름을 입력해주세요.' 
                    style={subText}
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                />
                <button style={Btn} onClick={handleButtonClick}>대화방 링크 복사하기</button>
            </div>
        </div>
    );
}

export default Write;
