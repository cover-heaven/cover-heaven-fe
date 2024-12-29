import styled from 'styled-components';

const Temperature = ({ data }) => {
	return (
		<ExternalCircle angle={data}>
			<InternalCircle>
				<Degree>{data}</Degree>
				<SmallCircle>
					<TinyCircle></TinyCircle>
				</SmallCircle>
			</InternalCircle>
		</ExternalCircle>
	);
};

const ExternalCircle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background: conic-gradient(
		#ff52381a 0deg,
		#ff5238 0deg ${({ angle }) => (angle / 100) * 360}deg,
		#ff52381a ${({ angle }) => (angle / 100) * 360}deg
	);
`;

const InternalCircle = styled.div`
	position: relative;
	width: 50px;
	height: 50px;
	border: 1px solid #fff;
	border-radius: 50%;
	background-color: #fff;
`;

const Degree = styled.div`
	position: absolute;
	top: 50%;
	left: 40%;
	transform: translate(-40%, -50%);
	color: var(--surface-surface-primary, #ff5238);
	text-align: center;
	font-size: 19px;
	font-style: normal;
	font-weight: 800;
	line-height: normal;
`;

const SmallCircle = styled.div`
	position: absolute;
	top: 40%;
	left: 72%;
	transform: translate(-40%, -72%);
	display: flex;
	align-items: center;
	justify-content: center;
	width: 5px;
	height: 5px;
	border: 1px solid #ff5238;
	border-radius: 50%;
	background-color: #ff5238;
`;
const TinyCircle = styled.div`
	width: 2px;
	height: 2px;
	border: 1px solid #fff;
	border-radius: 50%;
	background-color: #fff;
`;

export default Temperature;