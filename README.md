# Projeto PHP(Laravel) com Jquery

Esse projeto foi desenvolvido em laravels e jquery com requisições ajax.

## Sobre o projeto

Para testar esse projeto, é preciso rodar o servidor (Laragon ou xampp) e verificar se a rota das requisicoes do ajax estão iguais da sua máquina. Na minha máquina que testei a rota é : http://localhost/Santri_test/api_santri/public/api

A autenticação foi feita de um jeito bem simples (E não seguro). O certo seria ter feito autenticação com santum ou passport, fazendo o migrate das tabelas para poder salvar os tokens, etc. Também deveria ser feito o middleware nas rotas, para poder acessar só quando estiver com token (Authorization).

