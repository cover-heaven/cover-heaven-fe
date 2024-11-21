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
            grossPay: data.grossPay,
            message: data.context,
          },
        });
      }}
    >
      <TitleBox>
        <div>{data.title}</div>
        <div>Date</div>
      </TitleBox>
      <InfoBox>
        <div>{data.address}</div>
        <div>{data.work_detail.hourly_wage}원</div>
        <div>{totalWage}원</div>
        <div>D-Day</div>
      </InfoBox>
    </Layout>
  );
};

const TitleBox = styled.div``;

const InfoBox = styled.div`
  display: flex;
`;

export default FindJobsItem;
