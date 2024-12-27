import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logoImg from '../../assets/icon/logo_header.svg';
const Header = () => {
	const location = useLocation();
	const nav = useNavigate();
	return (
		<div className={`Header ${location.pathname === '/' ? 'IsLanding' : ''}`}>
			<img
				className="Title"
				src={logoImg}
				onClick={() => {
					nav('/');
				}}
			/>
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
					<p>글쓰기</p>
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
