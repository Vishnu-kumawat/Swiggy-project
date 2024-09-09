import UserClass from "./UserClass";
import React from 'react'
import UserContext from "../utils/UserContext";

class About extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }
    render() {
        return (
            <div>
                <h1>About</h1>
                <h2>This is Namaste React web series</h2>
                <UserClass name="Vishnu kumawat(Class)" location="ambernath class" />
            </div>
        )
    }
}
export default About;