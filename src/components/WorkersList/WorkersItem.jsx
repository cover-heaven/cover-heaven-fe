import { redirect, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WorkersItem = ({ data }) => {
  // 태그에 따라 색상을 설정하는 colorMap 객체
  const colorMap = {
    학원: '#A5E09C', // 초록색
    과외: '#9CD2EA', // 파랑색
    카페: '#F49C9C', // 빨강색
    음식점: '#9C27B0', // 보라색
    기타: '#FFEB3B', // 노랑색
  };

  return (
    <ContainerBottle>
      {/* 프로필 및 기본 정보 섹션 */}
      <ProfileSection>
        <ProfileImage>{data.profile || '사진 없음'}</ProfileImage>
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

      {/* 매너 온도 섹션 */}
      <TemperatureSection>
        <Temperature>{data.manner_temperature || '0'}°</Temperature>
      </TemperatureSection>
    </ContainerBottle>
  );
};

// CSS
const ContainerBottle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid #eaeaea;
  background-color: #fff;
  width: 90%;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 2;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #888;
`;

const NameAndInfo = styled.div`
  display: flex;
  flex-direction: column;
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

const TemperatureSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Temperature = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #ffeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b6b;
  font-size: 18px;
  font-weight: bold;
`;

export default WorkersItem;
