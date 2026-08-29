# 🏷️ Desafio EC Canvas Web — Etiqueta Certa

Projeto desenvolvido como teste técnico, cujo desafio proposto foi construir uma aplicação com um canvas interativo que permitisse arrastar e soltar objetos para editar layouts de etiquetas, utilizando React e TypeScript. A aplicação resultante, **Etiqueta Certa**, é um editor visual simples onde o usuário monta páginas de etiquetas adicionando, reposicionando, redimensionando e removendo itens de conteúdo com o mouse.

## ✨ Funcionalidades

- Criação e remoção de páginas de etiquetas dentro do canvas;
- Adição de novos itens de conteúdo (texto + imagem) em cada página;
- Arrastar e soltar (drag and drop) itens tanto dentro de uma mesma página quanto entre páginas diferentes, usando `react-dnd`;
- Redimensionamento livre de cada item com `react-rnd`;
- Edição inline do texto de cada item (clique para editar, com salvamento ao perder o foco);
- Remoção individual de itens de uma página;
- Controles de zoom in/zoom out para visualizar o canvas em diferentes escalas;
- Navbar e footer simples para compor o layout da aplicação.

## 🚀 Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| [React](https://reactjs.org) | Biblioteca principal da interface |
| [TypeScript](https://www.typescriptlang.org) | Tipagem estática dos componentes e dados |
| [Create React App](https://create-react-app.dev) | Bootstrap e scripts de build/dev |
| [react-dnd](https://react-dnd.github.io/react-dnd/) + `react-dnd-html5-backend` | Funcionalidade de arrastar e soltar (drag and drop) |
| [react-rnd](https://github.com/bokuweb/react-rnd) | Redimensionamento e posicionamento livre dos itens no canvas |

## 🗄️ Estrutura de pastas

O código da aplicação fica dentro da pasta `etiqueta-certa/`:

```
etiqueta-certa/
├── public/
└── src/
    ├── assets/images/       # Imagens usadas nos itens do canvas
    ├── components/
    │   ├── Canvas.tsx        # Gerencia as páginas e o zoom do canvas
    │   ├── Page.tsx           # Representa uma página, aceita drop de itens
    │   ├── ContentItem.tsx    # Item arrastável/redimensionável com texto e imagem
    │   ├── Navbar.tsx
    │   └── Footer.tsx
    ├── styles/                # CSS de cada componente
    └── utils/types.ts         # Interfaces de Page, ContentItem e Canvas
```

## 🔧 Pré-requisitos

- [Node.js](https://nodejs.org) instalado (recomendado LTS)
- npm (instalado junto com o Node.js)

## ▶️ Como executar o projeto

```bash
# Acesse a pasta da aplicação
cd etiqueta-certa

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação ficará disponível em [http://localhost:3000](http://localhost:3000).

Outros scripts disponíveis dentro de `etiqueta-certa/`:

```bash
npm test    # executa os testes em modo watch
npm run build   # gera o build de produção na pasta build/
```
