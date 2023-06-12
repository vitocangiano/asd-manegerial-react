function FormMinorenni({minorenni, setMinorenni, formValidation}){
  const addRow = () => {
    setMinorenni([
      ...minorenni,
      {
        nome: "",
        cognome: "",
        dataDiNascita: "",
        indirizzo: "",
        luogoDiNascita: "",
        cf: "",
      },
    ]);
  };
  const onRemove = (i) => {
    const newForm = [...minorenni];
    newForm.splice(i, 1);
    setMinorenni(newForm);
  };
  const onHandle = (e, i) => {
    let newForm = [...minorenni];
    newForm[i][e.target.name] = e.target.value;
    setMinorenni(newForm);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();

  };
  return (
    <div className="container">
      <h3>Dati del minore</h3>
      <div className="minorenne">
      
        <form onSubmit={onSubmit}>
          {minorenni.map((item, i) => (
            <div>
         
              
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={item.nome || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.nameCheck}
                 
                  {item.nameLengthCheck}
                </div>

                <input
                  type="text"
                  name="cognome"
                  placeholder="cognome"
                  value={item.cognome || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.cognomeCheck}
                  
                  {item.cognomeLengthCheck}
                </div>

                <input
                  type="date"
                  name="dataDiNascita"
                  placeholder="cognome"
                  value={item.dataDiNascita || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.dataDiNascitaCheck}
                 
                </div>

                <input
                  type="text"
                  name="indirizzo"
                  placeholder="indirizzo"
                  value={item.indirizzo || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.indirizzoCheck}
                 
                </div>

                <input
                  type="text"
                  name="luogoDiNascita"
                  placeholder="luogo di nascita"
                  value={item.luogoDiNascita || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.luogoDiNascitaCheck}
                  
                </div>
                <input
                  type="text"
                  name="cf"
                  placeholder="codice fiscale"
                  value={item.cf.toUpperCase() || ""}
                  onChange={(e) => onHandle(e, i)}
                />
                <div style={{ color: "red" }}>
                  {item.cfCheck}
            
                </div>
                {i === 0 ? (
                  ""
                ) : (
                  <button className="elimina" onClick={() => onRemove(i)}>Rimuovi</button>
                )}
              <hr></hr>
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            <button className="invia" onClick={addRow}>inserisci un altro minore</button>
            
           
          </div>
        </form>
     </div>
    </div>
  );
}
export default FormMinorenni