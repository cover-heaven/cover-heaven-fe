import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  width: 97.5%;
  border-radius: 30px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const TitleContainer = styled.div`
  padding-left: 1%;
  width: 33%;
`;

const AddressContainer = styled.div`
  padding-top: 0.8%;
  width: 25%;
`;
const HourlyWageContainer = styled.div`
  padding-top: 0.8%;
  width: 15%;
`;
const TotalWageContainer = styled.div`
  padding-top: 0.8%;
  width: 15%;
`;
const DdayContainer = styled.div`
  padding-top: 0.8%;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

const FindJobsItem = ({ data }) => {
  const nav = useNavigate();
  const totalWage = data.work_detail.work_hour * data.work_detail.hourly_wage;
  return (
    <Layout
      onClick={() => {
        nav('/findjobsdetail', {
          state: {
            title: data.title,
            storeName: data.store_name,
            tag: data.job_tag,
            address: data.address,
            totalWage: totalWage,
            context: data.context,
          },
        });
      }}
    >
      <Img src="icon"></Img>
      <TitleContainer>
        <div>{data.title}</div>
        <div>Date</div>
      </TitleContainer>
      <AddressContainer>
        <div>{data.address}</div>
      </AddressContainer>
      <HourlyWageContainer>
        <div>{data.work_detail.hourly_wage}원</div>
      </HourlyWageContainer>
      <TotalWageContainer>
        <div>{totalWage}원</div>
      </TotalWageContainer>
      <DdayContainer>
        <div>D-Day</div>
      </DdayContainer>
    </Layout>
  );
};

export default FindJobsItem;
