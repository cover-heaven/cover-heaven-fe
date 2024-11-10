import "./FindJobsWriting.css";
import { useState } from "react";

const FindJobsWriting = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const [tag, setTag] = useState("");
  const onChangeTag = (e) => {
    setTag(e.target.value);
  };

  const [address, setAddress] = useState("");
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const [period, setPeriod] = useState("");
  const onChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  const [wage, setWage] = useState("");
  const onChangeWage = (e) => {
    setWage(e.target.value);
  };

  const onClick = () => {
    onCreate(title, address, period, wage);
  };

  return (
    <div className="FindJobsWriting">
      <p>글쓰기</p>
      <input
        onChange={onChangeTitle}
        placeholder="가게이름을 입력하세요"
      ></input>
      <input onChange={onChangeTag} placeholder="분류태그를 입력하세요"></input>
      <input onChange={onChangeAddress} placeholder="주소를 입력하세요"></input>
      <input onChange={onChangePeriod} placeholder="기간을 입력하세요"></input>
      <input onChange={onChangeWage} placeholder="시급을 입력하세요"></input>
      <button onClick={onClick}>제출</button>
    </div>
  );
};

export default FindJobsWriting;
