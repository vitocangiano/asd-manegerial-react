import { useEffect, useState } from "react";
import { SERVER_URL } from "./Url";



function EditMaggiorenne({ maggiorenne,setMaggiorenne }) {
    const [error,setError]=useState("");
    
    //api add campus
    const handleMaggiorenne = async () => {
        console.log(maggiorenne)
        
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
        try {
          const response = await fetch(`${SERVER_URL}/maggiorenne/upDate`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(maggiorenne), // body data type must match "Content-Type" header
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
        console.log(maggiorenne)
        setMaggiorenne({
            
            ...maggiorenne, nome:e.target.value
              
            
        })
    }
    const onChangeCognome = (e)=>{
        setMaggiorenne({
          
            ...maggiorenne, cognome:e.target.value
          
        })
    }
    
    const onChangeEmail = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne,email:e.target.value
        
      })
    }
    const onChangeEmailConf = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne, emailConf:e.target.value
        
      })
    }
    const onChangeData = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne,dataDiNascita:e.target.value
        
      })
    }
    const onChangecf = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne, cf:e.target.value
        
      })
    }
    const onChangeTelefono = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne, telefono:e.target.value
        
      })
    }
    const onChangeLuogo = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne, luogoDiNascita:e.target.value
        
      })
    }
    const onChangeIndirizzo = (e)=>{
      setMaggiorenne({
        
        ...maggiorenne, indirizzo:e.target.value
        
      })
    }

  
    return (
        <>
        <div className="container">
            <h2>Modifica Genitore</h2>
            <div className="maggiorenne">
            <form >
                <div>
                    <label htmlFor="nome"></label>
                    <input type="text" name="nome" placeholder="Nome" onChange={onChangeName} value={maggiorenne.nome}/>
               
                </div>
                <div>
                    <label htmlFor="cognome"></label>
                    <input type="text" name="cognome" placeholder="Cognome" onChange={onChangeCognome} value={maggiorenne.cognome}/>
                </div>
                <div>
                    <label htmlFor="data"></label>
                    <input type="date" name="data" placeholder="Data di nascita" onChange={onChangeData} value={maggiorenne.dataDiNascita}/>
                  
                </div>
                <div>
                    <label htmlFor="luogo"></label>
                    <input type="luogo" name="luogo" placeholder="Luogo di nascita" onChange={onChangeLuogo} value={maggiorenne.luogoDiNascita}/>
                   
                </div>
                <div>
                    <label htmlFor="indirizzo"></label>
                    <input type="text" name="indirizzo" placeholder="Indirizzo" onChange={onChangeIndirizzo} value={maggiorenne.indirizzo}/>
                   
                </div>
                <div>
                    <label htmlFor="cf"></label>
                    <input type="text" name="cf" placeholder="Codice Fiscale" onChange={onChangecf} value={maggiorenne.cf}/>
                </div>
                <div>
                    <label htmlFor="telefono"></label>
                    <input type="text" name="telefono" placeholder="Telefono" onChange={onChangeTelefono} value={maggiorenne.telefono}/>
                </div>
                <div>
                    <label htmlFor="email"></label>
                    <input type="email" name="email" placeholder="Email" onChange={onChangeEmail} value={maggiorenne.email}/>
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
export default EditMaggiorenne