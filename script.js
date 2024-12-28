let cartCount = 0; // Inicializa o contador de itens no carrinho
let cartItems = []; // Armazena os itens do carrinho
let totalPrice = 0; // Armazena o valor total do carrinho

// Função para adicionar produto ao carrinho
function adicionarProdutoCarrinho(nome, preco) {
    cartCount++; // Incrementa o contador
    cartItems.push({ nome, preco }); // Adiciona o produto ao carrinho
    totalPrice += preco; // Atualiza o total

    // Atualiza o contador no link
    document.getElementById('cart-count').textContent = cartCount;

    // Função para atualizar o modal com os itens do carrinho
    atualizarModal();
}

// Função para atualizar o modal com os itens do carrinho
function atualizarModal() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Limpa o conteúdo atual

    // Adiciona os itens do carrinho ao modal
    cartItems.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        cartDetails.appendChild(itemElement);
    });

    // Atualiza o total no modal
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Função para abrir o modal
function abrirModal() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

// Função para abrir o modal de entrega
function abrirModalEntrega() {
    document.getElementById('modal').style.display = 'none'; // Fecha o modal de carrinho
    document.getElementById('delivery-modal').style.display = 'block'; // Abre o modal de entrega
    document.getElementById('modal-overlay').style.display = 'block'; // Exibe o overlay
}

// Função para mostrar o campo de troco quando o pagamento for em dinheiro
function mostrarTroco() {
    const paymentMethod = document.getElementById('payment-method').value;
    const changeContainer = document.getElementById('change-container');

    if (paymentMethod === 'cash') {
        changeContainer.style.display = 'block'; // Exibe o campo de troco
    } else {
        changeContainer.style.display = 'none'; // Oculta o campo de troco
    }
}

// Função para fechar o modal de entrega
function fecharModalEntrega() {
    document.getElementById('delivery-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

// Função para finalizar o pedido e enviar para o WhatsApp
function finalizarPedido() {
    // Coleta as informações do pedido
    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value;
    const rua = document.getElementById('street').value;
    const numero = document.getElementById('number').value;
    const bairro = document.getElementById('neighborhood').value;
    const pagamento = document.getElementById('payment-method').value;
    const troco = pagamento === 'cash' ? document.getElementById('change').value : 'Não aplicável';

    // Formata a mensagem
    let mensagem = `*Pedido de Hamburguer*%0A`;
    mensagem += `*Nome:* ${nome}%0A`;
    mensagem += `*Telefone:* ${telefone}%0A`;
    mensagem += `*Endereço:* ${rua}, ${numero}, ${bairro}%0A`;
    mensagem += `*Forma de Pagamento:* ${pagamento}%0A`;
    mensagem += `*Troco:* ${troco}%0A%0A`;
    mensagem += `*Itens do Pedido:*%0A`;
    
    cartItems.forEach(item => {
        mensagem += `${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;
    });

    mensagem += `%0A*Total:* R$ ${totalPrice.toFixed(2)}%0A`;

    // Codifica a mensagem para URL
    mensagem = encodeURIComponent(mensagem);

    // Cria o link do WhatsApp
    const numeroWhatsApp = '5522981048500'; // Substitua pelo número do seu WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    // Redireciona para o WhatsApp
    window.open(linkWhatsApp, '_blank');
}

// Adiciona os eventos de clique
document.getElementById('open-cart-btn').addEventListener('click', abrirModal); // Abre o modal
document.getElementById('close-modal').addEventListener('click', fecharModal); // Fecha o modal
document.getElementById('modal-overlay').addEventListener('click', fecharModal); // Fecha o modal ao clicar no overlay
document.getElementById('next-modal').addEventListener('click', abrirModalEntrega); // Abre o modal de entrega
document.getElementById('close-delivery-modal').addEventListener('click', fecharModalEntrega); // Fecha o modal de entrega
document.getElementById('submit-order').addEventListener('click', finalizarPedido); // Finaliza o pedido e envia para o WhatsApp
