# Fotos

Suas fotos em eventos, estudos, certificações, bastidores — o que quiser
mostrar no app **Fotos** do portfólio.

## Como adicionar

1. Salve a imagem nesta pasta, por exemplo `meetup-js.jpg`.
2. Abra `data.js`, encontre a lista `fotos` e acrescente uma entrada:

```js
export const fotos = [
  {
    arquivo: 'assets/fotos/meetup-js.jpg',
    titulo: 'Meetup de JavaScript',
    descricao: 'Primeiro meetup presencial, falando sobre APIs REST.',
    categoria: 'Eventos',
    data: 'Março de 2026',
  },
];
```

Só `arquivo` e `titulo` são obrigatórios. `descricao`, `categoria` e `data`
são opcionais e aparecem quando a foto é aberta.

## Categorias

A barra lateral se monta sozinha a partir do campo `categoria` — não há lista
para manter em outro lugar. Se você usar `'Eventos'`, `'Estudos'` e
`'Certificações'`, essas três aparecem lá.

## Dicas

- Formato JPG para fotos, PNG para telas e certificados.
- Largura entre 1200px e 1800px já é suficiente; acima disso só pesa a página.
- As miniaturas são quadradas e cortam pelo centro, então evite deixar o
  assunto muito na borda.
- Se o caminho estiver errado, a miniatura mostra o nome do arquivo que faltou
  em vez de uma imagem quebrada.
- Enquanto a lista estiver vazia, o app explica o que fazer — nada quebra.
