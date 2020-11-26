import { useEffect, useState } from 'react';
import "./App.css";
import styles from "./App.module.scss"

const App = () => {
  // Store our data/collections here for us to show
  const [data, setData] = useState([]); 
  // Store the name of the person we are going to create
  // NOTE: this is the value in the form input
  const [input, setInput] = useState("");
  const [image , setImage] = useState("")
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

  const handleImageSubmit = (e) => { 
    console.log("going to submit image")
    e.preventDefault(); 
    const fetchImageOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"imgurl": image})
    }
    fetch('http://localhost:8080/create', fetchImageOptions)
      .then(res => res.json())
      .then(res => {
        console.log("YAY WE GOT OUR RESPONSE BACK....")
        handleFetch();
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
    <div className={styles.App}>
      <h1>Generator!</h1>
      {/* We'll use this later once we have some information in our database
          to show on the page...... */}  
      
      <form>
        <div className={styles.formSect}>
        <label>Add Text:</label>

        <input type="text" onChange={(e) => setInput(e.target.value)}/>
        </div>
        <div className={styles.formSect}>
        <label>Add Image By Url:</label>
        <input type="text" onChange={(e) => setImage(e.target.value)}/>
        </div>
        {/* ON CLICK - we need to send some information to the API */}
        <div className={styles.buttonCont}>
        <button onClick={handleSubmit}>Create Text</button>
        <button onClick={handleImageSubmit}>Create Image</button>
        </div>

      </form>
      <div className={styles.generatingCont}>
      {data.map(user =>(
        <div className={styles.generatedField}>
        <img src={user.imgurl} className={styles.generatedImg}></img>
        <p className={styles.topText}>{user.name} </p>
        <button onClick={() => handleDelete(user)}>Delete</button>
        </div>
      ))}
      </div>
      <p>{process.env.REACT_APP_BASE_URL}</p>
    </div>
  );
}
export default App;