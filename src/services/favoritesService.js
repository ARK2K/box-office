import { 
  doc, setDoc, deleteDoc, onSnapshot, collection 
} from 'firebase/firestore';
import { db } from './firebase';

export const addFavorite = async (userId, item) => {
  const docRef = doc(db, 'users', userId, 'favorites', item.imdbID);
  return setDoc(docRef, item);
};

export const removeFavorite = async (userId, imdbID) => {
  const docRef = doc(db, 'users', userId, 'favorites', imdbID);
  return deleteDoc(docRef);
};

export const onFavoritesChange = (userId, callback) => {
  // Listen to the favorites SUBCOLLECTION
  const colRef = collection(db, 'users', userId, 'favorites');
  return onSnapshot(colRef, (snapshot) => {
    const favorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(favorites);
  });
};

export const isFavorite = (favorites, imdbID) => {
  return favorites.some(fav => fav.id === imdbID);
};