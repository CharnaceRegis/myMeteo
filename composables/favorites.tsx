import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

export interface Favorite {
    city: string;
    coords: { lat: number; lng: number };
}

export const addFavorite = async (favorite: Favorite) => {
    try {
        const favorites = await getFavorites();
        if (!favorites.some(fav => fav.city === favorite.city)) {
            favorites.push(favorite);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        }
    } catch (e) {
        console.error(e);
    }
};

export const removeFavorite = async (city: string) => {
    try {
        let favorites = await getFavorites();
        favorites = favorites.filter(fav => fav.city !== city);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (e) {
        console.error(e);
    }
};

export const getFavorites = async (): Promise<Favorite[]> => {
    try {
        const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const isFavorite = async (city: string): Promise<boolean> => {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.city === city);
};