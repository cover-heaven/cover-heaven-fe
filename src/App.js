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
  width: 1512px;
  height: 982px;
`;

export default App;
