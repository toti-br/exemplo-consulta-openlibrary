let form = document.querySelector("#form")
let resultadosArea = document.querySelector("#resultados")

form.addEventListener("submit", function (ev) {
    ev.preventDefault()
    let form = ev.target
    let dados = new FormData(form)
    let termoDePesquisa = dados.get("termos")

    resultadosArea.innerHTML = ""
    buscarLivros(termoDePesquisa)
})


function buscarLivros(termo) {
    const API = "http://openlibrary.org/search.json?q="
    let termoEncoded = encodeURIComponent(termo)

    fetch(API + termoEncoded)
    .then(function (resp) {
        if (resp.ok) {
            return resp.json()
        } else {
            alert("Pesquise novamente, ocorreu um erro!")
        }
    })
    .then(function (resultado) {
        exibirNumeroDeResultados(resultado.num_found)
        resultado.docs.forEach(function (res) {
            //console.log(res)
            adicionarResultado(res.title)
        })
    })
}


function adicionarResultado(texto) {
    let container = document.createElement('div')
    container.textContent = texto
    container.classList.add("resultado")
    resultadosArea.append(container)
}

function exibirNumeroDeResultados(numero) {
    let numResultados = document.createElement("div")
    let badge = document.createElement("span")
    badge.classList.add("badge")
    badge.textContent = numero

    numResultados.append(badge)
    resultadosArea.append(numResultados)
}