
import axios from 'axios';

const API_URL = 'https://vineetpersonal.site:5000/api';

export const rollDice = async (betAmount, betOption) => {
    try {
        const response = await axios.post(`${API_URL}/roll`, { betAmount, betOption });
        return response.data;
    } catch (error) {
        console.error("Error rolling dice", error);
        throw error;
    }
};
