import { useEffect, useRef, useState } from "react";
import { CSVDownload, CSVLink } from "react-csv";
import { SERVER_URL } from "./Url";


function Pagamenti({dataPagamenti,handlePagamenti,transactionData, setTransactionData}){
    const [note,setNote]=useState("")
    const [importo,setImporto]=useState("")
   
    const csvLink = useRef()
   
    
    useEffect(() => {
      exportBuild();
    }, [dataPagamenti])
      
   console.log(transactionData);
   console.log("dati ",dataPagamenti)

 
    const exportBuild = () =>{
        let string=[];
        string.push(['nome','cognome','cf','data','note','importo']);
      for (let i=0; i<dataPagamenti.content?.pagamenti.length;i++){
        let array=[ dataPagamenti.content?.maggiorenne.nome,dataPagamenti.content?.maggiorenne.cognome,dataPagamenti.content?.maggiorenne.cf,
          dataPagamenti.content?.pagamenti[i].data,dataPagamenti.content?.pagamenti[i].note,dataPagamenti.content?.pagamenti[i].importo];
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
        
         fetch (`${SERVER_URL}/pagamenti/errato?UUID=` + params, {
             method: "POST",
             //body: JSON.stringify(params),
             headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" }
         })
             .then((response) => {
                handlePagamenti(dataPagamenti.content?.maggiorenne.maggiorenniUUID)
                 return response
             })
             .then((response) => {
                 return response.json()
             })
             .catch((error) => (console.log(error.status)));
     }
      //api add campus
      const handleCampus = async () => {
        console .log(dataPagamenti.content?.pagamenti);
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
        let form = {
            note: note,
            importo: importo,
            maggiorenneUUID :dataPagamenti.content?.maggiorenne.maggiorenniUUID
        }
    
        try {
          const response = await fetch(`${SERVER_URL}/pagamenti/add`, {
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
        console.log(result);
          
          handlePagamenti(dataPagamenti.content?.maggiorenne.maggiorenniUUID)
         setNote("");
         setImporto("")

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
        
        let list = dataPagamenti.content?.pagamenti;
        const sortByData = list.sort(({data:a},{data:b})=>a < b ? 1 : a > b ? -1 : 0)
        return sortByData;
     }
   
   
    return(

        <>
        <div className="container">
        <div>
      <button onClick={getTransactionData}>Download Ricevute</button>
      <CSVLink
         data={transactionData}
         filename={dataPagamenti.content?.maggiorenne.cognome+"Ricevute.csv"}
         className='hidden'
         ref={csvLink}
         target='_blank'
      />
    </div>
    </div>
    <div>
      <div className="col">
        <h5>{dataPagamenti.message}</h5>
        <h5>{dataPagamenti.error}</h5>
      </div>
      <div className="card-body">
        <div className="conto">
            <div className="info">
                <div>
                <h7>Nome:</h7><br></br>
                {dataPagamenti.content?.maggiorenne.nome}
                </div>
                <div>
                <h7>Cognome:</h7><br></br>
                {dataPagamenti.content?.maggiorenne.cognome}
                </div>
                <div>
                <h7>Data di Nascita:</h7><br></br>
                {dataPagamenti.content?.maggiorenne.dataDiNascita}
                </div>
                <div className="saldo">
                
               <h3> € {dataPagamenti.content?.pagamenti.map(item => item.importo).reduce((prev,curr)=> prev + curr, 0).toFixed(2)}</h3>
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
                <button onClick={()=>{if  ( window . confirm ( 'Inviare questa ricevuta?' ) )handleCampus()}}className="ricarica">Invia (+)</button>
                </div>
            </div>
        </div>
                    
          
                    
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>N°</th>
                                <th>data</th>
                                <th>import</th>
                                <th>note</th>
                                <th>Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPagamenti && dataPagamenti.content?.pagamenti.length >0?(
                                ordine().map(item => (
                                    <tr key={item.pagamentiUUID}>
                                        <td>{item.numeroPagamento}</td>
                                        <td>{item.data}</td>
                                        <td>{item.importo}</td>
                                        <td>{item.note}</td>
                                       
                                        <td>
                                            <button onClick={()=>{if  ( window . confirm ( 'Sei sicuro di voler eliminare questo elemento?' ) )delet(item.pagamentiUUID)}}  className="btn btn-danger">Errato</button>
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
export default Pagamenti