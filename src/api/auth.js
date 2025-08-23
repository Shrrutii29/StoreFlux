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
            avatar: ""

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

export const updateUser = async (userId, updatedFields) => {
    try {
      const { data } = await axios.put(
        `https://api.escuelajs.co/api/v1/users/${userId}`,
        updatedFields,
      );
      return data;
    } catch (err) {
        return { error: err.response?.data?.message || err.message };
    }
  };

