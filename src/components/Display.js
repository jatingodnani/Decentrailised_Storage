import { useState } from "react";
import "./Display.css";
import { fetchStorage } from "../utils/tzkt";
import { getAccount } from "../utils/wallet";
const Display = () => {
  const [data, setData] = useState(""); 

  const getdata = async () => {
    const account = await getAccount();
    let dataArray;
    const storage = await fetchStorage();
    const my_map = storage.user;
    

    if (my_map.hasOwnProperty(account)) {
      const my_list = my_map[account];
      dataArray = my_list;
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    }
     else {
      alert("No image to display");
    }
  };
  const getOtherData = async()  => {
    const account = await getAccount();
    let dataArray;
    let d;
    const Otheraddress = document.querySelector(".address").value;
    const storage = await fetchStorage();
  
      if (Otheraddress && Otheraddress!=account) {
        const my_map = storage.user;
        if(my_map.hasOwnProperty(Otheraddress)){
          const my_list = my_map[Otheraddress];
          if(my_list.length>0){
              dataArray = my_list;
              const str = dataArray.toString();
              const str_array = str.split(",");
              const images = str_array.map((item, i) => {
                return (
                  <a href={item} key={i} target="_blank">
                    <img
                      key={i}
                      src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                      alt="new"
                      className="image-list"
                    ></img>
                  </a>
                );
              });
              setData(images);
            }else{
              alert("No image present at that address")
            }
        }else{
          alert("You don't have access");
        }
      }
      else{
        alert("Enter other wallet address");
      }

  };
  return (
    <>
      <button className="center button" onClick={getdata} style={{marginTop:"-27px"}}>
        Get Your Data
      </button>
      <div style={{display:"flex",marginLeft:"27%"}}>

      <hr className="divider" style={{marginRight:"5px",width:"30%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold"}}>OR</span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"30%"}} />
      </div>
      
      <input
        type="text"
        placeholder="Enter Other Address"
        className="address"
      ></input>
      <button className="center button data" onClick={getOtherData} style={{marginBottom:"50px"}}>
        Get Others Data
      </button>
      <div className="image-list">{data}</div>

    </>
  );
};
export default Display;