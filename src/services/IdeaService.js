export default {
  async getOne(axios, id) {
    const res = await axios.get(`/api/v1/idea/${id}`)
    return res.data
  },
  async getAll(axios) {
    const res = await axios.get('/api/v1/idea')
    return res.data
  },
  async topView(axios) {
    const res = await axios.get('/api/v1/idea/topview')
    return res.data
  },
  async search(axios, store, param) {
    const query = []
    query.push(`limit=${store.state.limit || 10}`)
    query.push(`page=${store.state.page || 1}`)
    if (param.id) query.push(`id=${param.id}`)
    if (param.rand) query.push(`rand=${param.rand}`)
    if (param.topicId) query.push(`topicId=${param.topicId}`)
    if (param.keyword) query.push(`keyword=${param.keyword}`)
    const res = await axios.get(`/api/v1/idea/search?${query.join('&')}`)
    return res.data
  },
  async createOne(axios, dto) {
    const res = await axios.post('/api/v1/idea', dto)
    return res.data
  },
  async updateOne(axios, id, dto) {
    const res = await axios.put(`/api/v1/idea/${id}`, dto)
    return res.data
  },
  async deleteOne(axios, id) {
    const res = await axios.delete(`/api/v1/idea/${id}`)
    return res.data
  },
  async upVote(axios, id) {
    const res = await axios.post(`/api/v1/idea/${id}/upvote`)
    return res.data
  },
  async downVote(axios, id) {
    const res = await axios.post(`/api/v1/idea/${id}/downvote`)
    return res.data
  },
}
