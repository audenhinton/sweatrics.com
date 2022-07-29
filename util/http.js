const http = {

    get: async (url, options = {}) => {
  
      return await fetch(url, {
        method: 'GET',
        ...options
      }).then(res => res.json())
  
    },

    post: async (url, body, options = {}) => {
  
      return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        ...options
      }
      ).then(res => res.json())
  
    }
  
  }

export default http;