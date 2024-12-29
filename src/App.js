import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<AppContainer>
			<GlobalStyle />
			<BrowserRouter>
				<Router></Router>
			</BrowserRouter>
		</AppContainer>
	);
}

const AppContainer = styled.div`
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
`;

export default App;
