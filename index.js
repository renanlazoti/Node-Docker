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

app.get('/usuario/listar',(req,res)=>{
    conexao.query("select * from usuario",(erro, dados)=>{

        if(err)return res.status(500).send({output: `Erro - > ${erro}`})
        res.status(200).send({output:dados});

    });
});

app.post("/usuario/listar",(req,res)=>{

    if(req.body.nomeusuario == "" ||
       req.body.senha == "" ||
       req.body.email == "" ||
       req.body.nomecompleto == "" ||
       req.body.cpf == "" ||
       req.body.foto == ""
    ){
        return res.status(400).send ({ output: `Você deve preencher todos os campos` });
    }
    
    conexao.query("insert into usuario set ?0",req.body, (error, data) =>{
        if(error) return res.status(500).send({ output: `Error ao tentar cadastrar -> ${error}` });
        res.status(201).send({ output: `Usuário cadastrado`,dados:data})
    });
});

app.post("/usuario/login",(req,res)=>{
     if(req.body.nomeusuario == "" ||
        req.body.senha == ""){
        return res.status(400).
        send({ output: `Você deve passar todos os dados`});
    }
    conexao.query("select * from usuario where nomeusuario=? and senha=?",
    [req.body.nomeusuario,
        req.body.senha],
        (error, data)=>{
            if(error) return res.status(500).send({output: `Erro ao tentar logar -> ${error}`});
            res.status(200).
            send({output: `Logado`,dados: data});
        });
});

app.put("/usuario/atualizar/:id",(req,res)=>{
        conexao.query("update usuario set ? where id=?", 
        [req.body,req.params.id], (error, data)=>{
            if(error)
            return res.status(500).send({
                output: `Erro ao tentar atualizar -> ${erro}`})
            res.status(200).
            send({ output: `Atualizado`, dados: data})
        }
    );
})

app.listen("3000", () => console.log("Servidor do r's online"));

