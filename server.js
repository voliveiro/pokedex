require('dotenv').config(); 
const express = require('express'); 
const app = express(); 
const ejs = require('ejs');
const methodOverride = require('method-override');
const data = require('./models/pokemon.js')

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log('Middleware 2');
    next();
});

//display raw data

app.get('/', (req, res) => {
    res.send(data)
})

app.get('/index', (req, res) => {
    res.render('index.ejs', {
        data: data
    })
})

//show
app.get('/index/:indexNo', (req, res) => {
    const indexNo = req.params.indexNo; 
    res.render('show.ejs', {
        data: data, 
        item: data[indexNo]
    })
})

//create 

app.get('/new', (req, res) => {
    res.render('new.ejs')
})

app.post('/index', (req, res) => {
    let item = {}; 
    item.name=req.body.name;
    item.img=req.body.img;
    item.stats = {}
    item.stats.hp=req.body.statsHp;
    item.stats.attack=req.body.statsAttack; 
    item.stats.defense=req.body.statsDefense; 
    item.stats.spattack=req.body.statsSpattack;
    item.stats.spdefense=req.body.statsSpdefense;
    item.stats.speed=req.body.statsSpeed
    item.damages={}
    item.damages.normal=req.body.dNormal;
    item.damages.fire=req.body.dFire;
    item.damages.water=req.body.dWater;
    item.damages.electric=req.body.dElectric;
    item.damages.grass=req.body.dGrass;
    item.damages.ice=req.body.dIce;
    item.damages.fight=req.body.dFight;
    item.damages.poison=req.body.dPoison;
    item.damages.ground=req.body.dGround;
    data.push(item)
    res.redirect('/index')
})
//delete
app.delete('/index/:indexNo', (req, res) => {
    data.splice(req.params.indexNo, 1); 
    res.redirect('/index');
})

//update

app.put('/index/:indexNo', (req, res) => {
    const item = data[req.params.indexNo];
    item.name= req.body.name;
    res.redirect('/index/:indexNo')
})

app.get('/index/:indexNo/editName', (req, res) => {
    res.render('editName.ejs', {
        indexNo: req.params.indexNo,
        item: data[req.params.indexNo],

    })
})

app.listen(process.env.PORT, ()=> {
    console.log ('listening at port 3000')
})