// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import List from './Pages/List';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Add from './Pages/Add';
import Details from './Pages/Details';
import Edit from './Pages/Edit';

// Create a client
const queryClient = new QueryClient()



function App() {
  return (
    <div >
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <QueryClientProvider client={queryClient}>

        <Router>
          <Routes>
            <Route path='/' element={<List />} />
            <Route path='/add' element={<Add />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/details/:id' element={<Details />} />
          </Routes>
        </Router>

      </QueryClientProvider>

    </div>
  );
}

export default App;
