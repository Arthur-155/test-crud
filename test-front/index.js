const frm = document.querySelector("form");
const tbody = document.querySelector("#listaUsuarios");

frm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = frm.nome.value;
    const tipoMarmita = frm.tipoMarmita.value;
    const qtdMarmitas = Number(frm.qtdMarmitas.value);
    const semGluten = frm.semGluten.checked;
    const semLactose = frm.semLactose.checked;
    const cliente = document.querySelector(".cliente");
    const tipo = document.querySelector(".tipo");
    const quantidade = document.querySelector(".quantidade");
    const restricoes = document.querySelector(".restricoes");
    const valorTotal = document.querySelector(".valorTotal");
    const acoes = document.querySelector(".acoes");

    console.log(nome);
    console.log(tipoMarmita);
    console.log(qtdMarmitas);
    console.log(semGluten);
    console.log(semLactose);
    cliente.textContent = `Cliente`
    tipo.textContent = `Tipo`;
    quantidade.textContent = `Qtde`
    restricoes.textContent = `Restrições`;
    valorTotal.textContent = `Valor Total`;
    acoes.textContent = `Ações`;

    const tipoRestricao = [];
    if (semGluten) tipoRestricao.push("Sem Glúten");
    if (semLactose) tipoRestricao.push("Sem Lactose");

    const precoUnitario = 25;
    const valor = precoUnitario*qtdMarmitas;

    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
    <td>${nome}</td> <td>${tipoMarmita}</td>  <td>${qtdMarmitas}</td>  <td>${tipoRestricao}</td> 
    <td> ${valor}  <td class= "btns"><button class="editar">Editar</button> <button class="remover">Remover</button> </td>`;

    tbody.appendChild(novaLinha);

    frm.reset();
    frm.nome.focus();

})