import FindJobsItem from "../../components/FindjobsList/FindJobsItem";
import "./FindJobsList.css";
import Filter from "../../components/common/Filter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindJobsList = ({ totalData }) => {
  const [searchData, setSearchData] = useState("");

  const onChange = (e) => {
    setSearchData(e.target.value);
  };

  const nav = useNavigate();

  const filteredData = () => {
    if (searchData === "") {
      return totalData;
    } else {
      return totalData.filter((data) =>
        data.name.toLowerCase().includes(searchData.toLowerCase())
      );
    }
  };

  return (
    <div className="FindJobs">
      <div className="SearchFindJobsItem">
        <input onChange={onChange} placeholder="검색어를 입력해주세요"></input>
        <button>검색</button>
      </div>
      <div className="FilterXFindJobsList">
        <div className="filter">
          <div>필터</div>
          <Filter></Filter>
        </div>
        <div className="FindJobsList">
          <div>
            <button>전체</button>
            <span>|</span>
            <button>급구</button>
          </div>
          <div>
            {filteredData().map((data) => {
              return <FindJobsItem data={data} key={data.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobsList;
