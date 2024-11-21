import AppRouter from './Router';
import styled from 'styled-components';

function App() {
  return (
    <AppContainer>
      <AppRouter></AppRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;
