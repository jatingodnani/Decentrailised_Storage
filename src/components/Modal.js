import { useEffect, useState } from "react";
import { fetchStorage } from "../utils/tzkt";
import "./Modal.css";
import { tezos } from "../utils/tezos";
import { getAccount } from "../utils/wallet";
// import {VscChromeClose} from "react-icons/vsc"



const Modal = ({ setModalOpen}) => {

  const [contract, setContract] = useState(null);
  const sharing = async () => {
      const address = document.querySelector(".address").value;
      console.log(address);

    // try{
    //   const address = document.querySelector(".address").value;
    //   console.log(address);
    //   const contract = await tezos.wallet.at("KT1CXMpNtA2GMu35mbAWwnVfKvTjb8YoBsPz");
    //   // setContract(contract)
    //   const op =await contract.methods.allow(address).send();
    //   await op.confirmation(1);
    // }
    // catch(err){
    //   throw err;
    // } 
  };
  useEffect(() => {
    
    // (async () => {
    const accessList = async () => {
      const account = await getAccount();
      const storage = await fetchStorage();
      const my_m = storage.access_user;
      if(my_m.hasOwnProperty(account)){
        const my_l = my_m[account];
        
        const l = Object.keys(my_l);
        
        let select = document.querySelector("#selectNumber");
        for (let i = 0; i < l.length; i++) {
          let opt = l[i];
          console.log(l[i]);
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        }
      }
    };
    accessList();
  // })();
  }, []);
  return (
    <>
      <div className="modalBackground">
       <div className="modalContainer">

         <div className="img" >
         {/* <VscChromeClose onClick={() => {
                setModalOpen(false);
              }} style={{marginLeft:"90%",fontSize:"25px",cursor:"pointer"}} /> */}
          <img   src="https://th.bing.com/th?id=OIP.C9Pnj8rM6NZiLaGCCYRmiwHaFi&w=289&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" />
         </div>
          <form className="myForm">
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Wallet Address"

            ></input>
          </div>
        
         
         <div className="footer">
      
            <button  onClick={() => sharing()}>Share</button>
            </div>
          <select id="selectNumber">
              <option className="option">People With Access</option>
              
            </select>
           
         
            </form>
     
       </div>
      </div>
    </>
  );
};
export default Modal;