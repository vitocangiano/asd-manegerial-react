import { useEffect, useRef, useState } from "react";
import './conto.css';
import { CSVLink } from "react-csv";
import { SERVER_URL } from "./Url";


function Borsellino({isLoading,err,data,handleClick,transactionData, setTransactionData}){
    const [note,setNote]=useState("")
    const [importo,setImporto]=useState("")
    const csvLink = useRef()
    useEffect(() => {
        exportBuild();
      }, [data])

      const exportBuild = () =>{
        let string=[];
        string.push(['nome','cognome','cf','data','note','importo']);
      for (let i=0; i<data.content?.borsellino.length;i++){
        let array=[ data.content?.minorenne.nome,data.content?.minorenne.cognome,data.content?.minorenne.cf,
          data.content?.borsellino[i].data,data.content?.borsellino[i].note,data.content?.borsellino[i].importo];
        string.push(array)
      }
      setTransactionData(string);
    
     
      return string;
    }
  
    const getTransactionData = () => {
  
      
      console.log("data button : ",transactionData);
      csvLink.current.link.click()
    
    }
    //delete record borsellino
    const delet=(params) =>{
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
       
         fetch (`${SERVER_URL}/borsellino/delete?UUID=` + params, {
             method: "DELETE",
             //body: JSON.stringify(params),
             headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" }
         })
             .then((response) => {
                handleClick(data.content?.minorenne.minorenneUUID)
                 return response
             })
             .then((response) => {
                 return response.json()
             })
             .catch((error) => (console.log(error.status)));
     }
      //api add campus
      const handleCampus = async (operatore) => {
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
        let form = {
            note: note,
            importo:operatore+importo,
            minorenneUUID :data.content?.minorenne.minorenneUUID
        }
    
        try {
          const response = await fetch(`${SERVER_URL}/borsellino/add`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(form), // body data type must match "Content-Type" header
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
          setImporto("");
          setNote("")
          
          handleClick(data.content?.minorenne.minorenneUUID)

        } catch (err) {
          
        } finally {
          
        }
      };

     const handleNote=(e)=>{
        setNote(e.target.value);

     }
     const handleImport=(e)=>{
        setImporto(e.target.value)
     }
     const ordine = ()=>{
        let list = data.content?.borsellino;
        const sortByData = list.sort(({data:a},{data:b})=>a < b ? 1 : a > b ? -1 : 0)
        return sortByData;
     }
   
   

    return(
        <>
        <div className="container">
      {isLoading && <h2>Loading...</h2>}
      <button onClick={getTransactionData}>Download Ricevute</button>
      <CSVLink
         data={transactionData}
         filename={data.content?.minorenne.cognome+"RicevuteBorsellino.csv"}
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
      <div className="col">
     
        <h1>{data.message}</h1>
        <h1>{data.error}</h1>
      </div>
      <div className="card-body">
        <div className="conto">
            <div className="info">
                <div>
                <h7>Nome:</h7><br></br>
                {data.content?.minorenne.nome}
                </div>
                <div>
                <h7>Cognome:</h7><br></br>
                {data.content?.minorenne.cognome}
                </div>
                <div>
                <h7>Data di Nascita:</h7><br></br>
                {data.content?.minorenne.dataDiNascita}
                </div>
                <div className="saldo">
                
               <h3> € {data.content?.borsellino.map(item => item.importo).reduce((prev,curr)=> prev + curr, 0).toFixed(2)}</h3>
                </div>
            </div>
            <div className="input">
                <div>
                <input type="text" value={note} onChange={handleNote} placeholder="note"/>
                </div>
                <div>
                <input type="number" value={importo} onChange={handleImport}  placeholder="importo"/>
                </div>
                <div>
                <button onClick={()=>{handleCampus("-")}}className="debito">Debito (-)</button>
                </div>
                <div>
                <button onClick={()=>{handleCampus("+")}}className="ricarica">Ricarica (+)</button>
                </div>
            </div>
        </div>
                    
          
                    
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>data</th>
                                <th>import</th>
                                <th>note</th>
                                <th>Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.content?.borsellino.length >0?(
                                ordine().map(item => (
                                    <tr key={item.borsellinoUUID}>
                                
                                        <td>{item.data}</td>
                                        <td>{item.importo}</td>
                                        <td>{item.note}</td>
                                       
                                        <td>
                                            <button onClick={()=>{if  ( window . confirm ( 'Sei sicuro di voler eliminare questo elemento?' ) )delet(item.borsellinoUUID)}}  className="btn btn-danger">Remove</button>
                                        </td>

                                    </tr>
                                ))
                            ) :(<h1> non ci sono risultati</h1>)
                            }
                        </tbody>
                    </table>
                </div>
                </div>
        </>
    )
}
export default Borsellino