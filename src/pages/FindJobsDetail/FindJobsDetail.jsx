import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  padding-top: 175px;
  background-color: #f5f5f5;
`;

const DetailPage = styled.div`
  background-color: white;
  width: 1072px;
`;

const FindJobsDetail = () => {
  const location = useLocation();
  return (
    <Layout>
      <>
        <h3>{location.state.title}</h3>
        <p>
          알바까지<span>D-3</span>
        </p>
        <button>문의하기</button>
        <p>게시일 : 2024.10.28(월)</p>
      </>
      <DetailPage>
        <div>
          <p>근무처</p>
          <span>{location.state.name}</span>

          <p>주소</p>
          <span>{location.state.address}</span>

          <p>작성자</p>
          <span>김땡땡</span>

          <p>분류 태그</p>
          <span>#카페 #요식업</span>

          <p>날짜 및 시간</p>
          <span>11월 1일(금) 16:00~20:00</span>

          <p>일급</p>
          <span>{location.state.wage}</span>

          <p>상세 내용</p>
          <span>{location.state.message}</span>
        </div>
      </DetailPage>
    </Layout>
  );
};

export default FindJobsDetail;
