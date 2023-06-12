import { useEffect } from "react";

function InserimentoMaggiorenni(){
    useEffect(()=>{
        sessionStorage.clear();
            },[]);
    return(
        <>
        <h1>inserimento</h1>
        </>
    )
}
export default InserimentoMaggiorenni