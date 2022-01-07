export default function shearch(e,refTextShearch,setData,setBanderaUp,configSate){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let parametro = refTextShearch.current.childNodes[1].childNodes[0].value;
    parametro = parametro.length>0?parametro:0;
    let archivoDatos = {
        parametro,
        configSate,
        id:2,
    }
    archivoDatos = JSON.stringify(archivoDatos);
    fetch('/registro/shearch',{
        headers:{
            'X-CSRF-TOKEN':token,
            'Content-Type':'application/json',
        },
        method: 'POST', 
        body: archivoDatos, 
    })
    .then(res => {
        return res.text();
    })
    .then(result => {
        try {
            const data = JSON.parse(result);
            setData(data);
            setBanderaUp(true);
        } catch (error) {
            document.open();
            document.write(result);
            document.close();
        }
    });
}
