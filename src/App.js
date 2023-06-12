import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Customer from './Customer';
import Allievi from './Allievi';
import { useState } from 'react';
import Borsellino from './Borsellino';
import EditMaggiorenne from './EditMaggiorenne';
import EditMinorenne from './EditMinorenne';
import Pagamenti from './Pagamenti';
import InserimentoMaggiorenni from './InserimentoMaggiorenni';
import { SERVER_URL } from './Url';
import FormCampus from './sitePublic/FormCampus';
import ResultForm from './sitePublic/ResultForm';

function App() {
  const [data, setData] = useState({ data: [] });
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [maggiorenne, setMaggiorenne] = useState({})
  const [minorenne, setMinorenne] = useState({})
  const [dataPagamenti, setDataPagamenti] = useState({ data: [] });
  const [transactionData, setTransactionData] = useState("")
  //borsellino data
  const handleClick = async (params) => {
    setIsLoading(true);
    let jwt =sessionStorage.getItem('jwttoken');
    let auth = "Bearer "+jwt;
    try {
      const response = await fetch (`${SERVER_URL}/borsellino/get?UUID=` + params, {
        method: "GET",
        //body: JSON.stringify(params),
        headers : { 'Authorization': auth,
           "Content-type": "application/json; charset=UTF-8" },
        
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    
      }
      const result = await response.json();

      //const sortByData = (data) => data.sort(({date:a},{date:b})=>a < b ? -1 : a > b ? 1 : 0)
     
      setData(result);
      
    } catch (err) {
      setErr(err.message);
  
    } finally {
      setIsLoading(false);

    }
  };
  //pagamenti data
  const handlePagamenti = async (params) => {
    setIsLoading(true);
    let jwt =sessionStorage.getItem('jwttoken');
    let auth = "Bearer "+jwt;
    try {
      const response = await fetch (`${SERVER_URL}/pagamenti/get?UUID=` + params, {
        method: "GET",
        //body: JSON.stringify(params),
        headers : { 'Authorization': auth,
           "Content-type": "application/json; charset=UTF-8" },
        
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    
      }
      const result = await response.json();

      //const sortByData = (data) => data.sort(({date:a},{date:b})=>a < b ? -1 : a > b ? 1 : 0)
     
      setDataPagamenti(result);
      
    } catch (err) {
      setErr(err.message);
  
    } finally {
      setIsLoading(false);

    }
  };
  return (
    <div className="App">
      
      <ToastContainer theme='colored' position='top-center'>
      <Route path='/inserimento' element={<InserimentoMaggiorenni />}></Route>
      </ToastContainer>
 
      
   
      
      <BrowserRouter>
      
      <Appheader></Appheader>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/public' element={<FormCampus data={data} setData={setData} err={err} setErr={setErr} setIsLoading={setIsLoading}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/resultform" element={<ResultForm data={data} setData={setData} err={err} setErr={setErr} isLoading={isLoading}/>} />
    
        <Route path='/customer' element={<Customer setMaggiorenne={setMaggiorenne} handlePagamenti={handlePagamenti} />}></Route>
        <Route path='/allievi' element={<Allievi setMinorenne={setMinorenne} setData={setData} data={data} setErr={setErr} setIsLoading={setIsLoading} handleClick={handleClick}/>}></Route>
        <Route path='/borsellino' element={<Borsellino data={data} err={err} isLoading={isLoading} handleClick={handleClick} transactionData={transactionData} setTransactionData={setTransactionData}/>}></Route>
        <Route path='/pagamenti' element={<Pagamenti handlePagamenti={handlePagamenti} dataPagamenti={dataPagamenti}  transactionData={transactionData} setTransactionData={setTransactionData} />}></Route>
        <Route path='/maggiorenne' element={<EditMaggiorenne maggiorenne={maggiorenne} setMaggiorenne={setMaggiorenne}/>}></Route>
        <Route path='/minorenne' element={<EditMinorenne minorenne={minorenne} setMinorenne={setMinorenne}/>}></Route>
      
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
