const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

  //mongoDB에서 favorite 숫자를 가져오기
  Favorite.find({"movieId":req.body.movieId})
  .exec((err, info) => {
    if(err) return res.status(400).send(err)
    //프론트에 숫자 정보를 보내주기
    res.status(200).json({success:true, favoriteNumber: info.length})
  })

})
router.post('/favorited', (req, res) => {

  //내가 이 영화를 favorite 리스트에 넣었는지 정보를 db에서 가져오기
  //mongoDB에서 favorite 가져오기
  Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
  .exec((err, info) => {
    if(err) return res.status(400).send(err)
    let result = false;
    if(info.length !== 0) { //빈 배열이면 좋아요 누르지 않은 상태
      result = true
    }
    //프론트에 정보를 보내주기
    res.status(200).json({success:true, favorited: result})
  })

})
router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
  .exec((err, doc) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({success: true, doc})
  })


})
router.post('/addToFavorite', (req, res) => {

  const favorite = new Favorite(req.body)
  favorite.save((err,doc) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({success: true})
  })
})


module.exports = router;