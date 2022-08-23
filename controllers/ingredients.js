const axios = require('axios');
const Ingredients = require('../models/ingredients');
const Users = require('../models/users');
let activeUsername; 
let activeUserid;
let query;

exports.postLogin = (req, res, next) => {

    const username=req.body.username;
    if (username){
        Users.findAll({where: {username:username}})
        .then(users => {
            const user=users[0];
            if (!user){
                return Users.create({username:username})
            }
            return user;
        })
        .then(result => {
            activeUsername=result.username;
            activeUserid=result.id;
            res.redirect('/recipes/ingredients');
        })
        .catch(err => console.log(err));
    }else{
        res.redirect('/recipes/login');
    }
};

exports.getLogin = (req, res, next) => {
    res.render('login', { 
    pageTitle: 'Login',
    });
};

exports.getIngredients = (req, res, next) => {
    const username=activeUsername;
    const userid=activeUserid;
    Ingredients.findAll({where: {userid: userid}})
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
    const description= req.body.description;
    if (description){
        Users.findByPk(userId)
        .then(user => {
            return user.createIngredient({description:description.toUpperCase()});
        })
        .then(result => {
            activeUserid=userId;
            res.redirect('/recipes/ingredients');
        })
        .catch(err => console.log(err));
    }else{
        res.redirect('/recipes/ingredients');
    }
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

exports.postGenerator = (req, res, next) => {
        const userid=req.body.uid;
        Ingredients
        .findAll({where: {userid: userid}})
        .then(ingredients => {
            const ingToSearch=[];
            if (ingredients)
            {    
                for (let i=0; i<ingredients.length; i++){
                    ingToSearch.push(ingredients[i].description);                
                }
                return(ingToSearch);
            }
        })
        .then(ingredients => {
            query=ingredients.toString().replace(/,/g,"+");
            console.log('QUERY: ',query);
            if(!query){query='Empy fridge'}

            axios.get('https://www.googleapis.com/customsearch/v1',
            {
                params: {
                key:'AIzaSyCH3J60QJjYT8LxPc9rCt0y2scmAryR1cU',
                cx:'95ac648edc12f4e72',
                q: query+'+recipes'
                }
            })
            .then(results => {
                //console.log(results);
               let items=results.data.items;
               let thumbnails=[];
               let parsedThumbs=[];
                items.forEach((element,index) => {
                    if (element.pagemap.cse_image){
                    thumbnails.push(element.pagemap.cse_image[0].src);
                    }
                });
                console.log(thumbnails);

               res.render('generation', { 
                pageTitle: 'Check your recipes',
                qingredients: query,
                hasItems: items.length > 0,
                items:items,
                thumbnails: thumbnails
               });
            })

            .catch(err =>console.log(err));
        })
        .catch(err => console.log(err));
};
exports.getLoginRedirect = (req, res, next) => {
res.redirect('recipes/login');
}