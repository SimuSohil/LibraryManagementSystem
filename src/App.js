import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import AvailableBooks from './components/AvailableBooks';
import BorrowedBooks from './components/BorrowedBooks';
import UserRoleSelection from './components/UserRoleSelection';
import IssueBooks from './components/IssueBooks';
import MemberHOC from './components/HOC/MemberHOC';
import LibrarianHOC from './components/HOC/LibrarianHOC.js';
import Dashboard from './components/Dashboard';

// HOC for members
const AvailableBooksMembers = MemberHOC(AvailableBooks);
const BorrowedBooksMembers = MemberHOC(BorrowedBooks);

// HOC for Librarians
const DashboardLibrarian = LibrarianHOC(Dashboard);
const IssueBooksLibrarian = LibrarianHOC(IssueBooks);

function App() {
    return (
      <>
        <div className="App">
          <Header/>
          <BrowserRouter>
              <Routes>
                <Route path='/home' element={<UserRoleSelection/>}/>

                <Route path='/availbooks' element={<AvailableBooksMembers/>}/>
                <Route path='/borrowedBooks' element={<BorrowedBooksMembers/>}/>

                <Route path='/Dashboard' element={<DashboardLibrarian/>}/>
                <Route path='/issueBooks' element={<IssueBooksLibrarian/>}/>
              </Routes>
          </BrowserRouter>
        </div>
      </>
    );
}

export default App;
