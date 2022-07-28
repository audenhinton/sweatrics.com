// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  
    let options = {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'peloton_session_id=' + req.query.peloton_session_id
      },
      redirect: 'follow'
    }
    
    await fetch('https://api.onepeloton.com/api/me', options).then(data => data.json())
      .then(data => res.status(200).json(data))
      .catch(err => res.status(401).json(err))
  
  }
  