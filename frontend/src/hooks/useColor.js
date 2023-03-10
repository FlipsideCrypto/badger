const getAverageColor = (img) => {
    const max = 10; // Max size (Higher num = better precision but slower)
    const { naturalWidth: iw, naturalHeight: ih } = img;
    const ctx = document.createElement`canvas`.getContext`2d`;
    const sr = Math.min(max / iw, max / ih); // Scale ratio
    const w = Math.ceil(iw * sr); // Width
    const h = Math.ceil(ih * sr); // Height
    const a = w * h;              // Area

    img.crossOrigin = 1;
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    const data = ctx.getImageData(0, 0, w, h).data;
    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
    }

    r = ~~(r / a);
    g = ~~(g / a);
    b = ~~(b / a);

    return { r, g, b };
};

const handleImageLoad = (el) => {
    // get the image from the event
    const average = getAverageColor(el);

    // Get an item up in the dom tree
    const parent = el.parentNode.parentNode.parentNode.parentNode;
    const image = parent.querySelector('.home__card__image');

    if (el.offsetWidth === 0) return;

    // Set the background color of the parent
    image.style.backgroundColor = `rgb(${average.r}, ${average.g}, ${average.b})`;

    // Determine if we should use black or white text
    const brightness = Math.round(((parseInt(average.r) * 299) +
        (parseInt(average.g) * 587) +
        (parseInt(average.b) * 114)) / 1000);

    const card = image.parentNode;

    if (brightness > 125) card.style.color = "black";
    else card.style.color = "white";
}

export {
    handleImageLoad
}
