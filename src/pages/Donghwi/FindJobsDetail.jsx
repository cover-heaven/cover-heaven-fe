import "./FindJobsDetail.css";
import { useLocation } from "react-router-dom";

const FindJobsDetail = () => {
  const location = useLocation();

  return (
    <div className="FindJobsDetail">
      <>
        <h3>{location.state.name}</h3>
        <p>
          알바까지<span>D-3</span>
        </p>
        <button>문의하기</button>
        <p>게시일 : 2024.10.28(월)</p>
      </>
      <div className="DetailPage">
        <div>
          <p>가게 이름</p>
          <span>투썸 플레이스 광흥창역 점</span>

          <p>작성자</p>
          <span>김떙떙</span>

          <p>분류 태그</p>
          <span>#카페 #요식업</span>

          <p>일급</p>
          <span>48,000원</span>

          <p>날짜 및 기간</p>
          <span>11월 1일(금) 16:00~20:00</span>

          <p>조건</p>
          <span>투썸플레이스 타 지점 근무 경력 보유자. 보건증 소지자</span>

          <p>상세 내용</p>
          <span>
            안녕하세요! 면접일정과 겹쳐 급하게 대신 근무해주실 분을 구하게
            되었습니다.{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FindJobsDetail;
