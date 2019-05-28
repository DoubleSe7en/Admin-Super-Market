const account = require('../../models/accountModel.js');

//View list account
exports.listAccount = function(req, res) {
    account.find({}).exec((err,Account)=>{
        if(err){
            console.log('Thất bại');
        }
        else{
            res.render('accountManager/accounts', {title: 'Danh sách sản phẩm', Account});
        }
    })

};

//View single account
exports.detailAccount = function (req, res) {
    account.findById(req.params.id).then(accountFound =>{
        if (!accountFound)
        {
            res.send('Thất bại');
        }
        res.render('accountManager/detailAccount',{title:'Chi tiết', accountFound})
    })
}



