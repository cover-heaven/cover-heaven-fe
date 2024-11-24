import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  padding-right: 24%;
  padding-left: 24%;
`;

const DetailPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3% 6%;
  border-radius: 30px;
  border: 1px solid #e8e8e8;
  background: rgba(255, 255, 255, 0.6);
  gap: 18px;
`;

const InfoBox = styled.div`
  width: 14%;
`;

const WorkingPlace = styled.div`
  display: flex;
`;
const Address = styled.div`
  display: flex;
`;
const Writer = styled.div`
  display: flex;
`;
const Tag = styled.div`
  display: flex;
`;
const WorkingPeriod = styled.div`
  display: flex;
`;
const WorkingDate = styled.div`
  display: flex;
`;
const TotalWage = styled.div`
  display: flex;
`;
const Detail = styled.div`
  display: flex;
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TitleBox = styled.div`
  display: flex;
  gap: 13px;
  padding-left: 15%;
`;
const Img = styled.img`
  width: 57.113px;
  height: 57.113px;
  flex-shrink: 0;
`;
const SubTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-top: 3%;
`;
const DateBox = styled.div`
  display: flex;
  gap: 5px;
  padding-left: 15%;
`;
const Date = styled.div`
  color: var(--surface-surface-primary, #ff5238);
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid var(--surface-surface-primary, #ff5238);
  padding: 1px 11px;
`;
const BackButton = styled.button`
  margin-bottom: 15px;
  width: 140px;
`;
const RightContainer = styled.div`
  padding-top: 9%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ParentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 25px;
`;
const Button = styled.button`
  width: 201px;
  height: 43px;
  flex-shrink: 0;
  border-radius: 30px;
  background: var(--surface-surface-primary, #ff5238);
  color: white;
`;
const DdayBox = styled.div`
  padding-left: 20%;
`;

const FindJobsDetail = () => {
  const location = useLocation();
  const nav = useNavigate();
  return (
    <Layout>
      <ParentContainer>
        {' '}
        <LeftContainer>
          <BackButton onClick={() => nav('/findjobslist')}>
            {' '}
            {'<'} 목록으로 돌아가기
          </BackButton>
          <TitleBox>
            <Img src="icon"></Img>
            <SubTitleBox>
              <div>{location.state.title}</div>
              <div>#{location.state.tag}</div>
            </SubTitleBox>
          </TitleBox>
          <DateBox>
            <Date>11/2</Date>
            <Date>11/2</Date>
            <Date>11/2</Date>
            <Date>11/2</Date>
          </DateBox>
        </LeftContainer>
        <RightContainer>
          <DdayBox>첫 근무까지 D-7</DdayBox>
          <Button>알바 지원하기</Button>
        </RightContainer>
      </ParentContainer>
      <DetailPage>
        <WorkingPlace>
          <InfoBox>근무처</InfoBox>
          <div>{location.state.storeName}</div>
        </WorkingPlace>
        <Address>
          <InfoBox>주소</InfoBox>
          <div>{location.state.address}</div>
        </Address>
        <Writer>
          <InfoBox>작성자</InfoBox>
          <div>김동동</div>
        </Writer>
        <Tag>
          <InfoBox>분류 태그</InfoBox>
          <div>{location.state.tag}</div>
        </Tag>
        <WorkingPeriod>
          <InfoBox>기간</InfoBox>
          <div>2024.11.1 -2024.11.5</div>
        </WorkingPeriod>
        <WorkingDate>
          <InfoBox>날짜 및 시간</InfoBox>
          <DateContainer>
            <div>11/1 16:00 - 20 :00</div>
            <div>11/1 16:00 - 20 :00</div>
            <div>11/1 16:00 - 20 :00</div>
            <div>11/1 16:00 - 20 :00</div>
            <div>11/1 16:00 - 20 :00</div>
          </DateContainer>
        </WorkingDate>
        <TotalWage>
          <InfoBox>총 급여</InfoBox>
          <div>{Number(location.state.totalWage).toLocaleString()}원</div>
        </TotalWage>
        <Detail>
          <InfoBox>상세 내용</InfoBox>
          <div>{location.state.context}</div>
        </Detail>
      </DetailPage>
    </Layout>
  );
};

export default FindJobsDetail;
