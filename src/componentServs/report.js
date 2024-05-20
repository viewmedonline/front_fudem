import axios from "axios";

function getReport(dateFrom,dateTo,report,filename) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_ROOT_API}/report/${report}/${dateFrom}/${dateTo}/csv`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': ""
            },
            responseType: 'blob', 
        }).then(result => {
            // resolve(result.data.documents)
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename+'.csv'); // o cualquier otro nombre de archivo
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            resolve(true)
        }).catch(error => {
            reject(error.response.data.message)
        })
    })
}

export {
    getReport,
}