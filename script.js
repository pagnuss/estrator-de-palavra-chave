import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');

botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);

function mostraPalavrasChave() {
    const texto = document.querySelector('#entrada-de-texto').value;
    const campoResultado = document.querySelector('#resultado-palavrachave');
    
    // Processa o texto e obtém as palavras-chave
    const palavrasChave = processaTexto(texto);

    // Exibe as palavras-chave no campo de resultado
    campoResultado.textContent = palavrasChave.join(", ");
}

function processaTexto(texto) {
    // 1. Divide o texto em palavras, considerando caracteres especiais e acentuação
    let palavras = texto.split(/[^\p{L}]+/u);

    // 2. Remove as palavras vazias que podem surgir do split
    palavras = palavras.filter(palavra => palavra.length > 0);

    // 3. Converte todas as palavras para minúsculas para uniformizar
    const palavrasMinusculas = palavras.map(palavra => palavra.toLowerCase());

    // 4. Filtra as palavras removendo as "palavras ruins" e palavras curtas
    const palavrasBoas = palavrasMinusculas.filter(palavra => !PALAVRAS_RUINS.has(palavra) && palavra.length > 2);

    // 5. Conta a frequência de cada palavra de forma otimizada
    const frequencias = contaFrequencias(palavrasBoas);
    
    // 6. Ordena as palavras com base na frequência de forma decrescente
    const ordenadas = Object.keys(frequencias).sort((a, b) => frequencias[b] - frequencias[a]);

    // 7. Retorna apenas as 10 palavras mais frequentes
    return ordenadas.slice(0, 10);
}

function contaFrequencias(palavras) {
    const frequencias = {};
    for (const palavra of palavras) {
        frequencias[palavra] = (frequencias[palavra] || 0) + 1;
    }
    return frequencias;
}