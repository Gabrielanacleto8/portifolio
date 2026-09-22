# Imagens dos projetos

Coloque aqui as capturas de tela dos seus projetos.

1. Salve o arquivo nesta pasta, por exemplo `crud-1.png`.
2. Abra `data.js`, encontre o projeto e preencha a lista `imagens`:

```js
{
  id: 'crud',
  titulo: 'CRUD Full-Stack',
  // ...
  imagens: [
    'assets/projetos/crud-1.png',
    'assets/projetos/crud-2.png',
  ],
}
```

A primeira imagem vira a capa do card. As demais aparecem como miniaturas
quando o projeto é aberto.

Dicas:
- Formato PNG ou JPG; proporção próxima de 16:10 fica melhor no card.
- Largura recomendada entre 1200px e 1600px.
- Enquanto a lista estiver vazia, o card mostra um espaço reservado — nada quebra.
- Se o caminho estiver errado, o site volta sozinho para o espaço reservado
  em vez de exibir uma imagem quebrada.
