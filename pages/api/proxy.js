// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  console.log(req.body)
  console.log(req.query)
  console.log(req.headers.cookie)

  let options = {
    method: req.method,
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': req.headers.cookie
    },
    redirect: 'follow'
  }

  if(req.method != 'GET'){
    options.body = req.body
  }

  await fetch(req.query.url, options).then(data => data.json())
    .then(data => res.status(200).json(data))
    .catch(err => res.status(401).json(err))

}
