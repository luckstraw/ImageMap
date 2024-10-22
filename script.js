function showHoverImage(imageSrc) {
    const hoverImage = document.getElementById('hover-image');
    hoverImage.src = imageSrc; 
    hoverImage.style.display = 'block';  
}

function hideHoverImage() {
    const hoverImage = document.getElementById('hover-image');
    hoverImage.style.display = 'none'; 
}

function moveHoverImage(event) {
    const hoverImage = document.getElementById('hover-image');
    const offset = 20;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newTop = event.pageY + offset;
    let newLeft = event.pageX + offset;

    if (newLeft + hoverImage.clientWidth > viewportWidth) {
        newLeft = viewportWidth - hoverImage.clientWidth - offset;
    }

    if (newTop + hoverImage.clientHeight > viewportHeight) {
        newTop = viewportHeight - hoverImage.clientHeight - offset;
    }

    hoverImage.style.top = newTop + 'px';  
    hoverImage.style.left = newLeft + 'px';  
}

window.addEventListener('load', adjustMap);
window.addEventListener('resize', adjustMap);

function adjustMap() {
    const img = document.getElementById('map-image');
    const map = document.querySelector('map');
    const areas = map.getElementsByTagName('area');

    const originalWidth = img.naturalWidth;
    const originalHeight = img.naturalHeight;

    const currentWidth = img.clientWidth;
    const currentHeight = img.clientHeight;

    for (let area of areas) {
        const coords = area.dataset.coords.split(',').map(Number);
        const newCoords = coords.map((coord, index) => {
            return index % 2 === 0
                ? Math.round(coord * (currentWidth / originalWidth))
                : Math.round(coord * (currentHeight / originalHeight));
        });
        area.coords = newCoords.join(',');
    }
}


