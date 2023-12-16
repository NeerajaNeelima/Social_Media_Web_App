import React, { useState,useEffect } from 'react';
import { Card,Modal,Form, Input } from 'antd';
import { HeartOutlined, HeartFilled, BookOutlined, BookFilled,EditOutlined,DeleteOutlined,CommentOutlined } from '@ant-design/icons';
import postsData from './postsData';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Card.css'
import likesData from './LikesData'
import SavedData from './BookMarks_Data';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const { Meta } = Card;

const PostCard: React.FC = () => {
  const [likes, setLikes] = useState<number[]>(Array(postsData.length).fill(0));
  const [bookmarks, setBookmarks] = useState<boolean[]>(postsData.map(post => post.bookmarked));
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedPostContent, setEditedPostContent] = useState('');
  const [editingPostIndex, setEditingPostIndex] = useState<number | null>(null);
  const [comments, setComments] = useState<string[][]>(
    Array(postsData.length).fill([]).map(() => [])
  );
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(postsData.slice(0, 5)); // Display initial 5 posts

  const fetchMoreData = () => {
    // Simulate fetching more data
    setTimeout(() => {
      const currentVisiblePosts = visiblePosts.length;
      const newVisiblePosts = postsData.slice(currentVisiblePosts, currentVisiblePosts + pageSize);

      if (newVisiblePosts.length === 0) {
        setHasMore(false);
      } else {
        setVisiblePosts([...visiblePosts, ...newVisiblePosts]);
      }
    }, 500); // Simulating an API call delay
  };
  const [isloading,setisloading]=useState(true)
    useEffect(() => {
        setTimeout(() =>{
        setisloading(false)
    }, 1500)
    },[])

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

  const calculateTotalLikes = (postId: number) => {
    const likesForPost = likesData.filter((like) => like.postId === postId);
    return likesForPost.length;
  };
  const calculateTotalSaved = (postId:number) => {
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
    
    <InfiniteScroll
      dataLength={visiblePosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className='card-flex'>
      {(isloading ? [...Array(pageSize)] : visiblePosts).map((post, index) => (
          <div key={post ? post.id : index} style={{ width: '360px', marginBottom: '16px' }}>
            {(isloading || !post) ? (
              <SkeletonTheme highlightColor="#444">
                <Skeleton height={300} duration={2} />
              </SkeletonTheme>
            ) :(
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
                    style={{ fontSize: '24px' ,position:'absolute',top:'-45px',left:'42vh' }}
                    className='Delete'
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
          
        </Card>)}
        </div>
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
    </InfiniteScroll>
    
  );
};

export default PostCard;
