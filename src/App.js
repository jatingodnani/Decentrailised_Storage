import { useState,useEffect, useContext } from "react";
import { createContext } from "react";


// Components
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload"
import { getAccount } from "./utils/wallet";
import {tezos} from "./utils/tezos"
import Display from "./components/Display";
import Modal from "./components/Modal";

// const [account, setAccount] = useState("");

import { fetchStorage } from "./utils/tzkt";
import "./App.css";
import { Visibility } from "@mui/icons-material";
const context=createContext({});
 const App = () => {

  const [account, setAccount] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

    const hlo= async () => {
      const account = await getAccount();
      setAccount(account);

    }
    useEffect(()=>{
      hlo();
    })


  return (

<context.Provider value={{account,setAccount,hlo}}>
 
    <div className="h-300">
    {!modalOpen && <Navbar />}
      <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>
      {!modalOpen && (
        <button className="share" onClick={()=>setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} modalopen={modalOpen}></Modal>
      )}
      
      

      <div className="App" style={{marginTop:"-55px"}}>
        <h1 style={{ color: "white"}}>File Storage</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload account={account}
        ></FileUpload>
        <Display ></Display>
      </div>
    </div>
    </context.Provider>
  );
};

export default App;
export {context}

