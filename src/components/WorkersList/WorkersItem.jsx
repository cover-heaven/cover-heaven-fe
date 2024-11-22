import { redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WorkersItem = ({ data }) => {
  return (
    <>
      <div>{data.job_search_id}</div>
      <div>{data.profile}</div>
      <div>{data.gender}</div>
      <div>{data.uer_name}</div>
      <div>{data.department}</div>
      <div>{data.student_id}</div>
      <div>{data.manner_temperature}</div>
      <div>{data.job_tag}</div>
    </>
  );
};

export default WorkersItem;
