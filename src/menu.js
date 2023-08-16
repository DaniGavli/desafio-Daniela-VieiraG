//metodos extra e menu
class menu {
    constructor() {
        this.items = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };

        this.extras = {
            chantily: "cafe",
            queijo: "sanduiche"
        };
    }
//busca o valor do pedido no menu, atraves do parametro codigo, se encontrar retorna o preco ou retorna nulo
    getPedido(codigo) {
        return this.items[codigo] || null;
    }
//verifica se o item é extra, retorna um boolean (!!)
    isExtra(codigo) {
        return !!this.extras[codigo];
    }
//verifica se o item extra esta compativel com o item principal e retorna o cod do item principal associado ao item extra
    getPrincipalForExtra(codigo) {
        return this.extras[codigo];
    }
} export { menu };
