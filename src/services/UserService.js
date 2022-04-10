export default {
  async getLoginUser(axios) {
    const res = await axios.get(`/api/v1/user/token`)
    return res.data
  },
}
