import React, { useState } from 'react';
import './main.css';

function RoomPopup({ roomNumber, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>닫기</button>
        <h2>{roomNumber}번</h2>
        <div className="popup-info">
          <div className="info-item">
            <h3>이용요금: </h3>
            <span className="info-text-box"></span>
          </div>
          <div className="info-item">
            <h3>이용시간:</h3>
            <span className="info-text-box"></span>
          </div>
          <div className="info-item">
            <h3>도서 대여 목록:</h3>
            <div className="book-list">
              <p>book 1</p>
              <p>book 2</p>
              <p>book 3</p>
              {/* 필요에 따라 책 제목을 추가할 수 있습니다. */}
            </div>
          </div>
          <div className="info-item">
            <h3>물품 요청 목록:</h3>
            <div className="item-list">
              <p>item 1</p>
              <p>item 2</p>
              <p>item 3</p>
              {/* 필요에 따라 물품 목록을 추가할 수 있습니다. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showRobotPopup, setShowRobotPopup] = useState(false);

  const rooms = [
    [1, 2, 3, 4, 5],
    [6, 0, 0, 0, 0],
    [11, 10, 9, 8, 7]
  ];

  const handleRoomClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRobotClick = () => {
    setShowRobotPopup(true);
  };

  const handleCloseRobotPopup = () => {
    setShowRobotPopup(false);
  };

  return (
    <div className="App">
      <div className="room-layout">
        <div className="layout">
          <h2></h2>
          <div className="room-container">
            {rooms.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((roomNumber, roomIndex) => (
                  roomNumber !== 0 ? (
                    <div key={roomIndex} 
                         className={`room`} 
                         onClick={() => handleRoomClick(roomNumber)}>
                      {roomNumber}
                    </div>
                  ) : null
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <RoomPopup roomNumber={selectedRoom} onClose={handleClosePopup} />}
      <div className="robot-image-container" onClick={handleRobotClick}>
        <img src="/robot-image.png" alt="로봇 이미지" />
      </div>
      {showRobotPopup && (
        <div className="rpopup">
          <div className="rpopup-content">
            <button className="close-button" onClick={handleCloseRobotPopup}>닫기</button>
            <h2 className="robot-status"></h2>
            <p className="stop-text">정지중</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;