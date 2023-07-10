import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Avatar from 'react-avatar';

export default function App() {
  const users = {
    userOne: {
      name: 'Frankie',
      logo: <Avatar size="40" round={true} color={Avatar.getRandomColor('sitebase', ['red', 'yellow', 'blue'])} name="Frankie" />
    },
    userTwo: {
      name: 'Alex', 
      logo: <Avatar size="40" round={true} color={Avatar.getRandomColor('sitebase', ['red', 'green', 'hotpink'])} name="Alex" />
    },
    userThree: {
      name: 'Phil', 
      logo: <Avatar size="40" round={true} color={Avatar.getRandomColor('sitebase', ['green', 'black', 'purple'])} name="Phil" />
    }
  }; 
  
  const [logo, setLogo] = useState(users.userOne.logo); 
  const [user, setUser] = useState(users.userOne.name); 
  const [text, setText] = useState(''); 
  const [chat, setChat] = useState([]); 
  const [dateTime, setDateTime] = useState(new Date()); 

  useEffect(() => {
    const id = setInterval(() => setDateTime(new Date()), 1000);
    return () => { clearInterval(id);
  }}, []);

  const logoChange = () => {
    switch (user) {
      case users.userOne.name:
        setLogo(users.userOne.logo);
        break;
      case users.userTwo.name:
        setLogo(users.userTwo.logo);
        break;
      default:
        setLogo(users.userThree.logo);
        break;
    }
}

  function sendMessage(event) {
    event.preventDefault(); 
    setText(''); 
    setChat([...chat, {logo, user, text, dateTime}]); 
  }

  class GenerateChat extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <Row>
          {chat.map(({ logo, user, text, dateTime }, index ) => {
            return (
            <div key={dateTime.toLocaleTimeString('it-IT')} style={{display:"flex", alignContent:"center", marginTop:"10px"}}>
              <span style={{display:"flex", justifyContent:"flex-start", alignItems:"center", marginRight: "20px"}}>{logo}{user + ': '}{text}</span>
              <span style={{display:"flex", alignItems:"center"}}>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</span>
            </div>
            );
          })}
        </Row>
      )
    }
  }

  return (
    <div className="App" style={{ display: 'flex', width: "50%", margin: "auto", padding: 30}}>
      <Container style={{ backgroundColor: 'white', border: "4px solid black", }}>
        <Container style={{ paddingBottom: "10px"}}>
          <GenerateChat />
        </Container>
        
        <Container style={{ borderTop: "2px solid black", paddingBottom: "10px"}}>
          <form onSubmit={sendMessage} style={{ display: "flex", justifyContent: "space-between", alignItems:"center", paddingTop: "10px"}}>
            <select onChange={(event) => setUser(event.target.value)} required>
              <option value={users.userOne.name}>Frankie</option>
              <option value={users.userTwo.name}>Alex</option>
              <option value={users.userThree.name}>Phil</option>
            </select>
            <input onChange={(event) => setText(event.target.value)} value={text} type="text" placeholder="Enter your message" required></input>
            <button type='submit' onClick={logoChange}>Send Message</button>
          </form>
        </Container>
      </Container>
    </div>
  );
}