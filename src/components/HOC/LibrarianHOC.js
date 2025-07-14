import { Component } from "react"
import NavigationLibrarian from "../NavigationLibrarian"

const LibrarianHOC = (OriginalComponent) => {
    return class extends Component {
        render() {
            return (
                <>
                    <NavigationLibrarian/>
                    <OriginalComponent/>
                </>
            )
        }
    }
}

export default LibrarianHOC;