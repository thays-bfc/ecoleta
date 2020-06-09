function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((res) => { return res.json() })
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        });
}
populateUFs();

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    //Estado selecionado  (posição vetor)
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
    citySelect.disabled = true;
    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {

            for (const city of cities)
                citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome}</option>`
            citySelect.disabled = false;
        }
        );
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities);

//Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}

let selectedItems = [];
const collectedItems = document.querySelector("input[name=items]");

function handleSelectedItem(event) {
    //Adicionar ou remover uma classe com js
    const itemLi = event.target;
    itemLi.classList.toggle("selected");//Remove ou inclui

    const itemId = itemLi.dataset.id;

    //verifica se existe
    const alreadySelected = selectedItems.findIndex(item => item == itemId);

    //Retirar ao selecionar novamete
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => item != itemId)
        selectedItems = filteredItems;
    } else {     //Adicionar aqueles que não estão
        selectedItems.push(itemId);
    }


    //Atualizar campo escondido com os itens selecionados
    collectedItems.value = selectedItems;

}
