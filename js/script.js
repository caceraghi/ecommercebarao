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

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(nomeProduto, preco, produtoId) {
    const produtoExistente = carrinho.find(item => item.nome === nomeProduto);
    const estoqueAtual = estoqueProdutos[produtoId];

    if (estoqueAtual > 0) {
        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinho.push({ nome: nomeProduto, preco: preco, quantidade: 1 });
        }

        estoqueProdutos[produtoId]--;
        atualizarEstoque(produtoId);
        total += preco;
        salvarCarrinho();
        alert('Produto adicionado ao carrinho!');
    } else {
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

//Função para atualizar o carrinho na tela carrinho.html
function atualizarCarrinho {
    const listaCarrrinho = document.getElementById('listaCarrinho');
    const totalElemento = documento.getElementById('total');

    if (listaCarrrinho && totalElemento) {
        listaCarrrinho.innerHTML = '';
        carrinho.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
            <button onclick="removerDoCarrinho('${item.nome}')">Remover Um</button>
            <input type="number" min="1" value="${item.quantidade}" onchange="ajustarQuantidade('${item.nome}', this.value)">
            `;
            listaCarrrinho.appendChild(li);
        });
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

//Função para atualizar a quantidade de itens do carrinho
function atualizarQuantidadeCarrinho {
    const quantidadeCarrinhoElemento = document.getElementById('quantidadeCArrinho');
    const quatidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    if (quantidadeCarrinhoElemento) {
        quantidadeCarrinhoElemento.textContent = quatidadeTotal;
    }
}

