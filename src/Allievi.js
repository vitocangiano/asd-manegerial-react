import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_URL } from "./Url";

const Allievi = ({setIsLoading,setErr,setData,data,handleClick,setMinorenne}) => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);
   
    const [foundUsers, setFoundUsers] = useState([]);
    const [name, setName] = useState('');

    const navigate=useNavigate();


    useEffect(() => {
        //GetUserAccess();
        loadcustomer();
        
    }, []);

    const navigateBorsellino=(UUIDminorenne)=>{
        handleClick(UUIDminorenne)
        navigate("/borsellino");
    }
   

    const loadcustomer = () => {
        let jwt =sessionStorage.getItem('jwttoken');
      
        let auth = "Bearer "+jwt;
     
        fetch(`${SERVER_URL}/minorenne/getAll`,{
            method:'GET',
            headers : { 'Authorization': auth}
          
    }).then(res => {
      
            if (!res.ok) {
                return false
            }
            return res.json();
        }).then(res => {
            custupdate(res)
            let list=res.content?.minorenni;
            const ordina=[...list].sort((a,b)=>a.cognome>b.cognome ? 1 : -1,);
            setFoundUsers(ordina)
            
        });
    }
    //delete maggiorenne
     const delet=(params) =>{
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
   
         fetch (`${SERVER_URL}/minorenne/uuid" + "?UUID=" + params`, {
             method: "DELETE",
             //body: JSON.stringify(params),
             headers : { 'Authorization': auth,
                "Content-type": "application/json; charset=UTF-8" }
         })
             .then((response) => {
                loadcustomer();
                
                 return response
             })
             .then((response) => {
                loadcustomer();
                
                 return response.json()
             })
             .catch((error) => (console.log(error.status)));
            
             loadcustomer();
     }

     const filter = (e) => {
        const keyword = e.target.value;
    
        if (keyword !== '') {
          const results = custlist.content?.minorenni.filter((user) => {
            return user.cognome.toLowerCase().startsWith(keyword.toLowerCase());
            // Use the toLowerCase() method to make it case-insensitive
          });
          setFoundUsers(results);
        } else {
          setFoundUsers(custlist);
          // If the text field is empty, show all users
        }
       
        setName(keyword);
      };

    const handleadd = () => {
        if(haveadd){
        toast.success('added')
        }else{
            toast.warning('You are not having access for add');
        }
    }
    

    const handleremove = () => {
        if(haveremove){
        toast.success('removed')
        }else{
            toast.warning('You are not having access for remove');
        }
    }
    const handleedit = (minorenne) => {
        setMinorenne(minorenne);
        console.log(minorenne);
        navigate("/minorenne");
    }

    
    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Allievi :</h3>
                </div>
                <div className="card-body">
                
                    <input type="search" value={name} onChange={filter} className="input" placeholder="Cerca"/>
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Genitore:</th>
                                <th>Iscritto il:</th>
                                <th>Nato il:</th>
                                <th>Codice Fiscale</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Telefono</th>
                                <th>Azione</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foundUsers && foundUsers.length >0?(
                                foundUsers.map(item => (
                                    <tr key={item.minorenneUUID}>
                                        <td>{item.maggiorenni.nome+" "+item.maggiorenni.cognome}</td>
                                        <td>{item.maggiorenni.dataCreazione}</td>
                                        <td>{item.dataDiNascita}</td>
                                        <td>{item.cf}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.cognome}</td>
                                        <td>{item.maggiorenni.telefono}</td>
                                        <td>
                                            <button onClick={()=>navigateBorsellino(item.minorenneUUID)} className="btn btn-primary">Borsellino</button> |
                                            <button onClick={()=>handleedit(item)} className="btn btn-primary">Edit</button> |
                                            <button onClick={()=>{if  ( window . confirm ( 'Sei sicuro di voler eliminare questo elemento?' ) )delet(item.minorenneUUID)}} className="btn btn-danger">Remove</button>
                                        </td>

                                    </tr>
                                ))
                            ) :(<h1> non ci sono risultati</h1>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Allievi;