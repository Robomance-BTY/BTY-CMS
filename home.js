import React from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const { loggedIn, username } = props;
  const navigate = useNavigate();
  
  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      props.setLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>
        This is the CMS Page.
      </div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? "Log out" : "Log in"} />
        {loggedIn ? <div>관리자님의 아이디는 {username} 입니다.</div> : <div />}
      </div>
    </div>
  );
};

export default Home;
