import axios from "axios"

let refreshTokenRequest = null
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.url === '/auth/refresh') {
            return config
        }
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
        if (error.response?.status === 401) {
            refreshTokenRequest = refreshTokenRequest
                ? refreshTokenRequest
                : refreshToken().finally(() => refreshTokenRequest = null)

            return refreshTokenRequest.then(accessToken => {
                console.log(accessToken);
                error.config.Authorization = `Bearer ${accessToken}`
                return axiosInstance(error.config)
            })
        }
        return Promise.reject(error)
    }
)

const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken || refreshToken === "undefined" || refreshToken === "null") {
        localStorage.clear()
        return Promise.reject("Khong co token")
    }
    try {
        const res = await axiosInstance.post("/auth/refresh", { token: refreshToken })
        console.log(res);
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        return res.accessToken;
    } catch (error) {
        localStorage.clear();
        throw error.response
    }
}

export default axiosInstance;