
import axios from "axios";
import React , {useEffect , useState} from "react";
import "./style.css"


function App() {

  const [data, setData] = useState([])
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")

  useEffect(() => {

    const getData = async () => {
      const respone = await axios.get("http://localhost:5000/course")
      setData(respone.data)
    }
    getData();

  }, [])

  // web3.eth.getAccounts().then(console.log)

  const AddCourse = async () => {
    const respone = await axios.post("http://localhost:5000/course" , {
      name: name , 
      description: description ,
      img: img
    })

    setData(respone.data)
  }

  const deleteCourse = async (id) =>{
    const respone = await axios.delete("http://localhost:5000/course/" + id)
    setData(respone.data)
  }

  const deleteAll = async () => {
    const respone = await axios.delete("http://localhost:5000/deleteAll")
    setData(respone.data)
  }
  
  return (
    <div id="container">
      <div className="opt">
      <input onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Name" />
      <input onChange={(e)=>{setDescription(e.target.value)}} type="text" placeholder="description" />
      <input onChange={(e)=>{setImg(e.target.value)}} type="text" placeholder="img" />
      <div className="button-opt">
      <button className="button" onClick={()=>{AddCourse()}}>ADD</button>
      <button className="button" onClick={()=>{deleteAll()}}>Delete All</button>
      </div>
      </div>
      

      
      
      {data && data.map((element , i) => {
        return <div id="courses-all">
        <div id="courses">
        <div id="element">
        <h4>Name : {element.name}</h4> 
        <p><b>description :</b> {element.description}</p>
        </div>
        <img src={element.img} alt="Javascript"></img>
        </div>
        <button onClick={()=>{deleteCourse(element._id)}} id="btn-x">X</button>
        </div>
      })}
      
      
    </div>
  );
}

export default App;
