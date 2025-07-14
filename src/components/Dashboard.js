import React, { Component } from 'react'
import AvailableLibraryBooks from './AvailableLibraryBooks'
import AddBook from './BookManagerLibrarian/AddBook'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Available Books in the Library</h1>
                <AvailableLibraryBooks/>

                <h1>Add books to the library</h1>
                <AddBook/>
            </div>
        )
    }
}

export default Dashboard