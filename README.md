# UOL Redações Vue
O banco de redações da UOL (http://educacao.uol.com.br/bancoderedacoes/) é atualizado mensalmente com 20 redações.
Estas redações são avaliadas por um especialista conforme os critérios do ENEM e visam auxiliar estudantes a melhorar sua escrita.

Este pequeno projeto é uma extensão de [uol-redacoes-xml](https://github.com/gpassero/uol-redacoes-xml/), um web crawler
criado para extrair o banco de redações da UOL (HTML) em um arquivo estruturado (XML).

Neste repositório está em construção um aplicativo web criado com [Vue](https://github.com/vuejs/vue) com uma interface
amigável de consulta às redações da UOL com as seguintes funcionalidades:
* Pesquisa de redações pelo título, conteúdo, notas, comentários e enunciado.
* Pesquisa de propostas temáticas pelo título, descrição, textos motivadores.
* Análise de colocações verbais e nominais.
* Aplicação de ferramentas de processamento de linguagem natural e análise semântica para detecção de trechos de redações com fuga ao tema (subproduto da minha pesquisa de mestrado).

A interface criada poderá ser reutilizada para consulta a qualquer corpus de redações, desde que esteja estruturado
em um arquivo JSON (formato a definir).

# Termos de uso
Copyright UOL. Todos os direitos reservados. É permitida a reprodução apenas em trabalhos escolares, sem fins comerciais e desde que com o devido crédito ao UOL e aos autores.