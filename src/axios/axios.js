import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

let refreshTokenRequest = null

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        console.error(error)
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (config) => {
        return config.data;
    },
    (error) => {
        console.error([error])
        if (error.response.status === 401) {
            refreshTokenRequest = refreshTokenRequest
                ? refreshTokenRequest
                : refreshToken().finally(() => refreshTokenRequest = null)

            return this.refreshTokenRequest.then(accessToken => {
                error.response.config.Authorization = `Bearer ${accessToken}`
                return this.instance(error.response.config) // gọi lại api với config cần xử lý lại
            }).catch(refreshTokenError => {
                throw refreshTokenError
            })
        }
        return Promise.reject(error)
    }
)

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
        const res = await axiosInstance.post("/auth/refresh", { token: refreshToken })
        console.log(res);
        localStorage.setItem("accessToken", res.accessToken)
        localStorage.setItem("refreshToken", res.refreshToken)
        return res.accessToken;
    } catch (error) {
        localStorage.clear();
        throw error.response
    }
}

export default axiosInstance;