import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div``;

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
          <span>{location.state.storeName}</span>

          <p>주소</p>
          <span>{location.state.address}</span>

          <p>작성자</p>
          <span>{location.state.writer}</span>

          <p>분류 태그</p>
          <span>{location.state.tag}</span>

          <p>기간</p>
          <span>{location.state.period}</span>

          <p>날짜 및 시간</p>
          <span>10/2</span>

          <p>총 급여</p>
          <span>{location.state.totalWage}</span>

          <p>상세 내용</p>
          <span>{location.state.context}</span>
        </div>
      </DetailPage>
    </Layout>
  );
};

export default FindJobsDetail;
