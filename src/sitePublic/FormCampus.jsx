import { useState } from "react";
import './FormCampus.css';
import FormMinorenni from "./FormMinorenni";
import FormMaggiorenne from "./FormMaggiorenne";
import { useNavigate } from "react-router-dom";
import logo from "./logoEsteso.png"
import { SERVER_URL } from "../Url";
import Footer from "./Footer";
function FormCampus({setData,err, setErr, setIsLoading}){
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  
  
    
    const [minorenni, setMinorenni] = useState([
        {
          nome: "",
          cognome: "",
          dataDiNascita: "",
          indirizzo: "",
          luogoDiNascita: "",
          cf: "",
        },
      ]);
      const [maggiorenne, setMaggiorenne] = useState({
        maggiorenne: {
          cognome: "",
          nome: "",
          email: "",
          dataDiNascita: "",
          cf:"",
          indirizzo:"",
          telefono:"",
          luogoDiNascita:"",
          emailConf:"",
        },
        minorenni: [
          
        ],
      });
      //api add campus
      const handleClick = async () => {
        setIsLoading(true);
    
        try {
          const response = await fetch(`${SERVER_URL}/maggiorenne/add`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-maggiorenne-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(maggiorenne), // body arrayMinorenni type must match "Content-Type" header
          });
    
          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }
    
          const result = await response.json();
    
          console.log("result is: ", JSON.stringify(result, null, 4));
    
          setData(result);
        } catch (err) {
          setErr(err.message);
        } finally {
          setIsLoading(false);
        }
      };
    
     
      const formValidation = (minorenni) => {
        const arrayMinorenni = [...minorenni];
        
        let re = /\S+@\S+\.\S+/;
        let co = /^[A-Z]{6}\d{2}\D\d{2}\D\d{3}\D$/;
        let valid = false;
        let vNome=true;
        let vCognome=true;
        let vData=true;
        let vCF=true;
        let vIndirizzo=true;
        let vLuogo=true;
        let mNome=true;
        let mCognome=true;
        let mData=true;
        let mLuogo=true;
        let mIndirizzo=true;
        let mCF=true;
        let mTelefono=true;
        let mMail=true;
        let mEmailConf=true;
        //magg nome
          if (maggiorenne.maggiorenne.nome == "") {
            maggiorenne.nameCheck = "nome necessario";
            maggiorenne.nameLengthCheck = "";
            maggiorenne.class="error";
            mNome = false;
          } else if (maggiorenne.maggiorenne.nome.length < 3) {
            maggiorenne.nameLengthCheck = "nome troppo breve";
            maggiorenne.nameCheck = "";
            maggiorenne.class="error";
            mNome = false;
          } else {
            maggiorenne.nameCheck = "";
            maggiorenne.nameLengthCheck = "";
            maggiorenne.class="ok";
            mNome = true;
          }
          // magg cognome
          if (maggiorenne.maggiorenne.cognome == "") {
            maggiorenne.cognomeCheck = "cognome necessario";
            maggiorenne.cognomeLengthCheck = "";
            maggiorenne.classCognome="error";
            mCognome = false;
          } else if (maggiorenne.maggiorenne.cognome.length < 2) {
            maggiorenne.cognomeLengthCheck = "cognome troppo breve";
            maggiorenne.cognomeCheck = "";
            maggiorenne.classCognome="error";
            mCognome = false;
          } else {
            maggiorenne.cognomeCheck = "";
            maggiorenne.cognomeLengthCheck = "";
            maggiorenne.classCognome="ok";
            mCognome = true;
          }

        //magg arrayMinorenni
        if (maggiorenne.maggiorenne.dataDiNascita == "") {
          maggiorenne.dataDiNascitaCheck = "data necessaria";
          mData = false;
          maggiorenne.classData="error";
        } else {
          maggiorenne.dataDiNascitaCheck = "";
          mData=true;
          maggiorenne.classData="ok";
        }
         //magg luogo di nascita
         if (maggiorenne.maggiorenne.luogoDiNascita == "") {
          maggiorenne.luogoDiNascitaCheck = "Inserire Luogo";
          mLuogo= false;
          maggiorenne.classLuogo="error";
        } else {
          maggiorenne.luogoDiNascitaCheck = "";
          mLuogo=true;
          maggiorenne.classLuogo="ok";
        }

        

             //magg indirizzo
         if (maggiorenne.maggiorenne.indirizzo == "") {
          maggiorenne.indirizzoCheck = "Indirizzo necessario";
          mIndirizzo= false;
          maggiorenne.classIndirizzo="error";
        } else {
          maggiorenne.indirizzoCheck = "";
          mIndirizzo=true;
          maggiorenne.classIndirizzo="ok";
        }

        //magg codice fiscale
        if (maggiorenne.maggiorenne.cf == "") {
          maggiorenne.cfCheck = "cf necessario";
          mCF = false;
          maggiorenne.classCF="error"
        } else if (!co.test(maggiorenne.maggiorenne.cf)) {
          maggiorenne.cfCheck = "Invalido C.F.";
          maggiorenne.classCF="error"
          mCF = false;
        } else {
          maggiorenne.cfCheck = "";
          maggiorenne.classCF="ok"
          mCF = true;
        }

        //magg telefono
             //magg indirizzo
             if (maggiorenne.maggiorenne.telefono == "") {
              maggiorenne.telefonoCheck = "Telefono necessario";
              mTelefono= false;
              maggiorenne.classTelefono="error";
            } else {
              maggiorenne.telefonoCheck = "";
              mTelefono=true;
              maggiorenne.classTelefono="ok";
            }
        
            //email
            if(maggiorenne.maggiorenne.email == "") {
              maggiorenne.emailCheck = "email richiesta"
              maggiorenne.emailmaggiorenneat = ""
              mMail = false
              maggiorenne.classEmail="error"
      
            } else if(!re.test(maggiorenne.maggiorenne.email)) {
                maggiorenne.emailmaggiorenneat = "non valida Email"
                maggiorenne.emailCheck = ""
                mMail = false
                maggiorenne.classEmail="error"
            }
            else{
              maggiorenne.emailCheck = ""
              maggiorenne.emailmaggiorenneat = ""
              mMail = true
              maggiorenne.classEmail="ok"
            }
            
            //magg email conf
            mEmailConf = maggiorenne.maggiorenne.email==maggiorenne.maggiorenne.emailConf?true:false;
            maggiorenne.classConfemail = mEmailConf==true?"ok":"error";
        
        for (let index = 0; index < arrayMinorenni.length; index++) {
          // const element = arrayMinorenni[index];
          if (arrayMinorenni[index].nome == "") {
            arrayMinorenni[index].nameCheck = "name required";
            arrayMinorenni[index].nameLengthCheck = "";
            vNome = false;
          } else if (arrayMinorenni[index].nome.length < 4) {
            arrayMinorenni[index].nameLengthCheck = "nome troppo breve";
            arrayMinorenni[index].nameCheck = "";
            vNome = false;
          } else {
            arrayMinorenni[index].nameCheck = "";
            arrayMinorenni[index].nameLengthCheck = "";
            vNome = true;
          }
          //cognome
          if (arrayMinorenni[index].cognome == "") {
            arrayMinorenni[index].cognomeCheck = "Cognome necessario";
            arrayMinorenni[index].cognomeLengthCheck = "";
            vCognome = false;
          } else if (arrayMinorenni[index].cognome.length < 2) {
            arrayMinorenni[index].cognomeLengthCheck = "cognome troppo breve";
            arrayMinorenni[index].cognomeCheck = "";
            vCognome = false;
          } else {
            arrayMinorenni[index].cognomeCheck = "";
            arrayMinorenni[index].cognomeLengthCheck = "";
            vCognome = true;
          }
          //arrayMinorenni di nascita
          if (arrayMinorenni[index].dataDiNascita == "") {
            arrayMinorenni[index].dataDiNascitaCheck = "data necessaria";
            vData = false;
          } else {
            arrayMinorenni[index].dataDiNascitaCheck = "";
            vData=true;
          }
    
          //indirizzo
          if (arrayMinorenni[index].indirizzo == "") {
            arrayMinorenni[index].indirizzoCheck = "indirizzo necessario";
            vIndirizzo= false;
          } else {
            arrayMinorenni[index].indirizzoCheck = "";
            vIndirizzo = true;
          }
          //luogo di nascita
          if (arrayMinorenni[index].luogoDiNascita == "") {
            arrayMinorenni[index].luogoDiNascitaCheck = "luogo di nascita necessario";
            vLuogo = false;
          } else {
            arrayMinorenni[index].luogoDiNascitaCheck = "";
            vLuogo=true;
          }
          //codice fiscale
          if (arrayMinorenni[index].cf == "") {
            arrayMinorenni[index].cfCheck = "cf necessario";
            vCF = false;
          } else if (!co.test(arrayMinorenni[index].cf)) {
            arrayMinorenni[index].cfCheck = "Invalido C.F.";
    
            vCF = false;
          } else {
            arrayMinorenni[index].cfCheck = "";
    
            vCF = true;
          }
    
        }
        //&& vCognome && vIndirizzo && vLuogo && vCF && mCognome && mNome && mEmailConf && mMail && mTelefono && mCF && mIndirizzo && mLuogo && marrayMinorenni
        setMinorenni(arrayMinorenni);
        if(vNome && vCognome && vIndirizzo && vLuogo && vCF && mCognome && mNome && mEmailConf && mMail && mTelefono && mCF && mIndirizzo && mLuogo && mData && isChecked ==true){
          valid=true;
        }else{
          valid=false;
        }
        return valid;
      };
      function mixmaggiorenne(){
        const errorRes = formValidation(minorenni);
        console.log(errorRes)
        if(errorRes==true){
            for(let i=0; i<minorenni.length;i++){
                console.log("minorenni : ",minorenni);
                maggiorenne.minorenni.push(minorenni[i]);
                console.log("maggiorenne",maggiorenne) 
            }
            handleClick();
                navigate('/resultform');  
        }else{
            console.log("compila bene i campi")
        }
        
        console.log(maggiorenne);
      }
      const onSubmit = (e) => {
        e.preventDefault();
        console.log("submitarrayMinorenni", minorenni);
        const errorRes = formValidation(minorenni);
        console.log("errorRes", errorRes);
        if (!errorRes) {
          //error
        } else {
          // api call con
          console.log("foorm buono "+ JSON.stringify(minorenni))
        }
      };
      const handleOnChange = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
      };
      let resultError;
      isChecked ? resultError="ok" : resultError="error";
    return(
        <>
        <br></br>
        <div className="logo">
        <img src={logo}></img>
        </div>
        
        <div className="info">
          <ul>
            <li>
            <h5>Modulo di iscrizione al corso di scuola dello sport</h5>
            </li>
            <li>
            <h6>Ti arriverà una email, scarica l'allegato e portalo in segreteria</h6>
            </li>
          </ul>
        
        
        </div>
        {<FormMaggiorenne maggiorenne={maggiorenne} setMaggiorenne={setMaggiorenne}/>}
        {<FormMinorenni minorenni={minorenni} setMinorenni={setMinorenni}  formValidation={formValidation}/>}
        <div className="fineForm">
        <div className="ceckBox">
         <input type="checkbox" id="topping" name="topping" value="Paneer" onChange={handleOnChange} checked={isChecked} />Informativa privacy
        <div className={resultError}>
         
         <h6>{resultError=="error" ? " -->Obbligatorio" : ""}</h6>
      </div>
      </div>
        <div className="submit">
        
        <button onClick={mixmaggiorenne}>INVIA MODULO</button>
        </div>
        </div>
        {<Footer/>}
        </>
    )
}
export default  FormCampus