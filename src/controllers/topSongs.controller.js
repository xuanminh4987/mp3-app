const fetch = require('node-fetch')


module.exports.getTopSongs = async (req, res) => {
  const { count } = req.body

  const data = await fetch(`https://mp3.zing.vn/xhr/chart-realtime?chart=song&time=-1&count=${count}`).then(res => res.json())

  if(data){
    return res.json({
      status: 'success',
      doc: data.data.song
    })
  } 
}