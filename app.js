const modal = document.getElementById("referenceModal");
const referenceImage = document.getElementById("referenceImage");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.querySelector(".close");

let selectedBlock = null; // Variable global para guardar el bloque seleccionado

onload = function () {
    // Selecciona aleatoriamente un bloque
    const blockIndex = Math.floor(Math.random() * 5) + 1; // Cambia 5 si tienes más bloques
    selectedBlock = pieces.find(b => b.block === blockIndex); // Guarda el bloque seleccionado

    if (!selectedBlock) {
        console.error("Block not found.");
        return;
    }

    // Selecciona el contenedor de las piezas
    let parent = document.getElementById("drag");

    // Limpia el contenedor de piezas
    parent.innerHTML = '';

    // Recorre las piezas del bloque seleccionado
    selectedBlock.pieces.forEach(piece => {
        const div = document.createElement("div");
        div.className = "h-[150px] w-[150px]";
        div.innerHTML = `
            <div draggable="true" ondragstart="drag(event)" id="pieza${piece.pieceID}" class="w-full h-full bg-dark bg-cover" style="background-image: url('${piece.pieceImg}');"></div>
        `;
        parent.appendChild(div);
    });
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    if (event.target.children.length === 0) {
        event.target.appendChild(draggedElement);
    }
}

function openModal() {
    if (selectedBlock) { // Utiliza el bloque seleccionado globalmente
        referenceImage.src = `${selectedBlock.referenceImg}`;
        modal.style.display = "block";
    } else {
        console.error("No block selected.");
    }
}

// Evento para cerrar el modal
closeModalBtn.onclick = function () {
    modal.style.display = "none";
};

// Cerrar modal si el usuario hace clic fuera de él
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Abre el modal con la referencia del bloque seleccionado al hacer clic en el botón
openModalBtn.onclick = function () {
    openModal(); // Abre el modal usando el bloque seleccionado
};
