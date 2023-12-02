import React, { useState,useEffect } from 'react';
import { Card,Modal,Form, Input } from 'antd';
import { HeartOutlined, HeartFilled, BookOutlined, BookFilled,EditOutlined,DeleteOutlined,CommentOutlined } from '@ant-design/icons';
import postsData from './postsData'; 
import './Card.css'
import likesData from './LikesData'
import SavedData from './BookMarks_Data';


const { Meta } = Card;

const MyBookMarks: React.FC = () => {
  const [likes, setLikes] = useState<number[]>(Array(postsData.length).fill(0));
  const [bookmarks, setBookmarks] = useState<boolean[]>(postsData.map(post => post.bookmarked));
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState('');
  const [editingPostIndex, setEditingPostIndex] = useState<number | null>(null);
  const [comments, setComments] = useState<string[][]>(
    Array(postsData.length).fill([]).map(() => [])
  );

  useEffect(() => {
    // Load comments from local storage
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setComments(storedComments);
  }, []);

  const currentUserId = 1;

  const handleLikeToggle = (index: number) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = 1 - newLikes[index]; // Toggle between 0 and 1
      return newLikes;
    });
  };

  const handleBookmarkToggle = (index: number) => {
    setBookmarks((prevBookmarks) => {
      const newBookmarks = [...prevBookmarks];
      newBookmarks[index] = !newBookmarks[index]; // Toggle between true and false
      return newBookmarks;
    });
  };

  const handleEditPost = (index: number) => {
    setEditingPostIndex(index);
    setEditedPostContent(postsData[index].description);
    setIsEditModalVisible(true);
  };

  const handleUpdatePost = () => {
    if (editingPostIndex !== null) {
      // Update the post content in the state
      const updatedPosts = [...postsData];
      updatedPosts[editingPostIndex].description = editedPostContent;
      // Update the state with the edited content
      setEditingPostIndex(null);
      setIsEditModalVisible(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingPostIndex(null);
    setIsEditModalVisible(false);
  };

  const handleDeletePost = (index: number) => {
    // Delete the post from the state
    const updatedPosts = [...postsData];
    updatedPosts.splice(index, 1);
    setEditingPostIndex(null);
    setIsEditModalVisible(false);
  };

  const calculateTotalLikes = (postId) => {
    const likesForPost = likesData.filter((like) => like.postId === postId);
    return likesForPost.length;
  };
  const calculateTotalSaved = (postId) => {
    const likesForPost = SavedData.filter((like) => like.postId === postId);
    return likesForPost.length;
  };
  
  const handleAddComment = (index: number) => {
    const newComment = prompt('Enter your comment:');

    if (newComment) {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        newComments[index] = [...newComments[index], newComment];

        // Store comments in local storage
        localStorage.setItem('comments', JSON.stringify(newComments));

        return newComments;
      });
    }
  };
  

  return (
    <div className='card-flex'>
      {postsData.map((post, index) => (
        post.id === currentUserId ?(
        <Card
          key={post.id}
          hoverable
          
          style={{ width: 360, marginBottom: '16px' }}
          cover={<img alt={post.description} src={post.image} />}
          actions={[
            post.id === currentUserId ? (
                <>
                <div>
                  <EditOutlined key="edit" onClick={() => handleEditPost(index)} style={{ fontSize: '24px',position:'absolute',top:'-45px'}} />
                  <DeleteOutlined
                    key="delete"
                    onClick={() => handleDeletePost(index)}
                    style={{ fontSize: '24px' ,position:'absolute',top:'-45px',left:'45vh' }}
                  />
                  </div>
                </>
              ) : null,
            likes[index] ? (
              <HeartFilled
                key="heart"
                onClick={() => handleLikeToggle(index)}
                style={{ color: 'red', fontSize: '24px' }}
              />
            ) : (
              <HeartOutlined
                key="heart"
                onClick={() => handleLikeToggle(index)}
                style={{ fontSize: '24px' }}
              />
            ),
            bookmarks[index] ? (
              <BookFilled
                key="bookmark"
                onClick={() => handleBookmarkToggle(index)}
                style={{ color: 'blue', fontSize: '24px' }}
              />
            ) : (
              <BookOutlined
                key="bookmark"
                onClick={() => handleBookmarkToggle(index)}
                style={{ fontSize: '24px' }}
              />
            ),
            <CommentOutlined
              key="comment"
              onClick={() => handleAddComment(index)}
              style={{ fontSize: '24px' }}
            />,
            
              
            
          ]}
        >
          <Meta title={post.description} description={`Likes: ${calculateTotalLikes(post.id)}, Saved:${calculateTotalSaved(post.id)},Comments: ${comments[index]?.length || 0}` } />
          
        </Card>):null
      ))}
      <Modal
        title="Edit Post"
        visible={isEditModalVisible}
        onOk={handleUpdatePost}
        onCancel={handleCancelEdit}
      >
        <Form>
          <Form.Item label="Post Content">
            <Input
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyBookMarks;
