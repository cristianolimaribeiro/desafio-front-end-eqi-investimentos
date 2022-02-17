
# Desafio EQI-Investimentos - Front-End Jr.

O repositório foi criado para comportar o desafio sugerido pela EQI-Investimentos com a finalidade de avaliar a capacidade de seguir os requisitos exigidos e utilização de ferramentas de consumo de API criada pela EQI para fins de consumo para o teste. 


## Instalação
### Os requisitos para rodar aplicação são Node.js e npm

Primeiramente deve-se fazer um clone do repositório via SSH, HTTPS ou ZIP.

Após download do repositório e uma vez dentro pasta do pasta do projeto devemos rodar o comando para Instalação das dependências do projeto.

```bash
  npm install 
```
Após instalar as dependências, devemos entrar na pasta api e rodar o comando para iniciar o servidor da api que rodará através do endereço http://localhost:3000

```bash
  cd api
  npx json-server db.json
```

Devemos também rodar na raiz do projeto comando para iniciar o servidor http para rodar o projeto em conjunto com as requisições a api que rodará através de alguns endereços como :

  http://XXX.XXX.XXX.XXX:8080 (ip da sua máquina)
  
  http://127.0.0.1:8080 (localhost)

```bash
  cd ..
  http-server
```
## Stack utilizada

**Front-end:** html, css, javascript e jquery

**Back-end:** os servidores json e http (json-server e http-server)




## Plugins Utilizados 

 - [jQuery Mask Money](https://github.com/plentz/jquery-maskmoney)
 - [jQuery Mask Plugin](https://igorescobar.github.io/jQuery-Mask-Plugin/)
 - [Chart.js](https://www.chartjs.org/)

O jQuery Mask Money e o jQuery Mask Plugin foram utilizados com a finalidade de já fazer a validação dos campos permitindo que seja inserido apenas o que o campo permitir.

O Chart.js foi utilizado para montar o gráfico com as informações provenientes da Api
## Demonstração

![demo-image](https://i.imgur.com/5rdPS7j.png)

Os campos IPCA e CDI já iniciam preenchidos no carregamento da página com os dados serão fornecidos pela API Fake.

![demo-image](https://imgur.com/nFiyBzS.png)

Tela inicial com os dados Preenchidos. Com a validação através das máscaras de input só aceitam o formato definido para cada um e o botão simular só libera com todos os campos preenchidos.

![demo-image](https://imgur.com/LdG1jsT.png)

### Exibição dos Dados Preenchidos

Após clicar no botão "Simular" será chamada a API Fake por GET e retornará os dados para a tela. Independente do valor que o usuário colocar, o retorno será o mesmo, só será diferenciado o tipo de indexação e tipo de rendimento (os dois campos iniciais do formulário).


## Responsividade

![demo-image](https://imgur.com/mWqlGEN.png)

![demo-image](https://imgur.com/syTKbTn.png)