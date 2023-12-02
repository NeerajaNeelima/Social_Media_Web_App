interface SignUpRequest {
    username: string;
    password: string;
  }
  
  interface SignUpResponse {
    success: boolean;
    data?: any; // Additional user data, if needed
    error?: string;
  }
  interface LoginRequest {
    username: string;
    password: string;
  }
  
  interface LoginResponse {
    success: boolean;
    data?: any; // Additional user data, if needed
    error?: string;
  }
  interface FetchPostsResponse {
    success: boolean;
    data?: Post[]; // Array of post objects
    error?: string;
  }
  
  interface Post {
    postId: string;
    content: string;
    // Add other properties as needed
  }
  interface CreatePostRequest {
    content: string;
  }
  
  interface CreatePostResponse {
    success: boolean;
    data?: Post; // Newly created post object
    error?: string;
  }
  interface FetchLikedPostsResponse {
    success: boolean;
    data?: Post[]; // Array of liked post objects
    error?: string;
  }
  interface FetchSavedPostsResponse {
    success: boolean;
    data?: Post[]; // Array of saved post objects
    error?: string;
  }
  interface UpdateProfileRequest {
    // Specify fields that can be updated in the profile
    name?: string;
    email?: string;
    // Add other properties as needed
  }
  
  interface UpdateProfileResponse {
    success: boolean;
    data?: UserProfile; // Updated user profile object
    error?: string;
  }
  
  interface UserProfile {
    userId: string;
    username: string;
    name?: string;
    email?: string;
    // Add other properties as needed
  }
  interface FetchProfileResponse {
    success: boolean;
    data?: UserProfile; // User profile object
    error?: string;
  }
      