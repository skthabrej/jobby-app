import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import JobItemCard from './components/JobItemCard'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/login' element={<LoginForm/>} />
      <Route exact path='/jobs' element={<Jobs/>} />
      <Route exact path="/jobs/:id" element={<JobItemCard/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
)
export default App