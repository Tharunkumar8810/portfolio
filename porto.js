let a=document.getElementById("color-mode")
a.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
       let a= document.getElementById("color-mode").innerHTML=`<i class="fa-solid fa-sun"></i> light mode`
       a.style.color="gold"
    }
    else{
        document.getElementById("color-mode").innerHTML=`<i class="fa-solid fa-moon"></i> dark mode`
   
    }})
