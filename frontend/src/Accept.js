import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './Accept.css';
import envelope from './img/envelope.png';

function Accept() {
    const navigate = useNavigate();

    const container = {
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        textAlign: 'center',
    };
    const Img = {
        width: '400px',
        height: 'auto',
        marginBottom: '80px',
        marginVertical: '340px',
    };
    const Title = {
        fontFamily: 'KCC-Hanbit',
        fontSize: 'lighter',
        fontSize: '50px',
        fontWeight: 'lighter',
        // marginBottom: '121.04px',
        textAlign: 'center',
    };
    const Btn = {
        width: '415.11px',
        height: '138px',
        backgroundColor : '#E13D38',
        fontSize: '34px',
        paddingTop: '50px',
        paddingBottom: '57px',
        paddingVertical: '108.56px',
        borderRadius: '36.35px',
        marginTop: '93.46px',
        fontFamily: 'KCC-Hanbit', 
        color: '#ffffff',
    };
      const message = {
        color: '#BCBCBC',
        fontSize : '33.97px',
        fontWeight: 'lighter',
      };

    const handleButtonClick = () => {
        navigate('/Sign');
    }


    return(
        <div>
            <div style={container}>
                <img src={envelope} style={Img} ></img>
                <h3 style={Title} >효주 님이 수빈 님과 화해하고 싶어해요.<br/>
                    함께 대화해보시겠어요?
                </h3>
                <button className="SentMessage" style={Btn} onClick={handleButtonClick}>대화 수락하기</button>
                <h3 style={message} className='message'>조금 더 생각해 보고 싶어요</h3>
            </div>
        </div>
    )
}

export default Accept;
