//---main---
const showcase_elements = [
    {index: 0, name: "accessories",   min_img: 0, max_img: 2, first_img : 0}, 
    {index: 1, name: "top",           min_img: 0, max_img: 3, first_img : 0}, 
    {index: 2, name: "bottom",        min_img: 0, max_img: 3, first_img : 0}, 
]
const arrows = ["right", "left"];
const amount_of_showcase_img = 3;

load_showcase_img();


//---EventListeners---
//all btns of showcase
for(let i = 0; i < showcase_elements.length; i++){
    for(let j = 0; j < arrows.length; j++){
        document.getElementById("showcase_btn_" + arrows[j] + "_" + showcase_elements[i].name)
        .addEventListener("click", function(){showcase_elements_arrow_buttons(i, j)});
    }
}

//---functions---
function showcase_elements_arrow_buttons(index, direction){
    //create local var from array
    const name = showcase_elements[index].name;
    const min_img = showcase_elements[index].min_img;
    const max_img = showcase_elements[index].max_img;
    let first_img = showcase_elements[index].first_img;
    //directions - for right arrow
    if(direction === 0){
        if(first_img + amount_of_showcase_img - 1 === max_img){
            //clear all img
            document.getElementById("showcase_img_" + name).innerHTML = "";
            first_img = min_img
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
        if(first_img === min_img){
            //clear all img
            document.getElementById("showcase_img_" + name).innerHTML = "";
            first_img = max_img + 1 - amount_of_showcase_img     
        }
        else{
            //remove image on last position of showcase 
            const img = document.getElementById(name + String(first_img + (amount_of_showcase_img - 1)))
            img.remove();
            first_img = first_img - 1
        }       
    }
    console.log(first_img);
    //set first_img
    showcase_elements[index].first_img = first_img;
    //reload needed imgs
    load_img(index);
}

function load_showcase_img(){
    //loads images for each element by loop through array and calling function
    for(let i = 0; i < showcase_elements.length; i++){
        load_img(i);
    }
}

function load_img(index){
    //create local var from array
    const name = showcase_elements[index].name;
    const min_img = showcase_elements[index].min_img;
    const max_img = showcase_elements[index].max_img;
    let first_img = showcase_elements[index].first_img;
    //find div by id
    const div = document.getElementById("showcase_img_" + name);
    //loop through 3 images of an element
    for(let i = 0; i < amount_of_showcase_img; i++){
        //check if img does not exist and is in the range for possible img -> only then add the image
        if(first_img + i >= min_img && first_img + i <= max_img && document.getElementById(name + String(first_img + i)) == null){ 
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
}