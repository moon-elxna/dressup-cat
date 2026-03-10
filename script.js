//---main---
const showcase = [
    {name: "accessories",   min: 0, max: 2, current: []}, 
    {name: "top",           min: 0, max: 3, current: []}, 
    {name: "bottom",        min: 0, max: 3, current: []}, 
]
const arrow = ["right", "left"];
const amount_showcase = 3;
load_showcase_img();

//all btns of showcase
for(let i = 0; i < showcase.length; i++){
    for(let j = 0; j < arrow.length; j++){
        document.getElementById("showcase_btn_" + arrow[j] + "_" + showcase[i].name)
            .addEventListener("click", function(){showcase_elements_arrow_buttons(i, j)});
    }
}

//---functions---
function load_showcase_img(){
    read_localstorage();
    //loads images for each element by loop through array and calling function
    for(let i = 0; i < showcase.length; i++){
        load_img(i, 0);
    }
}

function showcase_elements_arrow_buttons(index, arrow){
    //create local var from array
    const name = showcase[index].name;
    const min = showcase[index].min;
    const max = showcase[index].max;
    let current = showcase[index].current;
    //array loops image ids
    if(arrow === 0){
        //remove first img
        document.getElementById("btn_" + name + String(current[0])).remove();
        //change array
        for(let i = 0; i < current.length; i++){
            if(current[i] === max){
                current[i] = min;
            }
            else{
                current[i] = current[i] + 1
            }
        }
    } 
    else{
        //remove last img
        document.getElementById("btn_" + name + String(current[current.length - 1])).remove();
        //change array
        for(let i = 0; i < current.length; i++){
            if(current[i] === min){
                current[i] = max;
            }
            else{
                current[i] = current[i] - 1
            }
        }
    }
    showcase[index].current = current;
    localStorage.setItem(name +".current", JSON.stringify(current));
    load_img(index, arrow);
}

function load_img(index, arrow){
    //create local var from array
    const name = showcase[index].name;
    const current = showcase[index].current;
    //find div by id
    const div = document.getElementById("showcase_img_" + name);
    //loop through 3 images of an element
    for(let i = 0; i < amount_showcase; i++){
        const element_number = String(current[i]);
        //check if img does not exist, then add the image
        if(document.getElementById(name + element_number) === null){ 
            //create and append btn w image
            const btn = document.createElement("button");
            btn.id = "btn_" + name + element_number; btn.className = "showcase_clothes";
            const img = document.createElement("img");
            img.src = "assets/showcase/" + name + element_number + ".PNG"; img.alt = name;
            img.id = name + element_number; img.className = "showcase_clothes";
            if(arrow === 0){
                btn.append(img); div.append(btn);
            }
            else{
                btn.prepend(img); div.prepend(btn);
            }   
            //Eventlistener
            btn.addEventListener("click", function(){change_img(name, element_number)});
        }
    }
}

function change_img(name, index){
    const source = "assets/dressup/" + name + String(index) + ".PNG";
    document.getElementById(name).src = source;
    localStorage.setItem(name, source);
}

function read_localstorage(){
    for(let i = 0; i < showcase.length; i++){
        const name = showcase[i].name;
        //dressup images
        let source = localStorage.getItem(name);
        if(source != null){
            document.getElementById(name).src = source;
        }   
        else{
            source = "assets/dressup/" + name + "0.PNG"
            document.getElementById(name).src = source;
            localStorage.setItem(name, source);
        }
        //showcase images
        const array = JSON.parse(localStorage.getItem(name + ".current"))
        if(array != null){
            showcase[i].current = array;
        }
        else{
            for(let j = 0; j < amount_showcase; j++){
                showcase[i].current.push(showcase[i].min + j);
            }
        }
    }
}