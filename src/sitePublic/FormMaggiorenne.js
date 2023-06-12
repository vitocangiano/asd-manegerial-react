function FormMaggiorenne({maggiorenne, setMaggiorenne}){
    const onChangeName = (e)=>{
        setMaggiorenne({
            ...maggiorenne,
            maggiorenne:{
              ...maggiorenne.maggiorenne,nome:e.target.value
            }
        })
    }
    const onChangeCognome = (e)=>{
        setMaggiorenne({
          ...maggiorenne,
          maggiorenne:{
            ...maggiorenne.maggiorenne,cognome:e.target.value
          }
        })
    }
    
    const onChangeEmail = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,email:e.target.value
        }
      })
    }
    const onChangeEmailConf = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,emailConf:e.target.value
        }
      })
    }
    const onChangeData = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,dataDiNascita:e.target.value
        }
      })
    }
    const onChangecf = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,cf:e.target.value
        }
      })
    }
    const onChangeTelefono = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,telefono:e.target.value
        }
      })
    }
    const onChangeLuogo = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,luogoDiNascita:e.target.value
        }
      })
    }
    const onChangeIndirizzo = (e)=>{
      setMaggiorenne({
        ...maggiorenne,
        maggiorenne:{
          ...maggiorenne.maggiorenne,indirizzo:e.target.value
        }
      })
    }
    
      return (
        
          <div>
                <div className='container'>
                <h3>Dati del genitore</h3>
                <div className="maggiorenneForm">
                <maggiorenne >
                    <div className={maggiorenne.class}>
                        <label htmlFor="nome"></label>
                        <input type="text" name="nome" placeholder="Nome" onChange={onChangeName} value={maggiorenne.maggiorenne.nome}/>
                        <div style={{ color: "red" }}>{maggiorenne.nameCheck}{maggiorenne.nameLengthCheck}
                    </div>
                    </div>
                    <div className={maggiorenne.classCognome}>
                        <label htmlFor="cognome"></label>
                        <input type="text" name="cognome" placeholder="Cognome" onChange={onChangeCognome} value={maggiorenne.maggiorenne.cognome}/>
                        <div style={{ color: "red" }}>{maggiorenne.cognomeCheck}{maggiorenne.cognomeLengthCheck}</div>
                    </div>
                    <div className={maggiorenne.classData}>
                        <label htmlFor="data"></label>
                        <input type="date" name="data" placeholder="Data di nascita" onChange={onChangeData} value={maggiorenne.maggiorenne.dataDiNascita}/>
                        <div style={{ color: "red" }}>{maggiorenne.dataDiNascitaCheck}</div>
                    </div>
                    <div className={maggiorenne.classLuogo}>
                        <label htmlFor="luogo"></label>
                        <input type="luogo" name="luogo" placeholder="Luogo di nascita" onChange={onChangeLuogo} value={maggiorenne.maggiorenne.luogoDiNascita}/>
                        <div style={{ color: "red" }}>{maggiorenne.luogoDiNascitaCheck}</div>
                    </div>
                    <div className={maggiorenne.classIndirizzo}>
                        <label htmlFor="indirizzo"></label>
                        <input type="text" name="indirizzo" placeholder="Indirizzo" onChange={onChangeIndirizzo} value={maggiorenne.maggiorenne.Indirizzo}/>
                        <div style={{ color: "red" }}>{maggiorenne.indirizzoCheck}</div>
                    </div>
                    <div className={maggiorenne.classCF}>
                        <label htmlFor="cf"></label>
                        <input type="text" name="cf" placeholder="Codice Fiscale" onChange={onChangecf} value={maggiorenne.maggiorenne.cf.toUpperCase()}/>
                        <div style={{ color: "red" }}>{maggiorenne.cfCheck}</div>
                    </div>
                    <div className={maggiorenne.classTelefono}>
                        <label htmlFor="telefono"></label>
                        <input type="text" name="telefono" placeholder="Telefono" onChange={onChangeTelefono} value={maggiorenne.maggiorenne.Telefono}/>
                        <div style={{ color: "red" }}>{maggiorenne.telefonoCheck}</div>
                    </div>
                    <div className={maggiorenne.classEmail}>
                        <label htmlFor="email"></label>
                        <input type="email" name="email" placeholder="Email" onChange={onChangeEmail} value={maggiorenne.maggiorenne.email}/>
                        <div style={{ color: "red" }}>{maggiorenne.emailCheck}{maggiorenne.emailmaggiorenneat}</div>
                    </div>
                    <div className={maggiorenne.classConfemail}>
                        <label htmlFor="emailConf"></label>
                        <input type="email" name="emailConf" placeholder="Email Conferma" onChange={onChangeEmailConf} value={maggiorenne.maggiorenne.emailConf}/>
                    </div>
    
                </maggiorenne>
                </div>
                </div>
            </div>
        
      );
    }
export default FormMaggiorenne