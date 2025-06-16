const frm = document.querySelector("form");
const tbody = document.querySelector("#listaUsuarios");
const cliente = document.querySelector(".cliente");
const tipo = document.querySelector(".tipo");
const quantidade = document.querySelector(".quantidade");
const restricoes = document.querySelector(".restricoes");
const valorTotal = document.querySelector(".valorTotal");
const acoes = document.querySelector(".acoes");

cliente.textContent = "Cliente";
tipo.textContent = "Tipo";
quantidade.textContent = "Qtde";
restricoes.textContent = "Restrições";
valorTotal.textContent = "Valor Total";
acoes.textContent = "Ações";

let editIndex = null;

function salvarPedidos(pedidos) {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}


function carregarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    tbody.innerHTML = ""; 

    pedidos.forEach((pedido, index) => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.tipoMarmita}</td>
            <td>${pedido.qtdMarmitas}</td>
            <td>${pedido.tipoRestricao.join(", ") || "Nenhuma"}</td>
            <td>${pedido.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
            <td class="btns">
                <button class="editar" data-index="${index}">Editar</button>
                <button class="remover" data-index="${index}">Remover</button>
            </td>
        `;
        tbody.appendChild(novaLinha);
    });
}


frm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = frm.nome.value;
    const tipoMarmita = frm.tipoMarmita.value;
    const qtdMarmitas = Number(frm.qtdMarmitas.value);
    const semGluten = frm.semGluten.checked;
    const semLactose = frm.semLactose.checked;

    const tipoRestricao = [];
    if (semGluten) tipoRestricao.push("Sem Glúten");
    if (semLactose) tipoRestricao.push("Sem Lactose");

    const precoUnitario = 25;
    let valor = precoUnitario * qtdMarmitas;

    if (tipoMarmita === "Vegetariana") {
        valor *= 0.90;
    }


    if (tipoRestricao.length > 0) {
        valor += 5 * qtdMarmitas;
    }

    const novoPedido = {
        nome,
        tipoMarmita,
        qtdMarmitas,
        tipoRestricao,
        valor
    };

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (editIndex !== null) {
        pedidos[editIndex] = novoPedido;
        editIndex = null;
    } else {
        pedidos.push(novoPedido);
    }

    salvarPedidos(pedidos);
    carregarPedidos();
    frm.reset();
    frm.nome.focus();
    alert("Pedido salvo com sucesso!");
});


tbody.addEventListener("click", (e) => {
    const btn = e.target;
    const index = Number(btn.dataset.index);
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (btn.classList.contains("remover")) {
        if (confirm("Deseja realmente remover este pedido?")) {
            pedidos.splice(index, 1);
            salvarPedidos(pedidos);
            carregarPedidos();
        }
    }

    if (btn.classList.contains("editar")) {
        const pedido = pedidos[index];
        frm.nome.value = pedido.nome;
        frm.tipoMarmita.value = pedido.tipoMarmita;
        frm.qtdMarmitas.value = pedido.qtdMarmitas;
        frm.semGluten.checked = pedido.tipoRestricao.includes("Sem Glúten");
        frm.semLactose.checked = pedido.tipoRestricao.includes("Sem Lactose");
        editIndex = index;
        frm.nome.focus();
    }
});


carregarPedidos();
