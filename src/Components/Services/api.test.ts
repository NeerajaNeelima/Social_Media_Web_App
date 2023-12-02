
const puppeteer=require('puppeteer')
import {
    signUp,
    login,
    fetchPosts,
    createPost,
    fetchLikedPosts,
    fetchSavedPosts,
    updateProfile,
    fetchProfile,
  } from './api'; // Update the path accordingly
  
  describe('API Unit Tests', () => {
    test('SignUp API', async () => {
      const response = await signUp('testUser', 'testPassword');
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    test('Login API', async () => {
      const response = await login('testUser', 'testPassword');
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    // Add more unit tests for other API functions
  });
  
  describe('API Integration Tests', () => {
    test('Fetch Posts Integration Test', async () => {
      const response = await fetchPosts();
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    test('Create Post Integration Test', async () => {
      const response = await createPost('Test post content');
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    // Add more integration tests for other API functions
  });
  test('Should click around',()=>{
    const browser=puppeteer.launch({
        headless:false,
        slowMon:80,
        args:['--window-size=1920,1080']
    })
  })
  describe('API End-to-End Tests', () => {
    test('Fetch Profile E2E Test', async () => {
      const response = await fetchProfile();
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    test('Update Profile E2E Test', async () => {
      const response = await updateProfile({ name: 'New Name' });
      expect(response.success).toBe(true);
      // Add more assertions as needed
    });
  
    // Add more end-to-end tests for other API functions
  });
  