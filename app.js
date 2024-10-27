

const input = document.querySelector("input")
const button = document.querySelector("button")
const to_do_list = document.querySelector("#to_do_list");

// localStorage.clear()
let items;

if(localStorage.key("items")){
    items = JSON.parse(localStorage.getItem("items"))
    for(let i of items){
        if(i.checked == false){
            to_do_list.innerHTML += `<li><p>${i.text}</p><i class = "fa fa-remove"></i></li>`;
        }else {
            to_do_list.innerHTML += `<li class="done"><p>${i.text}</p><i class = "fa fa-remove"></i></li>`;
        }
    }
    done();
    remove();
}else {
    items = []
}



button.addEventListener("click" , e=>{
    const jsObj = {
        "text" : input.value,
        "checked" : false
    }
    items.push(jsObj)
    to_do_list.innerHTML += `<li><p>${input.value}</p><i class = "fa fa-remove"></i></li>`
    localStorage.setItem("items",JSON.stringify(items));
    input.value = "";
    done();
    remove();
})



function done(){
    const li = document.querySelectorAll("#to_do_list li");
    li.forEach(item=>{
        item.addEventListener("dblclick" , e=>{
            e.target.classList.toggle("done")
            let content = e.target.firstElementChild.innerHTML;
            for(let i of items){
                if(i.text == content){
                    i.checked = true;
                }
            }
        localStorage.setItem("items",JSON.stringify(items));
        })
    })
}



function remove(){
    const removeBtn = document.querySelectorAll("#to_do_list li i");
    removeBtn.forEach(item=>{
        item.addEventListener("click" , e=>{
            to_do_list.removeChild(e.target.parentElement);
            let content = e.target.parentElement.firstElementChild.innerHTML;
            for(let i of items){
                if(i.text == content){
                    items.splice(items.indexOf(i), 1);
                    console.log(items)
                }
            }
            localStorage.setItem("items",JSON.stringify(items));
        });
    })
}