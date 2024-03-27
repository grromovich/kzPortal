import React from 'react';

export function PrintFrame({LoadClick, isLoaded}) {

    if(LoadClick){
        GetFIle();
    }

    return (
        <iframe 
            id='iprint'
            title="iprint"
            style={{display: 'none'}}
            onLoad={()=>{
                let iframe = document.querySelector("#iprint")
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                
            }}
        ></iframe>
    );

    async function GetFIle() {
        fetch('/api/filetoprint',
            {
                method: "POST",
                //withCrefentials: true,
                crossorigin: true,
                mode: "no-cors",
                headers: {"Content-Type": "application/json" },
                body: JSON.stringify({
                    APIkey: sessionStorage.getItem("APIkey"),
                })
            })
            .then((data) => data.json())
            .then(data=> {
                var base64str = data['file'];

                // decode base64 string, remove space for IE compatibility
                var binary = atob(base64str.replace(/\s/g, ''));
                var len = binary.length;
                var buffer = new ArrayBuffer(len);
                var view = new Uint8Array(buffer);
                for (var i = 0; i < len; i++) {
                    view[i] = binary.charCodeAt(i);
                }

                // create the blob object with content-type "application/pdf"               
                var blob = new Blob( [view], { type: "application/pdf" });
                var url = URL.createObjectURL(blob);

                let iframe = document.querySelector("#iprint")
                iframe.src = url
                
                isLoaded();
            })
        }
}
 