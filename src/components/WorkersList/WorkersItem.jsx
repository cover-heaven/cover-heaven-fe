import styled from 'styled-components';
import Man from '../../assets/icon/Man.png';
import Woman from '../../assets/icon/Woman.png';

const WorkersItem = ({ data, openModal }) => {
	const colorMap = {
		학원: '#A5E09C', // 초록색
		과외: '#9CD2EA', // 파랑색
		카페: '#F49C9C', // 빨강색
		식당: '#B49EE8', // 보라색
		주점: '#FFC65C'
	};
	const gender = {
		남성: Man,
		여성: Woman
	};
	const genderSrc = gender[data.gender];

	return (
		<Layout onClick={openModal}>
			<ProfileSection>
				<ProfileImage src={genderSrc}></ProfileImage>
				<NameAndInfo>
					<NameRow>
						<Name>{data.uer_name}</Name>
						<SubInfo>
							({data.department} {data.student_id})
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
	font-size: 14px;
	color: #888;
`;

const TagSection = styled.div`
	display: flex;
	gap: 10px;
	margin-top: 8px; /* 태그와 이름/학과 간 간격 */
`;

const Tag = styled.div`
	padding: 5px 10px;
	background-color: ${(props) => props.color || '#CCCCCC'};
	color: #fff;
	border-radius: 4px;
	font-size: 14px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default WorkersItem;
