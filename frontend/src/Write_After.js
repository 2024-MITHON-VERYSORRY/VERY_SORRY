import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import './Write.css';
import './Write_After.css';
import miniLogo from './img/miniLogo.png';
import background from './img/Rectangle 21.png';

function Write_After() {  

    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        //url에서 roomId 추출
        const queryParams = new URLSearchParams(location.search);
        const roomIdFromURL = queryParams.get('roomId');
        setRoomId(roomIdFromURL);

        const timer = setTimeout(() => {
            navigate('/Accept');
        }, 5000);

        return () => clearTimeout(timer);
    }, [location][navigate]);
    const container = {
        fontFamily: 'KCC-Hanbit', 
        marginLeft: '161.7px',
        marginRight: '161.7px',
        position: 'relative',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        height: '100vh',
    };
    const Img = {
        postion: 'absolute',
        top: '0',
        marginTop: '137px',
        marginLeft: '-100px',
    }
    const Title = {
        fontSize: '62.31px',
        fontWeight: 'lighter',
        marginBottom: '93.46px',
        marginTop: '373.59px'
    };
    const subTitle = {
        fontSize: '38.94px',
        fontWeight: 'lighter',
    }
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
        backgroundColor : '#E13D38',
        fontSize: '46.7px',
        paddingTop: '57.69px',
        paddingBottom: '57.69px',
        paddingVertical: '137.6px',
        borderRadius: '36.35px',
        marginTop: '93.46px',
        fontFamily: 'KCC-Hanbit', 
        color: '#ffffff',
    };
    const Link = {
        marginTop: '-500px',
        // padding: '84px',
        width: '816px',
        height: '400px',
        fontSize: '50px',
        textAlign: 'center',
    }

    const Btn2 = {
        display: 'flex',
        justifyContent: 'center',
    }
    const LinkInput = {
        width: '50px',
        height: '50px',
    }

    const handleButtonClick = () => {
        navigate('/Write_After');
    }
    
    return (
        <div className='container' style={container}>
            <img src={miniLogo} style={Img} className='Img'></img>
            <h3 style={Title}>친구에게 <span style={{color: '#398E43'}}>사과</span>를 보내기 위해 <br/>
            간단한 정보를 작성해주세요!</h3>
            <div className='inputContainer'>
                <h3 style={subTitle}>화해 신청자 이름</h3>
                <input type='text' name='yourName' placeholder='화해하고 싶은 친구 이름을 입력해주세요.' style={subText}>
                </input>
                <h3 style={subTitle}>화해하고 싶은 친구 이름</h3>
                <input type='text' name='receiver' placeholder='화해하고 싶은 친구 이름을 입력해주세요.' style={subText}>
                </input>
                <button style={Btn} onClick={handleButtonClick}>대화방 링크 복사하기</button>
            </div>
            <div style={Btn2}>
                <button style={Link}> 
                    대화방 링크 : <input 
                                    style={LinkInput}
                                    value={`http://localhost:3000/App/${roomId}`}></input>
                </button>
            </div>
        </div>
    )
}

export default Write_After;