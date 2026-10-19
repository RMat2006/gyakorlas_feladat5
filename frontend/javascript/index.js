const PostMethod = async (url,data)=>{
    try{
        const response = await fetch(url,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error("POST hiba: ",response.status);
        }
        return await response.json();
    }catch(error){
        throw new Error("Hiba: ",error.message);
    }
}


const GetMethod = async (url)=>{
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("GET hiba: ", response.status);
        }
        return await response.json();
    }catch(error){
        throw new Error("Hiba: ", error.message);
    }
}

document.addEventListener("DOMContentLoaded", async ()=>{
    try{
        document.getElementById("gomb").addEventListener("click", async ()=>{
            gombnyomas();
            const ul = document.querySelector("ul");
            ul.addEventListener("click", (event) => {
                event.target.style.textDecoration = "line-through";
            });
        })
        

        async function gombnyomas(){
            const form = document.getElementById("form");
            const feladat = document.getElementById("feladat")
            let feladatErtek = feladat.value
            const lista = document.getElementById("lista")

            const postResponse = await PostMethod("/api/todos", {
            task: feladatErtek
            })
            console.log(postResponse);

            const getResponse = await GetMethod("/api/todos");
            console.log(getResponse);
            lista.replaceChildren();
            for(let i=0;i<getResponse.objektum.length;i++){
                const li = document.createElement("li");
                li.innerText = getResponse.objektum[i]
                
                lista.appendChild(li);   
            }
        }

        
    }catch(error){
        console.error("Hiba!", error.message);
    }
})