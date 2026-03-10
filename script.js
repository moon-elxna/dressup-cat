//---main---
const showcase = [
    {index: 0, name: "accessories",   min: null, max: 2, current: []}, 
    {index: 1, name: "top",           min: null, max: 3, current: []}, 
    {index: 2, name: "bottom",        min: null, max: 3, current: []}, 
]
const arrows = ["right", "left"];
const amount_of_showcase_img = 3;
load_showcase_img();


//---EventListeners---
//all btns of showcase
for(let i = 0; i < showcase.length; i++){
    for(let j = 0; j < arrows.length; j++){
        document.getElementById("showcase_btn_" + arrows[j] + "_" + showcase[i].name)
        .addEventListener("click", function(){showcase_elements_arrow_buttons(i, arrows[j])});
    }
}

//---functions---
function load_showcase_img(){
    //loads images for each element by loop through array and calling function
    for(let i = 0; i < showcase.length; i++){
        showcase[i].min = 0;
        build_showcase_current(i); //set min img to 0
        load_img(i, arrows[0]);
    }
    //builds up empty array
    function build_showcase_current(index){
        for(let i = 0; i < amount_of_showcase_img; i++){
            showcase[index].current.push(showcase[index].min + i)
        }
        console.log("build " + showcase[index].current);
    }   
}

function showcase_elements_arrow_buttons(index, direction){
    //create local var from array
    const name = showcase[index].name;
    const min = showcase[index].min;
    const max = showcase[index].max;
    let current = showcase[index].current;
    //array loops image ids
    if(direction === "right"){
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
    //set array
    showcase[index].current = current;
    console.log("btns arr " + current);
    //reload needed imgs
    load_img(index, direction);
}

function load_img(index, direction){
    //create local var from array
    const name = showcase[index].name;
    const current = showcase[index].current;
    //find div by id
    const div = document.getElementById("showcase_img_" + name);
    //loop through 3 images of an element
    for(let i = 0; i < amount_of_showcase_img; i++){
        const num = String(current[i]);
        //check if img does not exist, then add the image
        if(document.getElementById(name + num) === null){ 
            //create and append btn w image
            const btn = document.createElement("button");
            btn.id = "btn_" + name + num;
            btn.style.width = "150px"; btn.style.height = btn.style.width; 
            const img = document.createElement("img");
            img.src = "assets/" + name + num + ".PNG";
            img.alt = name;
            img.id = name + num;
            img.style.width = "150px"; 
            
            if(direction === arrows[0]){
                btn.append(img);
                div.append(btn);
            }
            else{
                btn.prepend(img);
                div.prepend(btn);
            }   
        }
    }
}

/*
    //loop through 3 images of an element
    for(let i = 0; i < amount_of_showcase_img; i++){
        //check if img does not exist and is in the range for possible img -> only then add the image
        if(first_img + i >= min && first_img + i <= max && document.getElementById(name + String(first_img + i)) == null){ 
            //create and append image
            console.log("assets/" + name + String(first_img + i) + ".PNG");
            const img = document.createElement("img");
            img.src = "assets/" + name + String(first_img + i) + ".PNG";
            img.alt = name;
            img.id = name + String(first_img + i);
            img.width = 150;
            div.appendChild(img);
        }
    }
    ------------------------------------------------
        if(direction === 0){
        if(first_img + amount_of_showcase_img - 1 === max){
            //clear all img
            document.getElementById("showcase_img_" + name).innerHTML = "";
            first_img = min
        }
        else{
            //remove image on first position of showcase 
            const img = document.getElementById(name + String(first_img))
            img.remove();
            first_img = first_img + 1
        } 
    } 
    //for left arrow - a ton of issues
    else{
        if(first_img === min){
            //clear all img
            document.getElementById("showcase_img_" + name).innerHTML = "";
            first_img = max + 1 - amount_of_showcase_img     
        }
        else{
            //remove image on last position of showcase 
            const img = document.getElementById(name + String(first_img + (amount_of_showcase_img - 1)))
            img.remove();
            first_img = first_img - 1
        }       
    }
*/