import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import apple from './img/요청사과-01 2.png';

function App() {
  const navigate = useNavigate();

  const Img = {
    paddingTop: '616px',
    width: '290px',
    height: 'auto',
  };
  const subTitle = {
    paddingRight: '380px',
    marginTop: '70px',
    marginBottom: '60px',
    fontSize: '33px', 
    color: '#398E43',
    fontWeight: 'lighter',
  };
  const subText = {
    fontSize: '113px', 
    fontWeight: 'lighter',
    padding: 0,
    marginTop: -30,
  };
  const Title = {
    fontSize: '220px', 
    color: '#E13D38',
    marginLeft: 20,
    fontWeight: 'lighter',
  };
  const subTextContainer = {
    display: 'flex',
    alignItems: 'baseline',
    marginTop: -350,      // top margin
    marginLeft: 265,      // left margin
    marginRight: 188,     // right margin
    marginLeft: 188,
  };
  const Btn = {
    width: '507.64px',
    height: '168.76px',
    borderRadius: '68.05px',
    backgroundColor: '#398E43',
    fontSize: '41.58px',
    color: '#ffffff',
    border: 'none',
    fontWeight: 'lighter',
  };
  const message = {
    color: '#BCBCBC',
    fontSize : '33.97px',
    fontWeight: 'lighter',
  };

  const handleButtonClick = () => {
    navigate('/Request');
  }
  return (
    <div>
      <div className="App">
        <img src = {apple} className="Img" style={Img}/>
        <h3 style={subTitle}>MZ식 사과가 필요할 땐?</h3>
        <div style={subTextContainer}>
          <h3 style={subText}>
              심심한
          </h3>
          <h3 style={Title}>
            사과
          </h3>
        </div>
      </div>
      <div className="Btn">
        <button className="SentMessage" style={Btn} onClick={handleButtonClick}>친구에게 사과 보내기</button>
        <h3 style={message} className='message'>화해가 필요한 친구에게 메세지를 보내보세요!</h3>
      </div>
    </div>
  );
}

export default App;
