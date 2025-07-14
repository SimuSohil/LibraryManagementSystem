import { Component } from "react"
import Navigation from "../Navigation"

const MemberHOC = (OriginalComponent) => {
    return class extends Component {
        render() {
            return (
                <>
                    <Navigation/>
                    <OriginalComponent/>
                </>
            )
        }
    }
}

export default MemberHOC;