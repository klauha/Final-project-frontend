const apiUrl = "http://localhost:4000"


export const register = async (bodyCredentials) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyCredentials),
            }
        )
        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}

export const login = async (bodyCredentials) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/auth/login`,
            {
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyCredentials),
            }
        )
        const data = await response.json()

        return data
    } catch (error) {
        return error
    }
}
export const getDepartament = async (token) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/departaments`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const getIssueType = async (token) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/issue-types`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const createIssue = async (token, bodyDataIssue) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/issues`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(bodyDataIssue),
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const getMyIssues = async (token) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/issues`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}

export const getIssueById = async (token, id) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/issues/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const getCommentsByIssue = async (token, id) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/comments/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}

export const createComment = async (token, bodyDataComment) => {  
    try {
        const response = await fetch(
            `${apiUrl}/api/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(bodyDataComment),
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}      

export const getProfile = async (token) => {    
    try {
        const response = await fetch(
            `${apiUrl}/api/users/profile`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const editProfiles = async (dataToUpdate, token) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/users/profile`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(dataToUpdate),
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
export const getUsers = async (token) => {  
    try {
        const response = await fetch(
            `${apiUrl}/api/users`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}
 export const deleteUserbyAdmin = async (id,token) => {
    try {
        const response = await fetch(
            `${apiUrl}/api/users/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )

        const data = await response.json()

        return data

    } catch (error) {
        return error
    }
}