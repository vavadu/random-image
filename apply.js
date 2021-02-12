    // var obj=document.getElementsByClassName("alarm__height")[0];
    // obj.style.display == "block" ? obj.style.display = "none" : obj.style.display = "block";

// function alarm(){
     
//     const textElement = document.createElement('alarm');
//     textElement.id = "alarm";
//     textElement.className = "alarm";
//     textElement.style.display = "block";
//     textElement.textContent = "*Слишком большое значение. Максимальное значение = 5000";
//     document.querySelector('.inner__form').appendChild(textElement)

//     event.target.reset();
// };
function toggleClassByPredicate(predicate, element, className) {
    if (predicate) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}


function showPicture(event) {
    event.preventDefault();

    const formdata = new FormData(event.target);
    const data = new Map([...formdata.entries()]);

    const width = data.get('width');
    const height = data.get('height');
    console.log(data);
    const widthBorder = document.getElementById("width");
    const heightBorder = document.getElementById("height");

    const widthError =  (width > 5000);
    toggleClassByPredicate(
        widthError,
        document.getElementById('width_error'),
        'hidden',
    );


    const heightError =  (height > 5000);
    toggleClassByPredicate(
        heightError,
        document.getElementById('height_error'),
        'hidden',
    );
    const widthErrorType = isNaN(width);
    toggleClassByPredicate(
        widthErrorType,
        document.getElementById('width_type'),
        'hidden',
    );
    const heightErrorType = isNaN(height);
    toggleClassByPredicate(
        heightErrorType,
        document.getElementById('height_type'),
        'hidden',
    );
    if (widthError || widthErrorType){
        widthBorder.classList.add("inner__active");
    }
    else {
        widthBorder.classList.remove("inner__active");
    };
    if (heightError || heightErrorType){
        heightBorder.classList.add("inner__active");
    }
    else {
        heightBorder.classList.remove("inner__active");
    };
  

    if (!(widthError || heightError || widthErrorType || heightErrorType)) {

        var p = "";
        if (data.get('grayscale') && data.get('blur')) {
            p = "grayscale&blur&";
        }
        else if  (data.get('grayscale')) {
            p = "grayscale&"
        }
        else if (data.get('blur')) {
            p="blur&";
        }
        
        const oldImage = document.querySelector('#img');
        if (oldImage) {
            oldImage.parentElement.removeChild(oldImage);
        }

        const imgElement = document.createElement('img');
        imgElement.id = "img";
        imgElement.src = `https://unsplash.it/${width}/${height}?${p}random=${Math.random()}`;
        imgElement.className = "active";
        document.querySelector('.inner').appendChild(imgElement)
        
        event.target.reset();
    }
   
}

const form = document.getElementById('form')
form.addEventListener('submit', showPicture)
