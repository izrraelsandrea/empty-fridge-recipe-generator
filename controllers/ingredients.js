const Ingredients = require('../models/ingredients');
const Users = require('../models/users');
let activeUsername; 

exports.postLogin = (req, res, next) => {
    const username=req.body.username;
    Users.findAll({where: {username:username}})
    .then(users => {
        const user=users[0];
        if (!user){
            return Users.create({username:username})
        }
        return user;
    })
    .then(result => {
        console.log(result);
        activeUsername=result.username;
        activeUserid=result.id;
        res.redirect('/recipes/ingredients');
    })
    .catch(err => console.log(err));
};

exports.getLogin = (req, res, next) => {
    res.render('login', { 
    pageTitle: 'Login',
    });
};

exports.getIngredients = (req, res, next) => {
    const username=activeUsername;
    const userid=activeUserid;
    Ingredients.findAll()
    .then(ingredients => {
        res.render('ingredients', { 
        pageTitle: 'Load your ingredients',
        ingredients: ingredients,
        hasIngredients: ingredients.length > 0,
        username:username,
        userid:userid
        });
    })
    .catch(err =>console.log(err));
   
};
exports.postIngredients = (req, res, next) => {
    const userId=req.body.userid;
    console.log('Posted: ',userId);
    const description= req.body.description;
    Users.findByPk(userId)
    .then(user =>{
        return user.createIngredients({description:description.toUpperCase()});
    })
        // Ingredients.create({
        //     description: description.toUpperCase()
        // })
    .then(result => {
        console.log('Result: ',result);
        res.redirect('/recipes/ingredients');
    })
    .catch(err => console.log(err));
};
exports.getDeleteIngredients = (req, res, next) => {
    const IngId = req.query.id;
    Ingredients.findByPk(IngId)
    .then(ingredient => {
        return ingredient.destroy();
    })
    .then(result => {
        console.log(result);
        res.redirect('/recipes/ingredients');
    })
    .catch(err => console.log(err));
};