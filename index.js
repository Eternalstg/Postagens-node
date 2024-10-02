import express from "express";
import path from "path";
import {engine} from "express-handlebars";
import Post from "./models/Post.js";
const app = express();

app.engine('handlebars', engine({defaultLayout: "main",
    runtimeOptions:{
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    }
    }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',function(req,res){
  Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
    res.render('home', {posts: posts} )
  })
});
app.get('/cad', function(req, res){
  res.render('form');
});
app.get('/deletar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.send("Postagem apagada com exito!");
  }).catch(function(error){
    res.send("Postagem não encontrada");
  })
})
app.post('/add', function(req, res){
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo
  }).then(function(){
    res.redirect('/');
  }).catch(function(error){
    res.send("Falha ao criar post: " + error);
  })
});

/* Testando se esta conectado ao banco de dados

sequelize.authenticate().then(function(){
  console.log("Conectado com sucesso!");
}).catch(function(error){
  console.log("Falha ao se conectar: " + error);
});

*/


// const __dirname = path.resolve();
// const app = express();

/* app.get("/", function(req, res){
  res.sendFile(__dirname + "/Pasta/Project.html");
}); 
*/




app.listen(8081,function(){
  console.log("Rodando na porta 8081");
});
