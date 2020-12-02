const {Router} = require('express')
const Link = require('../models/Link')
const router = Router()


router.get('/:id', async (req, res) => {
  try{
    const link = await Link.findOne({ code: req.params.id})

    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json('Ссылка не найдена')
  } catch (e) {
    res.status(500).json({message: 'Что-то пошло не так, серверная ошибка'})
  }
})

module.exports = router
