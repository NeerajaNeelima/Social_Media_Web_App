// api.ts

const API_BASE_URL = 'https://example.com/api'; // Replace with your actual API base URL

interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export async function signUp(username: string, password: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while signing up.' };
  }
}

export async function login(username: string, password: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while logging in.' };
  }
}

export async function fetchPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while fetching posts.' };
  }
}

export async function createPost(content: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while creating a post.' };
  }
}

export async function fetchLikedPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/liked`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while fetching liked posts.' };
  }
}

export async function fetchSavedPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/saved`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while fetching saved posts.' };
  }
}

export async function updateProfile(profileData: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/profile/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while updating the profile.' };
  }
}

export async function fetchProfile(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`);
    return await response.json();
  } catch (error) {
    return { success: false, error: 'An error occurred while fetching the profile.' };
  }
}
