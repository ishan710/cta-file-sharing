const express = require('express')
const router = express.Router()

router.get('/api/example', (req, res) => {
  res.json({ status: 'success', message: 'this is an example' })
})


/* 
*   Get Request: 
*   Endpoint URL: /api/poems
*   Description: Get all poems
*   example:  "/api/poems?loc=121.121029,23.1029381208&radius=20&author=nick"
*   Notes: Here searchPoemByAuthor,searchPoemByLoc,searchPoemByRoute are implemented by the database team
*/




router.get('/api/poems', (req, res) => {
  // res.json({ status: 'success', message: 'this is an example' })
  const author = req.query.author
  const loc = req.query.loc
  const radius = req.query.radius
  const route = req.query.route
  const success = false
  const msg = ""
  const poem_list = []
  const author_list = []
  const route_list = []
  const loc_list = []


  if (loc.length() > 2)
  {
      success = false
      msg = "Invalid Location; expected 2 coordinates, got more"
      res.send({"poem":null, "status" : true, "msg": msg})
  }
  else{
    // Query Database querying functions

    // Query by author
    if (author){
      author_list = searchPoemByAuthor(author)
    }

    // Radius Param TODO
    // Query by author
    if (loc, radius){
      loc_list = searchPoemByLoc(loc[0],loc[1],radius)
    }

    // Query by route
    if (route){
      route_list = searchPoemByRoute(route)
    }


    
    // Implementing list union feature

    // 3 filters
    if (author && loc && route){
      poem_list = author_list.filter((a) => loc_list.some((b) => a.time === b.time));
      poem_list = author_list.filter((a) => route_list.some((b) => a.time === b.time));
    }
    // 2 filters
    else if (author && loc) 
    {
      poem_list = author_list.filter((a) => loc_list.some((b) => a.time === b.time));
    }
    // 2 filters
    else if (route && loc) 
    {
      poem_list = route_list.filter((a) => loc_list.some((b) => a.time === b.time));
    }
    // 1 filter
    else if (author) 
    {
      poem_list = author_list
    }
    // 1 filters
    else if (loc) 
    {
      poem_list = loc_list
    }
    // 1 filter
    else
    {
      poem_list = route_list
    }

  }

  res.send({"poem":poem_list, "status" : true, "msg": null})

})




module.exports = router

