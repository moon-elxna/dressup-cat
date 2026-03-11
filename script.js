//---main---
const showcase = [
    {name: "accessories",   min: 0, max: 2, current: [], current_item: null}, 
    {name: "top",           min: 0, max: 3, current: [], current_item: null}, 
    {name: "bottom",        min: 0, max: 3, current: [], current_item: null}, 
]
const arrow = ["right", "left"];
const amount_showcase = 3;
load_game();

//all btns of showcase
for(let i = 0; i < showcase.length; i++){
    for(let j = 0; j < arrow.length; j++){
        document.getElementById("showcase_btn_" + arrow[j] + "_" + showcase[i].name)
            .addEventListener("click", function(){showcase_arrow_btns(i, j)});
    }
}
document.getElementById("save").addEventListener("click", function(){save()});
document.getElementById("share").addEventListener("click", function(){share()});

//---functions---
function load_game(){
    //read local storage or set standart values
    for(let i = 0; i < showcase.length; i++){
        const name = showcase[i].name;
        //dressup images
        let element_number = localStorage.getItem(name);
        if(element_number != null){
            showcase[i].current_item = element_number;
            document.getElementById(name).src = "assets/dressup/" + name + String(element_number) + ".PNG";
        }   
        else{
            document.getElementById(name).src = "assets/dressup/" + name + "0.PNG";
            showcase[i].current_item = 0;
            localStorage.setItem(name, 0);
        }
        //showcase images
        const array = JSON.parse(localStorage.getItem(name + "_current"))
        if(array != null){
            showcase[i].current = array;
        }
        else{
            for(let j = 0; j < amount_showcase; j++){
                showcase[i].current.push(showcase[i].min + j);
            }
        }
    }

    //loads images for each showcase-element by loop through array and calling function
    for(let i = 0; i < showcase.length; i++){
        load_img(i, 0);
    }

    //set images for arrows
    for(let i = 0; i < showcase.length; i++){
        for(let j = 0; j < arrow.length; j++){
            const btn = document.getElementById("showcase_btn_" + arrow[j] + "_" + showcase[i].name)
            const img = document.createElement("img");
            img.alt = "arrow_" +arrow[j];
            img.className = "arrow"
            img.src = "assets/" + arrow[j] +"_arr.PNG";
            btn.append(img);
        }
        
    }
}

function showcase_arrow_btns(index, arrow){
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
    localStorage.setItem(name +"_current", JSON.stringify(current));
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
            btn.addEventListener("click", function(){ 
                //change img in dressup
                const source = "assets/dressup/" + name + String(element_number) + ".PNG";
                showcase[i].current_item = element_number;
                document.getElementById(name).src = source;
                localStorage.setItem(name, element_number);
            });
        }
    }
}

function save(){
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = canvas.width;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFCF8";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const body = document.getElementById("body");
    ctx.drawImage(body, 0, 0);
    for(let i = 0; i < showcase.length; i++){
        const img = document.getElementById(showcase[i].name);
        ctx.drawImage(img, 0, 0);
    }
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "dress-up_cat.png"
    link.click();
}

function share(){
    let url = "https://moon-elxna.github.io/dressup-cat/";
    //add parameters to link, "?parameter=value&parameter=value ..."
    for(let i = 0; i < showcase.length; i++){
        let sign = "&"
        if(i == 0){sign = "?";}
        url = url + sign + showcase[i].name + "=" + showcase[i].current_item;
    }
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
} 