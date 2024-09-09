import React from 'react'
import { json } from 'react-router-dom';

class UserClass extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          userInfo : {
            name : "Dummy",
            location:"Default",
          }
        }
    }

    async componentDidMount(){
        // const data = await fetch("https://api.github.com/users/akshaymarch7");
        const data = await fetch("https://api.github.com/users/Vishnu-kumawat");
        const json = await data.json();

        this.setState({
          userInfo: json,
        })
    }
    componentDidUpdate(){
    }

    componentWillUnmount(){
    }
    
    render(){
      const {name, location, avatar_url,id } = this.state.userInfo;
        return (
            <div className='user-card'>
              <img src={avatar_url} />
              <h2>Name: {name}</h2>
              <h3>Locatin: {location}</h3>
              <h4>Id : {id}</h4>
            </div>
          )
    }
}
export default UserClass;