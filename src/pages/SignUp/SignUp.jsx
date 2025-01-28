import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Surface_Primary } from '../../styles/color';
import { instance } from '../../api/instance';

const SignUp = () => {
	// const initialFormData = {
	// 	user_id: '',
	// 	name: '',
	// 	gender: '',
	// 	phone: '',
	// 	birth_date: '',
	// 	school: '',
	// 	department: '',
	// 	student_id: '',
	// 	profile: null,
	// 	password: '',
	// 	student_card: null
	// };
	// const [formData, setFormData] = useState(initialFormData);
	const [data, setData] = useState(new FormData());
	const [isPendingRequest, setIsPedingRequest] = useState(false);
	const nav = useNavigate();

	const onChangeData = (e) => {
		const newFormData = new FormData();
		for (let [key, value] of data.entries()) {
			newFormData.append(key, value);
		}
		newFormData.delete(e.target.name);
		if (e.target.name === 'sutdent_card') {
			newFormData.append(
				'student_card',
				e.target.files[0],
				e.target.files[0].name
			);
		} else if (e.target.name === 'gender') {
			newFormData.append(e.target.name, e.target.value);
		} else {
			newFormData.append(e.target.name, e.target.value);
		}
		setData(newFormData);
	};

	const postSignUpData = async () => {
		if (isPendingRequest) return; // 중복 클릭 방지.
		try {
			setIsPedingRequest(true);
			await instance.post('/users/register', data);
			// setFormData(initialFormData);
			nav('/login');
		} catch (err) {
			alert('회원가입 실패');
		} finally {
			setIsPedingRequest(false);
		}
	};

	// const fileUpload = (e) => {
	// 	setFormData({ ...formData, student_card: e.target.files[0] });
	// };

	return (
		<Layout>
			<LeftLayout>
				<TitleBox>
					{/* <ServiceTitle>동문서잡</ServiceTitle> */}
					<Explanation>
						<SubTitle>
							<div>학생증 인증 가입 후</div>
							<div>수많은 동문 알바생들을 만나보세요.</div>
						</SubTitle>
						<div>
							<RowLayout2>
								<Stroke>3단계 안심 가입 절차</Stroke>
								<P>를 통해</P>
							</RowLayout2>
							<P>학적이 확인된 동문들만 가입할 수 있어요.</P>
						</div>
					</Explanation>
				</TitleBox>
				<ContentBox>
					<LineContainer>
						<Dot></Dot>
						<Line></Line>
						<Dot></Dot>
						<Line></Line>
						<Dot></Dot>
						<Line></Line>
						<Dot></Dot>
					</LineContainer>
					<ExplanationBox>
						<P>1. 기본 인적사항을 입력해 주세요.</P>
						<P>2. 학교 정보 입력 후 학생증을 인증해 주세요.</P>
						<P>3. 아이디와 비밀번호를 입력해 주세요.</P>
						<P>4. 가입 완료!</P>
					</ExplanationBox>
				</ContentBox>
			</LeftLayout>
			<RightLayout>
				<InputContainer>
					<FirstLayout>
						<RowLayout2>
							<Orange>01.</Orange>
							<Title>기본 인적사항</Title>
						</RowLayout2>
						<div>
							<div>이름</div>
							<Input
								name="name"
								placeholder="ex) 홍길동"
								// value={formData.name}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		name: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div>
							<div>전화번호</div>
							<Input
								name="phone"
								placeholder="번호만 입력해주세요 ex) 01012345678"
								// value={formData.phone}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		phone: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<RowLayout>
							<div>
								<div>성별</div>
								<GenderBox>
									<GenderMan>
										<input
											name="gender"
											value="M"
											type="radio"
											// onChange={() =>
											// 	setFormData({
											// 		...formData,
											// 		gender: 'M'
											// 	})
											// }
											onChange={onChangeData}
										></input>
										남자
									</GenderMan>
									<GenderWoman>
										<input
											name="gender"
											value="F"
											type="radio"
											// onChange={() =>
											// 	setFormData({
											// 		...formData,
											// 		gender: 'F'
											// 	})
											// }
											onChange={onChangeData}
										></input>
										여자
									</GenderWoman>
								</GenderBox>
							</div>
							<div>
								<div>생년월일</div>
								<BirthInput
									name="birth_date"
									placeholder="YYYY/MM/DD"
									// value={formData.birth_date}
									// onChange={(e) =>
									// 	setFormData({
									// 		...formData,
									// 		birth_date: e.target.value
									// 	})
									// }
									onChange={onChangeData}
								/>
							</div>
						</RowLayout>
					</FirstLayout>
					<SecondLayout>
						<RowLayout2>
							<Orange>02.</Orange>
							<Title>학생 인증</Title>
						</RowLayout2>
						<div>
							<div>학교</div>
							<Input
								name="school"
								// value={formData.school}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		school: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div>
							<div>학과</div>
							<Input
								name="department"
								placeholder="ex) 컴퓨터공학과"
								// value={formData.department}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		department: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div>
							<div>학번</div>
							<Input
								name="student_id"
								placeholder="ex) 20240000"
								// value={formData.student_id}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		student_id: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div className="student-card">
							<div>학생증 인증 (이름, 학과, 학번이 보이는 사진) </div>
							<input
								name="sutdent_card"
								type="file"
								// onChange={fileUpload}
								onChange={onChangeData}
							></input>
						</div>
					</SecondLayout>
					<ThirdLayout>
						<RowLayout2>
							<Orange>03.</Orange>
							<Title>아이디 & 비밀번호</Title>
						</RowLayout2>
						<div>
							<div>아이디</div>
							<Input
								name="user_id"
								placeholder="아이디를 입력해주세요"
								// value={formData.user_id}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		user_id: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div>
							<div>비밀번호</div>
							<Input
								name="password"
								type="password"
								placeholder="8자~20자 사이의 비밀번호를 입력해주세요."
								// value={formData.password}
								// onChange={(e) =>
								// 	setFormData({
								// 		...formData,
								// 		password: e.target.value
								// 	})
								// }
								onChange={onChangeData}
							/>
						</div>
						<div>
							<div>비밀번호 확인</div>
							<Input
								type="password"
								placeholder="8자~20자 사이의 비밀번호를 다시 입력해주세요."
							/>
						</div>
					</ThirdLayout>
				</InputContainer>
				<Button onClick={postSignUpData}>동문서잡 가입하기</Button>
			</RightLayout>
		</Layout>
	);
};

