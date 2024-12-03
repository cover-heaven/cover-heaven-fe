import AppRouter from './Router';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';

function App() {
	return (
		<AppContainer>
			<GlobalStyle />
			<AppRouter></AppRouter>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
`;

export default App;
