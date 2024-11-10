import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import FindJobsWriting from "./pages/Donghwi/FindJobsWriting";
import FindJobs from "./pages/Donghwi/FindJobs";
import FindWorkers from "./pages/FindWorkers";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import MyProfile from "./pages/MyProfile";
import { useState } from "react";
import FindJobsDetail from "./pages/Donghwi/FindJobsDetail";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const MockData = [
  {
    name: "광흥창 투썸 알바 급구",
    address: "서울시 마포구 광흥창역",
    period: "2024.11.1~2024.11.12",
    wage: "12,000원",
  },
  {
    name: "신촌 나무카페 알바 급구",
    address: "서울시 서대문구 연세로",
    period: "2024.12.1~2024.12.12",
    wage: "10,000원",
  },
  {
    name: "서강대 조교 알바 급구",
    address: "서울시 마포구 신수동",
    period: "2024.09.01~2024.12.20",
    wage: "13,000원",
  },
];

function App() {
  const [totalData, setTotalData] = useState(MockData);

  const onCreate = (title, address, period, wage) => {
    const newData = {
      name: title,
      address: address,
      period: period,
      wage: wage,
    };
    setTotalData([newData, ...totalData]);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route
            path="/findjobs"
            element={<FindJobs totalData={totalData}></FindJobs>}
          ></Route>
          <Route
            path="/findjobsdetail"
            element={<FindJobsDetail></FindJobsDetail>}
          ></Route>
          <Route
            path="/findworkers"
            element={<FindWorkers></FindWorkers>}
          ></Route>
          <Route
            path="/findjobswriting"
            element={<FindJobsWriting onCreate={onCreate}></FindJobsWriting>}
          ></Route>
          <Route path="/chat" element={<Chat></Chat>}></Route>
          <Route path="/myprofile" element={<MyProfile></MyProfile>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
