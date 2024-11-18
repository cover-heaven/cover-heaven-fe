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
            image: data.image,
            title: data.title,
            storeName: data.storeName,
            writer: data.writer,
            tag: data.tag,
            period: data.period,
            date: data.date,
            address: data.address,
            grossPay: data.grossPay,
            message: data.message,
          },
        });
      }}
    >
      <div>
        <img src={data.image}></img>
        <div>{data.title}</div>
      </div>
      <div>
        <span>{data.address}</span>
        <span>{data.wage}</span>
        <span>{data.grossPay}</span>
        <span>D-{data.dayCount}</span>
      </div>
    </Layout>
  );
};

export default FindJobsItem;
