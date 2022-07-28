// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

    let results = []
    let page = 0

    await get(req, 0).then(async data => {
        results.push(...data.data)

        for (page; page <= data.page_count; page++) {
            await get(req, page).then(async data => {
                results.push(...data.data)

                if (page === data.page_count) {
                    res.status(200).json(results)
                }

            })

        }

    })

}


const get = async (req, page) => {

    let options = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': req.headers.cookie
        },
        redirect: 'follow'
    }

    return await fetch(`https://api.onepeloton.com/api/user/${req.query.peloton_user_id}/workouts?limit=100&page=${page}`, options).then(data => data.json())

}

