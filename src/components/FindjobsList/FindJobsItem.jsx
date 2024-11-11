import { useNavigate } from "react-router-dom";
import "./FindJobsItem.css";

const FindJobsItem = ({ data }) => {
  const nav = useNavigate();
  return (
    <div
      className="FindJobsItem"
      onClick={() => {
        nav("/findjobsdetail", {
          state: {
            name: data.name,
            address: data.address,
            period: data.period,
            wage: data.wage,
          },
        });
      }}
    >
      <h3>{data.name}</h3>
      <div>주소 | {data.address}</div>
      <div>기간 | {data.period}</div>
      <div>시급 | {data.wage}</div>
    </div>
  );
};

export default FindJobsItem;
