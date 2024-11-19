import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  cursor: pointer;
  width: 1082px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 30px;
  border: 1px solid #e8e8e8;
  background: #fff;
`;

const FindJobsItem = ({ data }) => {
  const nav = useNavigate();
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
      <div>
        <div>{data.title}</div>
      </div>
      <div>
        <span>{data.address}</span>
        <span>{data.work_detail.hourly_wage}</span>
        <span>{data.work_detail.hourly_wage * data.work_detail.work_hour}</span>
      </div>
    </Layout>
  );
};

export default FindJobsItem;
