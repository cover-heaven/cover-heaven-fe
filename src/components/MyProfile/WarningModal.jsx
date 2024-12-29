import styled from 'styled-components';

const WarningModal = ({ onChangeFalse }) => {
	return (
		<Overlay>
			<Layout>
				<Content>
					<Title>현재 이용 불가능한 서비스입니다.</Title>
					<Context>
						<Center>구직자에게 급여를 송금합니다. </Center>
						<Center>
							(매칭 시 급여와 실 급여 간의 차액은 코인으로 환급됩니다.)
						</Center>
					</Context>
					<BackButton onClick={onChangeFalse}>마이페이지로 돌아가기</BackButton>
				</Content>
			</Layout>
		</Overlay>
	);
};

export default WarningModal;
const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
		180deg,
		rgba(39, 39, 39, 0.05) 0%,
		rgba(39, 39, 39, 0.2) 100%
	);
	z-index: 999; /* 모달 뒤 배경보다 낮은 z-index */
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Layout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 656px;
	height: 258px;
	background-color: #fff;
	border-radius: 20px;
`;
const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const Center = styled.div`
	color: var(--text-text-tertiary, #989898);
	text-align: center;
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
`;
const Title = styled.div`
	color: #ff5238;
	text-align: center;
	font-family: Inter;
	font-size: 20px;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
`;
const Context = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
`;
const BackButton = styled.button`
	color: #787777;
	text-align: center;
	font-family: Inter;
	font-size: 14px;
	font-style: normal;
	font-weight: 900;
	line-height: normal;
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-skip-ink: auto;
	text-decoration-thickness: auto;
	text-underline-offset: auto;
	text-underline-position: from-font;
`;
