export default {
  async getOverView(axios) {
    const res = await axios.get(`/api/v1/report`)
    return res.data
  },
}
