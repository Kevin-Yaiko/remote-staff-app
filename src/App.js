import { Header } from './components/Header'
import { ClassList } from './components/ClassList'
import { Preferences } from './components/Preferences'
import { Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ClassList />}></Route>
          <Route path="preferences" element={<Preferences />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
