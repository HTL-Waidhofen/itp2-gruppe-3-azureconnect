function changeColor(id){
    const root = document.querySelector(':root');

    if(id == 1){
        root.style.setProperty('--foreground-color', '#eee');
        root.style.setProperty('--background-color', '#223');
        root.style.setProperty('--highlight-color', '#493b81');
    }
    else if(id == 2){
        root.style.setProperty('--foreground-color', '#F7F1ED');
        root.style.setProperty('--background-color', '#3D5A5B');
        root.style.setProperty('--highlight-color', '#CC8B65');
    }
    
    else if(id == 3){
        root.style.setProperty('--foreground-color', '#F2EBE5');
        root.style.setProperty('--background-color', '#9F496E');
        root.style.setProperty('--highlight-color', '#9CAECE');
    }
    
    else if(id == 4){
        root.style.setProperty('--foreground-color', '#F8EFEA');
        root.style.setProperty('--background-color', '#E0475B');
        root.style.setProperty('--highlight-color', '#333333');
    }
    else if(id == 5){
        root.style.setProperty('--foreground-color', '#FCD752');
        root.style.setProperty('--background-color', '#6184C6');
        root.style.setProperty('--highlight-color', '#FCA2B9');
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