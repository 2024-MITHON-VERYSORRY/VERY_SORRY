import React from "react";
import miniLogo from './img/miniLogo.png';
import appleletter from './img/appleletter.png';
import btn from './img/button.png';
import './result.css';

function Result() {
    const logo = {
        width: '333px',
        height: '122px',
    };

    return (
        <div>
            <div>
                <img src={miniLogo} className="logo" alt="Logo" />
            </div>
            <div className="apple-container">
                {/* appleletter 이미지와 그 위에 input 태그 */}
                <img src={appleletter} className="letter" alt="Apple Letter" />
                <input
                    type="text"
                    className="input-on-apple"
                    placeholder="내용을 입력하세요"
                />
            </div>
            <div>
                <img src={btn} className="btn" alt="Button" />
            </div>
        </div>
    );
}

export default Result;
