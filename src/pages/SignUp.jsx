import { useState } from "react";
import "./SignUp.css";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [check, setCheck] = useState(false);

  const onChangeIdHandler = (e) => {
    setId(e.target.value);
  };

  const onChangePasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const checkPassword = (e) => {
    setConfirm(e.target.value);
  };

  const signUpButton = () => {
    if (password == confirm) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  return (
    <div className="SignUp">
      <input onChange={onChangeIdHandler} placeholder="아이디를 입력"></input>
      <input
        onChange={onChangePasswordHandler}
        placeholder="비밀번호를 입력"
      ></input>
      <input onChange={checkPassword} placeholder="비밀번호 확인"></input>
      <button onClick={signUpButton}>회원가입</button>
    </div>
  );
};

export default SignUp;
