// 1. Precisamos pegar os elementos do nosso HTML.
// O getElementById busca o elemento pelo seu "nome" (o ID).
const textoInput = document.getElementById('textoInput');
const extrairBtn = document.getElementById('extrairBtn');
const resultadosDiv = document.getElementById('resultados');

// 2. Agora, vamos "escutar" o clique do botão.
// Quando o botão for clicado, a função que está dentro será executada.
extrairBtn.addEventListener('click', () => {
    // 3. Pegar o texto da caixa de texto.
    const texto = textoInput.value;

    // 4. Se não houver texto, não fazemos nada.
    if (texto.trim() === '') {
        resultadosDiv.innerHTML = '<p>Por favor, cole um texto para extrair as palavras-chave.</p>';
        return;
    }
    
    // 5. Onde a mágica vai acontecer: a lógica de extração!
    // TODO: Adicionar o código de processamento aqui.

    // 6. Por enquanto, só para testar, vamos exibir uma mensagem.
    resultadosDiv.innerHTML = '<p>Texto recebido! Agora vamos processar as palavras...</p>';
});
