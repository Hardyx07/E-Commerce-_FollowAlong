import axiosInstance from '../axiosConfig';
import store from '../store/store';
import { setemail } from '../store/useractions';

// Function to check if user is logged in and load user data
export const loadUser = async () => {
  try {
    const response = await axiosInstance.get('/api/v2/user/me');
    if (response.data.success) {
      // If user is logged in, set email in Redux store
      store.dispatch(setemail(response.data.user.email));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error loading user:', error);
    return false;
  }
};