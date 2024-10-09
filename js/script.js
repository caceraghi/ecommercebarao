let carrinho =JSON.parse(localStorage.getItem('carrinho')) || [];
let total = carrinho.reduce((acc, item) = acc + item.preco * item.quantidade, 0);

//Estoque de Produtos
const estoqueProdutos = {
    1: 5,
    2: 3,
    3: 10,
    4: 15
};

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarQuantidadeCarrinho();
}

function adicionarAoCarrinho(nomeProduto, preco, produtoId) {
    const produtoExistente = carrinho.find(item = item.nome === nomeProduto);
    const estoqueAtual = estoqueProdutos[produtoId];

    if (estoqueAtual > 0){
        if (produtoExistente) {
            produtoExistente.quantidade++;
        }else {
            carrinho.push({nome: nomeProduto, preco: preco, quantidade: 1});
        }
        estoqueProdutos[produtoId]--;
        atualizarEstoque(produtoId);
        total += preco;
        salvarCarrinho();
        alert('Produto adicionado ao Carrinho!');
    }else {
        alert('Produto esgotado!');
    }
}

function atualizarEstoque(produtoId) {
    const estoqueElemento = document.getElementById('estoque-produto-${produtoId}');
    const botaoElemento = document.getElementById('btn-produto-${produtoId}');

    estoqueElemento.textContent = 'Estoque: ${estoqueProdutos[produtoId]}';
    if (estoqueProdutos[produtoId] === 0) {
        botaoElemento.disable = true;
        botaoElemento.textContent = "Esgotado";
    }
}
