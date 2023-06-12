function ResultForm({ data, setData, err, setErr,isLoading }) {
    console.log(data)
    let nome;
   
  return (
    <>
    <div className="contenuto">
    <h3>result form</h3>
      {isLoading && <h2>Loading...</h2>}
      {err && <h2>{err}</h2>}
      <div className="col">
     
        <h5>{data.message}</h5>
        <h5>{data.error}</h5>
      </div>
    </div>
      
    </>
  );
}
export default ResultForm;
