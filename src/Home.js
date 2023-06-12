import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from './logoEsteso.png';
import { SERVER_URL } from "./Url";

const Home = () => {
    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);
   
    const allPagamenti=(string)=>{
        
        let jwt =sessionStorage.getItem('jwttoken');
        let auth = "Bearer "+jwt;
        console.log(auth)
       
         fetch (`${SERVER_URL}/${string}/export`, {
             method: "GET",
             
             //body: JSON.stringify(params),
             headers : { 'Authorization': auth,
             "Content-disposition" : "attachment; filename=[pagamenti]" ,
             "Content-Type" : "application/csv"}
         })
         .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = string+'.csv';
                a.click();
            });
            //window.location.href = response.url;
    });
}

    return (
        <div>
            <div className="logo">
          
            </div>
            
            <div className="container">
                <div className="download">
                    <div id="title">
                    <h3>DOWNLOAD</h3>
                    </div>
                    <div>
                    <button onClick={()=>allPagamenti("pagamenti")}>Ricevute</button>
                    </div>
                    <div>
                    <button onClick={()=>allPagamenti("borsellino")}>Borsellino</button>
                    </div> 
                </div>
                
            </div>
           
            {/* <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Code</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Credit Limit</td>
                    </tr>
                </thead>
                <tbody>
                    {customerlist &&
                        customerlist.map(item => (
                            <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.creditLimit}</td>
                            </tr>

                        ))
                    }
                </tbody>

            </table> */}
        </div>
    );
}

export default Home;