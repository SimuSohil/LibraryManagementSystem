import React, { Component } from 'react'
import AvailableLibraryBooks from './AvailableLibraryBooks'
import AddBook from '../BookManagementLibrarian/AddBook'
import UpdateBook from '../BookManagementLibrarian/UpdateBook'


const Dashboard = () => {
    return (
        <div>
            <h1>Available Books in the Library</h1>
            <AvailableLibraryBooks/>

            <h1>Add books to the library</h1>
            <AddBook/>

            <h1>Update the books if needed (Provide the ID)</h1>
            <UpdateBook/>
        </div>
    )
}

export default Dashboard