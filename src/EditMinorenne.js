import { useEffect, useState } from "react";
import { SERVER_URL } from "./Url";



function EditMinorenne({ minorenne,setMinorenne }) {
    const [error,setError]=useState("");
    
    //api add campus
    const handleMaggiorenne = async () => {
        
        
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
        try {
          const response = await fetch(`${SERVER_URL}/minorenne/upDate`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(minorenne), // body data type must match "Content-Type" header
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
            
          }
    
          const result = await response.json();
          console.log(result);

        } catch (err) {
          
        } finally {
          
        }
      };
    const onChangeName = (e)=>{
        console.log(minorenne)
      setMinorenne({
            
            ...minorenne, nome:e.target.value
              
            
        })
    }
    const onChangeCognome = (e)=>{
      setMinorenne({
          
            ...minorenne, cognome:e.target.value
          
        })
    }
    
    const onChangeEmail = (e)=>{
    setMinorenne({
        
        ...minorenne,email:e.target.value
        
      })
    }
    const onChangeEmailConf = (e)=>{
    setMinorenne({
        
        ...minorenne, emailConf:e.target.value
        
      })
    }
    const onChangeData = (e)=>{
    setMinorenne({
        
        ...minorenne,dataDiNascita:e.target.value
        
      })
    }
    const onChangecf = (e)=>{
    setMinorenne({
        
        ...minorenne, cf:e.target.value
        
      })
    }
    const onChangeTelefono = (e)=>{
    setMinorenne({
        
        ...minorenne, telefono:e.target.value
        
      })
    }
    const onChangeLuogo = (e)=>{
    setMinorenne({
        
        ...minorenne, luogoDiNascita:e.target.value
        
      })
    }
    const onChangeIndirizzo = (e)=>{
    setMinorenne({
        
        ...minorenne, indirizzo:e.target.value
        
      })
    }

  
    return (
        <>
        <div className="container">
            <h2>Modifica Allievo Minorenne</h2>
            <div className="maggiorenne">
            <form >
                <div>
                    <label htmlFor="nome"></label>
                    <input type="text" name="nome" placeholder="Nome" onChange={onChangeName} value={minorenne.nome}/>
               
                </div>
                <div>
                    <label htmlFor="cognome"></label>
                    <input type="text" name="cognome" placeholder="Cognome" onChange={onChangeCognome} value={minorenne.cognome}/>
                </div>
                <div>
                    <label htmlFor="data"></label>
                    <input type="date" name="data" placeholder="Data di nascita" onChange={onChangeData} value={minorenne.dataDiNascita}/>
                  
                </div>
                <div>
                    <label htmlFor="luogo"></label>
                    <input type="luogo" name="luogo" placeholder="Luogo di nascita" onChange={onChangeLuogo} value={minorenne.luogoDiNascita}/>
                   
                </div>
                <div>
                    <label htmlFor="indirizzo"></label>
                    <input type="text" name="indirizzo" placeholder="Indirizzo" onChange={onChangeIndirizzo} value={minorenne.indirizzo}/>
                   
                </div>
                <div>
                    <label htmlFor="cf"></label>
                    <input type="text" name="cf" placeholder="Codice Fiscale" onChange={onChangecf} value={minorenne.cf}/>
                </div>


                <div className="input">
                <button onClick={()=>{handleMaggiorenne()}}className="ricarica">Aggiorna Dati</button>
                </div>

            </form>
            </div>
            </div>
        </>
    )
}
export default EditMinorenne