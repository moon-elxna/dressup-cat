//---main---
const showcase_elements = [
    {name: "accessories" , max_value: 3, first_img : 1}, 
    {name: "top" , max_value: 4, first_img : 1}, 
    {name: "bottom" , max_value: 4, first_img : 1}, 
]
const max_amount_of_showcase_img = 3;
const arrows = ["left", "right"]

load_showcase_img();
showcase_elements_arrow_buttons(1, 1)

//---EventListeners---
for(let i = 0; i < showcase_elements.length; i++){
    for(let j = 0; j < arrows.length; j++){
        //document.getElementById("showcase_btn_" + arrows[j] + "_" + showcase_elements[i].name).addEventListener("click", function(){showcase_elements_arrow_buttons(j, i)});
    }
}

//---functions---
function showcase_elements_arrow_buttons(index_arrows, index_showcase_elements){
    const name = showcase_elements[index_showcase_elements].name;
    const max_value = showcase_elements[index_showcase_elements].max_value;
    let first_img = showcase_elements[index_showcase_elements].first_img;
    if( max_value> max_amount_of_showcase_img){
        if(index_arrows == 0){ //left arrow
            first_img = first_img - 1;
            if(first_img >= 1){
                load_img(name, max_value, first_img );
                showcase_elements[index_showcase_elements].first_img = first_img;
            }
        }
        else{ //right arrow
            first_img = first_img + 1;
            if(first_img + (max_amount_of_showcase_img - 1) <= max_value) {
                load_img(name, max_value, first_img );
                showcase_elements[index_showcase_elements].first_img = first_img;
            }
        }  
    }
}

function load_showcase_img(){
    for(let i = 0; i < showcase_elements.length; i++){
        load_img(showcase_elements[i].name, showcase_elements[i].max_value, showcase_elements[i].first_img);
    }
}

function load_img(name, max_value, first_index){
        const div = document.getElementById("showcase_img_" + name);
        let diff;
        if(max_value > max_amount_of_showcase_img){
            diff = max_value - max_amount_of_showcase_img; 
        }
        else{
            diff = 0
        }
        for(let i = first_index; i <= (max_value - diff); i++){
            const img = document.createElement("img");
            img.src = "assets/" + name + String(i) + ".PNG";
            img.alt = name;
            img.id = name + String(i);
            img.width = 150;
            div.appendChild(img);
        }
    
    }