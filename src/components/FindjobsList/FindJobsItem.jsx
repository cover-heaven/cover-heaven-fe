import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Layout = styled.div`
  cursor: pointer;
  border-radius: 30px;
  border: 1px solid #e8e8e8;
  background: #fff;
  width: 1074px;
  flex-shrink: 0;
  align-self: stretch;
`;

const FindJobsItem = ({ data }) => {
  const nav = useNavigate();
  return (
    <Layout
      onClick={() => {
        nav('/findjobsdetail', {
          state: {
            title: data.title,
            storeName: data.storeName,
            address: data.address,
            wage: data.wage,
            message: data.message,
          },
        });
      }}
    >
      <h3>{data.title}</h3>
      <div>
        <span>{data.storeName}</span>
        <span>{data.address}</span>
        <span>{data.wage}</span>
      </div>
    </Layout>
  );
};

export default FindJobsItem;
