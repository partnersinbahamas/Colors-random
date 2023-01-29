const container = document.querySelector('.container');

const items = container.querySelectorAll('.item');

document.addEventListener('keyup', (event) => {
    event.preventDefault();

    if (event.code === 'Space') {
        setRandomColor();
    }
});

document.addEventListener('click', (event) => {
    const type = event.target.dataset.type;

    if (type === 'lock') {
        event.preventDefault();

        const node = event.target.tagName.toLowerCase() ? event.target : event.target.children[0];

        node.classList.toggle('fa-lock-open');
        node.classList.toggle('fa-lock');

    } else if (type === 'copy') {
        copyOnClockBoard(event.target.textContent);

        event.target.title = 'copied'
    }
})

function randomСolor() {
    const hashIndexes = '0123456789ABCDEF'
    let color = '';

    for (let i = 0; i < 6; i++) {
        color += hashIndexes[Math.floor(Math.random() * hashIndexes.length)];
    }

    return '#' + color;

}

function setRandomColor() {

    items.forEach((item) => {
        const isLocked = item.querySelector('i').classList.contains('fa-lock');
        const color = randomСolor();
        const title = item.querySelector('h1');
        const button = item.querySelector('button');


        if (isLocked) {
            return;
        }

    
        item.style.backgroundColor = color;

        title.innerText = color;
        setTextColor(title, color, button);
    });
}

function copyOnClockBoard(text) {
    return navigator.clipboard.writeText(text);
}

function setTextColor(title, color, button) {
    const luminance = chroma(color).luminance();

    title.style.color = luminance > 0.5 ? 'black' : 'white';
    button.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColor();
