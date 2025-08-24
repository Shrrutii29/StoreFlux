import axios from "axios"

export const userLogin = async (email, password) => {
    const url = "https://api.escuelajs.co/api/v1/auth/login"
    try {
        const { data } = await axios.post(url, {
            email: email,
            password: password
        })
        return data
    } catch (err) {
        return { error: err.response?.data?.message || err.message };
    }
}

export const userSignup = async (name, email, password) => {
    const url = "https://api.escuelajs.co/api/v1/users/";
    try {
        const { data } = await axios.post(url, {
            name: name,
            email: email,
            password: password,
            avatar: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

        });
        return data;
    } catch (err) {
        return { error: err.response?.data?.message || err.message };
    }
};

export const checkEmailAvailability = async (email) => {
    try {
        const { data } = await axios.get(`https://api.escuelajs.co/api/v1/users`);
        const exists = data.some(user => user.email === email);
        return { isAvailable: !exists };
    } catch (err) {
        return { isAvailable: true };
    }
};

export const getProfile = async (token) => {
    const url = "https://api.escuelajs.co/api/v1/auth/profile";
    try {
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data; 
    } catch (err) {
        return { error: err.response?.data?.message || err.message };
    }
};

export const updateProfile = async (id, updatedData, token) => {
    try {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // needs correct token
          },
        }
      )
      return data
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message)
      throw error
    }
  }
  

