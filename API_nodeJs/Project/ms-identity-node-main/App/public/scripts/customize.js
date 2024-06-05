function changeColor(id){
    const root = document.querySelector(':root');

    if(id == 1){
        root.style.setProperty('--foreground-color', '#eee');
        root.style.setProperty('--background-color', '#223');
        root.style.setProperty('--highlight-color', '#493b81');
    }
    else if(id == 2){
        root.style.setProperty('--foreground-color', '#223');
        root.style.setProperty('--background-color', '#eee');
        root.style.setProperty('--highlight-color', '#493b81');
    }
    else if(id == 3){
        root.style.setProperty('--foreground-color', '#eee');
        root.style.setProperty('--background-color', '#223');
        root.style.setProperty('--highlight-color', '#493b81');
    }
    else if(id == 4){
        root.style.setProperty('--foreground-color', '#eee');
        root.style.setProperty('--background-color', '#223');
        root.style.setProperty('--highlight-color', '#493b81');
    }
    else if(id == 5){
        root.style.setProperty('--foreground-color', '#eee');
        root.style.setProperty('--background-color', '#223');
        root.style.setProperty('--highlight-color', '#493b81');
    }
}

function changeFontsize(size){
    const root = document.querySelector(':root');

    if(size == 's'){
        root.style.setProperty('--medium-text-size', '16px');
        root.style.setProperty('--small-text-size', '12px');
    }
    else if(size == 'm'){
        root.style.setProperty('--medium-text-size', '20px');
        root.style.setProperty('--small-text-size', '16px');
    }
    else if(size == 'l'){
        root.style.setProperty('--medium-text-size', '24px');
        root.style.setProperty('--small-text-size', '20px');
    }
}