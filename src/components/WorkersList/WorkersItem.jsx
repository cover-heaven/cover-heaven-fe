import styled from 'styled-components';
import Man from '../../assets/icon/Man.png';
import Woman from '../../assets/icon/Woman.png';
import Temperature from './Temperature';
import {
	Icon_Academy,
	Icon_Bar,
	Icon_Cafe,
	Icon_Restaurant,
	Icon_Tutor,
	Text_Secondary
} from '../../styles/color';

const WorkersItem = ({ data, openModal }) => {
	const colorMap = {
		학원: Icon_Academy, // 초록색
		과외: Icon_Tutor, // 파랑색
		카페: Icon_Cafe, // 빨강색
		식당: Icon_Restaurant, // 보라색
		주점: Icon_Bar
	};
	const gender = {
		M: Man,
		F: Woman
	};
	const genderSrc = gender[data.gender];

	return (
		<Layout onClick={openModal}>
			<ProfileSection>
				<ProfileImage src={genderSrc}></ProfileImage>
				<NameAndInfo>
					<NameRow>
						<Name>{data.user_name}</Name>
						<SubInfo>
							({data.department} {data?.student_id.substring(2, 4)}학번)
						</SubInfo>
					</NameRow>
					<TagSection>
						{data.job_tag && data.job_tag.length > 0 ? (
							data.job_tag.map((tag, index) => (
								<Tag key={index} color={colorMap[tag] || '#CCCCCC'}>
									{tag}
								</Tag>
							))
						) : (
							<Tag color="#CCCCCC">태그 없음</Tag>
						)}
					</TagSection>
				</NameAndInfo>
			</ProfileSection>
			<FixLocation>
				<Temperature data={Math.round(data.manner_temperature)} />
			</FixLocation>
		</Layout>
	);
};

// CSS
const Layout = styled.div`
	display: flex;
	border-radius: 20px;
	border: 1px solid #e8e8e8;
	background: #fff;
	width: 40%;
	height: 107px;
	cursor: pointer;
	&:hover {
		border: 1px solid #ff5238;
		scale: 1.01;
		box-shadow: 1px 1px 23.3px 0px rgba(0, 0, 0, 0.11);
	}
`;

const ProfileSection = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
	padding-left: 6%;
`;

const ProfileImage = styled.img`
	width: 50px;
	height: 50px;
`;

const NameAndInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 3%;
`;

const NameRow = styled.div`
	display: flex;
	align-items: baseline; /* 이름과 학과/학번 간 정렬 */
`;

const Name = styled.div`
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-right: 5px; /* 이름과 학과/학번 간 간격 */
`;

const SubInfo = styled.div`
	color: ${Text_Secondary};
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
`;

const TagSection = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 8px; /* 태그와 이름/학과 간 간격 */
`;

const Tag = styled.div`
	padding: 5px 10px;
	color: rgba(0, 0, 0, 0.4);
	font-size: 14px;
	border-radius: 5px;
	font-weight: 600;
	background: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0.7) 0%,
			rgba(255, 255, 255, 0.7) 100%
		),
		${(props) => props.color};
`;

const FixLocation = styled.div`
	display: flex;
	justify-content: right;
	padding-top: 22px;
	padding-right: 20px;
`;

export default WorkersItem;
