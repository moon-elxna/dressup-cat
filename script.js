//---main---
const showcase = [
    {name: "accessories",   min: null, max: 2, current: []}, 
    {name: "top",           min: null, max: 3, current: []}, 
    {name: "bottom",        min: null, max: 3, current: []}, 
]
const arrow = ["right", "left"];
const amount_showcase = 3;
load_showcase_img();

//---EventListeners---
//all btns of showcase
for(let i = 0; i < showcase.length; i++){
    for(let j = 0; j < arrow.length; j++){
        document.getElementById("showcase_btn_" + arrow[j] + "_" + showcase[i].name)
        .addEventListener("click", function(){showcase_elements_arrow_buttons(i, j)});
    }
}

//---functions---
function load_showcase_img(){
    //loads images for each element by loop through array and calling function
    for(let i = 0; i < showcase.length; i++){
        showcase[i].min = 0;
        build_showcase_current(i); //set min img to 0
        load_img(i, 0);
    }
    //builds up empty array
    function build_showcase_current(index){
        for(let i = 0; i < amount_showcase; i++){
            showcase[index].current.push(showcase[index].min + i)
        }
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
        const num = String(current[i]);
        //check if img does not exist, then add the image
        if(document.getElementById(name + num) === null){ 
            //create and append btn w image
            const btn = document.createElement("button");
            btn.id = "btn_" + name + num;
            btn.style.width = "156px"; btn.style.height = "108px"; 
            const img = document.createElement("img");
            img.src = "assets/showcase/" + name + num + ".PNG";
            img.alt = name;
            img.id = name + num;
            img.style.width = btn.style.width; img.style.height = btn.style.heigh;
            
            if(arrow === 0){
                btn.append(img); div.append(btn);
            }
            else{
                btn.prepend(img); div.prepend(btn);
            }   
        }
    }
}