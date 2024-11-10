import { useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const nav = useNavigate();
  return (
    <div className="Header">
      <div className="Title">
        <p>동문서잡</p>
      </div>
      <div className="NavBar">
        <button
          onClick={() => {
            nav("/findjobs");
          }}
        >
          <p>단기알바 찾기</p>
        </button>
        <button
          onClick={() => {
            nav("/findworkers");
          }}
        >
          <p>구직자 찾기</p>
        </button>
        <button
          onClick={() => {
            nav("/findjobswriting");
          }}
        >
          <p>글쓰기</p>
        </button>
      </div>
      <div className="Icon">
        <button
          onClick={() => {
            nav("/chat");
          }}
        >
          채팅
        </button>
        <button
          onClick={() => {
            nav("/myprofile");
          }}
        >
          프로필
        </button>
      </div>
    </div>
  );
};

export default Header;
