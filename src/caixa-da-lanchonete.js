import { menu } from "./menu.js";

class CaixaDaLanchonete {
    constructor() {
        this.menu = new menu();
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let cont = 0;

    //Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!".
        if (itens.length === 0){
             return "Não há itens no carrinho de compra!";
            }
    //Se a forma de pagamento não existir, apresentar mensagem "Forma de pagamento inválida!"
    // O metodo include verifica se a forma de pagamento existe no array
        if (!['debito', 'credito', 'dinheiro'].includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
    
    //Busca no pedido e separa os produtos por virgula
        for (let item of itens) {
            const [codigo, quantidade] = item.split(',');
    //Verifica se o item adicionado pertence ao cardapio
            if (!this.menu.getPedido(codigo)){
             return "Item inválido!";
            }
    //verifica se a quantidade de itens é > 0, o metodo Number converte a quantidade
            if (Number(quantidade) <= 0){
                 return "Quantidade inválida!";
            }
    // verifica se o cod indica um pedido extra , e se no array do menu algum dos itens comeca com o nome de um item de pedido especial (funcao some)
            if (this.menu.isExtra(codigo) && !itens.some(i => i.startsWith(this.menu.getPrincipalForExtra(codigo)))) {
                return "Item extra não pode ser pedido sem o principal";
            }
    //calcula o valor total do pedido
            cont = cont + this.menu.getPedido(codigo) * Number(quantidade);
        }
    //verifica a forma de pgto e aplica o desconto e o acrescimo
        if (metodoDePagamento === 'dinheiro') {
            cont = cont - (cont * 5)/100;
        } else if (metodoDePagamento === 'credito') {
            cont = cont + (cont * 3)/100;
        }
    //retorna o valor final do pedido com 2 pontos flutuantes
        return `R$ ${cont.toFixed(2).replace('.', ',')}`;
    }
} export { CaixaDaLanchonete };

   
//instancia uma nova caixa da lanchonete, e chama o metodo de calcularValorDaCompra
var caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('dinheiro', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"

console.log(caixa.calcularValorDaCompra('debito', ['chantily,1', 'combo1,1'])); // "Combos não são considerados como item principal."

console.log(caixa.calcularValorDaCompra('dinheiro', ['cafe,1', 'chantily,1'])); // "R$ 4,28"

console.log(caixa.calcularValorDaCompra('credito', ['combo1,1', 'cafe,2'])); // "R$ 15,96"

console.log(caixa.calcularValorDaCompra('dinheiro', ['combo1,1', 'cafe,2'])); // "R$ 14.7"

console.log(caixa.calcularValorDaCompra('debito', ['cafe,1', 'chantily,1'])); // 4,40

console.log(caixa.calcularValorDaCompra('debito', ['chantily,1', 'cafe,1'])); // 4,50

console.log(caixa.calcularValorDaCompra('debito', [])); // "Se não forem pedidos itens, apresentar mensagem: Não há itens no carrinho de compra!"

console.log(caixa.calcularValorDaCompra('debito', ['chantily,0', 'cafe,1'])); // " Se a quantidade de itens for zero, apresentar mensagem "Quantidade inválida!"."

console.log(caixa.calcularValorDaCompra('debito', ['pao,1'])); // " Se o código do item não existir, apresentar mensagem "Item inválido!""

console.log(caixa.calcularValorDaCompra('pix', ['cafe,2']));  //"Se a forma de pagamento não existir, apresentar mensagem:Forma de pagamento inválida!"

console.log(caixa.calcularValorDaCompra('pix', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal + forma de pgto invalida"


