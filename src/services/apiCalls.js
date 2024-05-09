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