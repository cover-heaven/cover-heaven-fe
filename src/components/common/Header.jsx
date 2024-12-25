import { useNavigate } from 'react-router-dom';
import './Header.css';
const Header = () => {
	const nav = useNavigate();
	return (
		<div className="Header">
			<div className="Title">
				<div>동문서잡</div>
			</div>
			<div className="NavBar">
				<button
					onClick={() => {
						nav('/findjobslist');
					}}
				>
					<p>단기알바 찾기</p>
				</button>
				<button
					onClick={() => {
						nav('/workerslist');
					}}
				>
					<p>구직자 찾기</p>
				</button>
				<button
					onClick={() => {
						nav('/findjobswriting');
					}}
				>
					<p>구직자찾기 글쓰기</p>
				</button>
				<button
					onClick={() => {
						nav('/workerswriting');
					}}
				>
					<p>구인 글쓰기</p>
				</button>
			</div>
			<div className="Icon">
				<button
					onClick={() => {
						nav('/login');
					}}
				>
					로그인
				</button>
				<button
					onClick={() => {
						nav('/signup');
					}}
				>
					회원가입
				</button>
			</div>
		</div>
	);
};

export default Header;
