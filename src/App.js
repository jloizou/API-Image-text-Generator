import { useEffect, useState } from 'react';
import "./App.css";
const App = () => {
  // Store our data/collections here for us to show
  const [data, setData] = useState([]); 
  // Store the name of the person we are going to create
  // NOTE: this is the value in the form input
  const [input, setInput] = useState("");
  useEffect(() => {
    // 1. On component load/mount let's make a call to our API and show some data on the page....
    handleFetch();
  }, []);
  const handleFetch = () => {
    fetch('http://localhost:8080').then((res) => {
      return res.json()
    }).then(res => {
      console.log("THIS IS OUR GET RESPONSE....")
      console.log(res);
      setData(res)
    })
  }
  const handleSubmit = (e) => {
    console.log("I'm going to submit");
    // Stop our page submitting
    e.preventDefault();
    // *********************************
    // 3. TODO!! Let's make POST request to our API...
    // *********************************
    const fetchOptions = {
      // This is a POST Request
      method: 'POST',
      // We are gonna send JSON
      headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify({"name": input})
    }
    fetch('http://localhost:8080/create', fetchOptions)
      .then(res => res.json())
      .then(res => {
        console.log("YAY WE GOT OUR RESPONSE BACK....")
        // Can we get the latest list of users please?
        // we just successfully posted a new user so we want the most
        // up to date list of users...
        handleFetch();
      })
  }
  const handleDelete = (user) => {
    // .... MAKE A DELETE REQUEST TO THE API TO DELETE A USER
    const fetchOptions = {
      // This is a DELETE Request
      method: 'DELETE',
      // We are gonna send JSON
      headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify(user)
    }
    fetch('http://localhost:8080/delete', fetchOptions)
      .then(() => {
        console.log("SUCCESSFULLY DELETED " + user.name);
        handleFetch();
      })
  }
  return (
    <div className="App">
      <h1>Nology Team....</h1>
      {/* We'll use this later once we have some information in our database
          to show on the page...... */}  
      {data.map(user =>(
        <p>{user.name} <button onClick={() => handleDelete(user)}>Delete</button></p>
      ))}
      <form>
        <label>Team member name</label>
        {/* We need to keep track of this textbox so we know what to send */}
        <input type="text" onChange={(e) => setInput(e.target.value)}/>
        {/* ON CLICK - we need to send some information to the API */}
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}
export default App;