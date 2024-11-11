import { useState } from 'react';
import styled from 'styled-components';

const FindJobsWriting = () => {
  const [wage, setWage] = useState();
  const [dateTimeInputs, setDateTimeInputs] = useState([{ id: 1 }]);

  const onChange = (e) => {
    setWage(e.target.value);
  };

  const addDateTimeInput = () => {
    setDateTimeInputs([...dateTimeInputs, { id: dateTimeInputs.length + 1 }]);
  };

  return (
    <Layout>
      <Input placeholder="글제목" />
      <Input placeholder="가게이름" />
      <Input placeholder="주소" />
      {dateTimeInputs.map((input, index) => (
        <RowLayout key={input.id}>
          <Input placeholder="날짜" />
          <Input placeholder="시간" />
          {index === dateTimeInputs.length - 1 && (
            <Button onClick={addDateTimeInput}>+</Button>
          )}
        </RowLayout>
      ))}
      <Input placeholder="시급" onChange={onChange} />
    </Layout>
  );
};

const Layout = styled.div`
  padding-top: 175px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid black;
`;

const Input = styled.input`
  padding: 15px;
`;

export default FindJobsWriting;
