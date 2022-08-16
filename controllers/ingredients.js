exports.getIngredients = (req, res, next) => { 
    res.render('ingredients', { 
        pageTitle: 'Load your ingredients',
    });
}