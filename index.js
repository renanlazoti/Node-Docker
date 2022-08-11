const express = require('express');
const mysql2 = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: '6520',
    user: 'root',
    password: '123@senac',
    database: 'bancoloja'
});

conexao.connect((erro)=>{
    if(erro){
        return console.error(`Bão conectou -> ${erro}`);
    }
    console.log(`Banco de dados online: ${conexao.threadId}`);

});

app.get('/usuarios/listar',(req,res)=>{
    conexao.query("select * from usuarios",(erro, dados)=>{

        if(err)return res.status(500).send({output: `Erro - > ${erro}`})
        res.status(200).send({output:dados});

    });
});

app.listen("3000", () => console.log("Servidor do r's online"));