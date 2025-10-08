const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'


class ApiService{
 
    async Request(endpoint, options = {}){

        const url = `${API_BASE_URL}${endpoint}`; 
        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include',
        };
        const response = await fetch(url, config);
        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || 'Une erreur est survenue');
        }
        return data;
    }

    async login(username, password){
        return this.request('/login/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    async register(username, password){
        return this.request('/register/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    }

    async solvePuzzle(session_id, fragment){
        return this.request('/solve-puzzle/', {
            method: 'POST',
            body: JSON.stringify({ session_id, fragment }),
        });
    }
    
    async getProgress(session_id){
        return this.request(`/progress/${session_id}/`);
    }
}

export default new ApiService();

