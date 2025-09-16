// Uma lista de palavras comuns que serão ignoradas
const stopwords = new Set([
    'a', 'o', 'e', 'é', 'de', 'do', 'da', 'os', 'as', 'com', 'para', 'em',
    'por', 'um', 'uma', 'uns', 'umas', 'no', 'na', 'nos', 'nas', 'se', 'mas',
    'que', 'qual', 'quando', 'onde', 'como', 'quem', 'me', 'minha', 'meu', 'te',
    'sua', 'seu', 'suas', 'seus', 'nós', 'nossos', 'nossas', 'você', 'vocês',
    'ele', 'ela', 'eles', 'elas', 'isso', 'esse', 'essa', 'este', 'esta',
    'daí', 'aí', 'então', 'ou', 'até', 'já', 'ao', 'aos', 'à', 'às'
]);

// A função que fará todo o processamento do texto
function extrairPalavrasChave(texto) {
    // 1. Converte o texto para minúsculas e remove a pontuação
    const palavras = texto.toLowerCase()
        .replace(/[.,?!;():"“”-]/g, '')
        .split(/\s+/); // 2. Divide o texto em um array de palavras

    // 3. Conta a frequência de cada palavra usando um Map
    const contagemDePalavras = new Map();
    palavras.forEach(palavra => {
        // 4. Filtra palavras com menos de 3 letras e as palavras ignoradas
        if (palavra.length > 2 && !stopwords.has(palavra)) {
            const contagemAtual = contagemDePalavras.get(palavra) || 0;
            contagemDePalavras.set(palavra, contagemAtual + 1);
        }
    });

    // 5. Converte o Map para um array para poder ordenar
    const palavrasOrdenadas = Array.from(contagemDePalavras.entries());

    // 6. Ordena as palavras pela contagem, da mais frequente para a menos
    palavrasOrdenadas.sort((a, b) => b[1] - a[1]);

    // 7. Retorna as 10 palavras mais relevantes
    return palavrasOrdenadas.slice(0, 10);
}

// Obtém os elementos do HTML para que o JavaScript possa interagir com eles
const textoInput = document.getElementById('textoInput');
const extrairBtn = document.getElementById('extrairBtn');
const resultadosDiv = document.getElementById('resultados');

// Adiciona um "ouvinte" ao botão para saber quando ele é clicado
extrairBtn.addEventListener('click', () => {
    const texto = textoInput.value;

    // Se a caixa de texto estiver vazia, exibe uma mensagem
    if (texto.trim() === '') {
        resultadosDiv.innerHTML = '<h3>Por favor, cole um texto para extrair as palavras-chave.</h3>';
        return;
    }

    // Chama a função de extração e armazena o resultado
    const palavrasChave = extrairPalavrasChave(texto);

    // Exibe as palavras-chave na página
    if (palavrasChave.length > 0) {
        resultadosDiv.innerHTML = '<h3>Palavras-chave:</h3>';
        palavrasChave.forEach(item => {
            const palavra = item[0];
            const contagem = item[1];
            // Cria um novo parágrafo para cada palavra-chave
            const p = document.createElement('p');
            p.innerHTML = `<strong>${palavra}</strong> (${contagem})`;
            resultadosDiv.appendChild(p);
        });
    } else {
        resultadosDiv.innerHTML = '<h3>Nenhuma palavra-chave relevante encontrada.</h3>';
    }
});