const Orange = styled.div`
	color: #ff5238;
	font-family: Pretendard;
	font-size: 33px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
const Layout = styled.div`
	display: flex;
	width: 100%;
	height: auto;
	padding: 0 calc(100 / 1512 * 100vw);
	gap: calc(100 / 1512 * 100vw);
	position: relative;
`;
const LeftLayout = styled.div`
	display: flex;
	padding: 4%;
	flex-direction: column;
	gap: 30px;
	width: calc(606 / 1512 * 100vw);
	height: calc(791 / 982 * 100vh);
	border-radius: 30px;
	background: linear-gradient(
		202deg,
		rgba(255, 82, 56, 0.6) 5.5%,
		#ff5238 37.69%
	);
	position: fixed;
`;
const RightLayout = styled.div`
	/* width: 50%; */
	position: absolute;
	left: 50%;
	padding-left: calc(50 / 1512 * 100vw);
`;
const FirstLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const SecondLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	.student-card {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;
const ThirdLayout = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const RowLayout = styled.div`
	display: flex;
	gap: 10%;
`;
const RowLayout2 = styled.div`
	display: flex;
	align-items: center;
	gap: 1%;
`;
const SubTitle = styled.div`
	color: #fff;
	font-family: Pretendard;
	font-size: 27px;
	font-style: normal;
	font-weight: 800;
	line-height: 150%;
`;
const P = styled.div`
	color: #fff;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
`;
const GenderBox = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 17%;
`;
const GenderWoman = styled.div`
	display: flex;
	gap: 5px;
	width: 70px;
`;
const GenderMan = styled.div`
	display: flex;
	gap: 5px;
	width: 70px;
`;
const Stroke = styled.div`
	color: #fff;
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 27px */
`;
const ServiceTitle = styled.div`
	color: #fff;
	font-family: Pretendard;
	font-size: 32px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
const ExplanationBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
`;
const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	/* gap: 20px; */
	margin-bottom: 10%;
`;
const ContentBox = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 3%;
	height: 50%;
`;
const LineContainer = styled.div`
	display: flex;
	flex-direction: column; /* 세로 방향 정렬 */
	align-items: center; /* 수평 중앙 정렬 */
	gap: 0; /* 간격 없이 선과 원을 연결 */
	height: 100%;
`;
const Dot = styled.div`
	width: 15px; /* 원의 너비 */
	height: 15px; /* 원의 높이 */
	background-color: white; /* 원의 색상 */
	border-radius: 50%; /* 원으로 만들기 */
	border: none; /* 원 테두리 */
`;
const AbstractLine = styled.div`
	width: 288px;
	height: 3px;
	margin-left: 20px;
	background-color: #fff;
`;
const Line = styled.div`
	width: 2px; /* 선의 너비 */
	/* height: 73px; 선의 높이 */
	height: 27%;
	background-color: white; /* 선의 색상 */
`;
const Title = styled.div`
	color: var(--text-text-primary, #464646);
	font-family: Pretendard;
	font-size: 28px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 50px;
	padding-bottom: 5%;
`;
const Input = styled.input`
	padding: 10px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	width: 464px;
	height: 49px;
	margin-top: 1%;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;
const BirthInput = styled.input`
	width: 262px;
	height: 49px;
	border-radius: 15px;
	border: 1px solid #e8e8e8;
	background: #fff;
	margin-top: 3%;
	padding: 10px;
	&:hover {
		border: 1px solid ${Surface_Primary};
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;
const Button = styled.button`
	width: 464px;
	height: 49px;
	border-radius: 15px;
	background: #ff5238;
	color: white;
	margin-bottom: 8%;
`;
const Explanation = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export default SignUp;
