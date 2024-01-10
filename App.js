import React,{useEffect, useState} from 'react';

const App=()=>{
  const[data,setData]=useState({});
  const[user,setUser]=useState([]);

  function handleForm(e){
   setData({
    ...data,
    [e.target.name]:e.target.value
   }
   )
  }
  async function handleSubmit(e){
    e.preventDefault();
    
    const response=await fetch('http://localhost:8080/demo',{
      method:'POST',
      body:JSON.stringify(data),
     headers: {
        'Content-Type':'application/json'
      }
    })
    const result = await response.json();
    console.log(result);
  }
  //get
  const getUser =async ()=>{
    const response=await fetch('http://localhost:8080/demo',{
      method:'GET',
     
    })
    const result = await response.json();
   setUser(result)

  }
  useEffect(()=>{
    getUser();
  },[])
  return(
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <span>userName</span>
       <input type="text" onChange={handleForm}name="userName"/>
        <span>password</span>
        <input type="text" onChange={handleForm} name="password"/>
        <button type="submit">submit</button>
      </form>
    </div>
    <div>
      <ul>
        {user.map(i=><li key={i._id}>{i.userName}:{i.password}</li>)}
      </ul>
    </div>
    </>
  )
}
export default App;
