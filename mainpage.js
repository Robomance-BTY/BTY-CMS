import React from 'react';
import './main.css'; 

function RoomPopup({ roomNumber, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>닫기</button>
        <h2>{roomNumber}번방</h2>
        <div className="popup-info">
          <div className="info-item">
            <h3>이용요금:</h3>
          </div>
          <div className="info-item">
            <h3>이용시간:</h3>
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
              <p>물품 1</p>
              <p>물품 2</p>
              <p>물품 3</p>
              {/* 필요에 따라 물품 목록을 추가할 수 있습니다. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedRoom, setSelectedRoom] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const rooms = [
    [3, 2, 1],
    [4, 0, 0],
    [5, 6, 7]
  ];

  const handleRoomClick = (roomNumber) => {
    setSelectedRoom(roomNumber);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
                  <div key={roomIndex} 
                       className={`room ${roomNumber === 0 ? 'empty' : ''}`} 
                       onClick={() => handleRoomClick(roomNumber)}>
                    {roomNumber || ''}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showPopup && <RoomPopup roomNumber={selectedRoom} onClose={handleClosePopup} />}
    </div>
  );
}

export default App;