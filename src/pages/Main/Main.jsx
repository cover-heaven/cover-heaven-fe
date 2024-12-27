import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Surface_Primary } from '../../styles/color';
import Section1 from '../../components/Main/Section1';
import Section2 from '../../components/Main/Section2';
import Section3 from '../../components/Main/Section3';
import Section4 from '../../components/Main/Section4';
import Section5 from '../../components/Main/Section5';

const calculateDistance = (mouseX, mouseY, dotX, dotY) => {
	const dx = dotX - mouseX;
	const dy = dotY - mouseY;
	return Math.sqrt(dx * dx + dy * dy);
};

const Main = () => {
	const [dotList, setDotList] = useState([]);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event) => {
			setCursorPosition({
				x: event.clientX,
				y: event.clientY + window.scrollY
			});
		};

		const delayDotRender = setTimeout(() => {
			window.addEventListener('mousemove', handleMouseMove);

			const spacing = (50 / 1512) * document.documentElement.scrollWidth; // 간격 계산
			const numDotsWidth = Math.floor(
				document.documentElement.scrollWidth / spacing
			); // 행/열에 생성될 점의 개수
			const numDotsHeight = Math.floor(
				document.documentElement.scrollHeight / spacing
			); // 행/열에 생성될 점의 개수

			const dots = [];
			for (let i = 0; i < numDotsWidth; i++) {
				for (let j = 0; j < numDotsHeight; j++) {
					dots.push({
						x: i * spacing + spacing / 2,
						y: j * spacing + spacing / 2
					});
				}
			}
			setDotList(dots);
		}, 5000);

		// 컴포넌트 언마운트 시 이벤트 리스너 제거
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			clearTimeout(delayDotRender);
		};
	}, []);

	return (
		<>
			<Background>
				{dotList.map((dot, index) => (
					<Dot
						key={index}
						x={dot.x}
						y={dot.y}
						dist={calculateDistance(
							cursorPosition.x,
							cursorPosition.y,
							dot.x,
							dot.y
						)}
					></Dot>
				))}
			</Background>
			<Section1 />
			<Section2 />
			<Section3 />
			<Section4 />
			<Section5 />
		</>
	);
};

export default Main;

const Background = styled.div`
	width: 100vw;
	min-height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
`;

const Dot = styled.div`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	position: absolute;
	left: ${(props) => `${props.x}px`};
	top: ${(props) => `${props.y}px`};
	background-color: ${(props) =>
		props.dist < 25
			? Surface_Primary
			: props.dist < 50
				? 'rgba(255, 82, 56, 0.5)'
				: props.dist < 75
					? 'rgba(255, 82, 56, 0.4)'
					: props.dist < 100
						? 'rgba(255, 82, 56, 0.1)'
						: 'rgba(241, 241, 241, 0.50)'};
`;
