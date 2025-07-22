import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import {
  fetchComments,
  createComment,
  deleteComment,
  updateComment,
} from '@/services/commentAPI';

function buildCommentTree(flatList) {
  const map = new Map();
  const roots = [];

  flatList.forEach((item) => {
    map.set(item.commentId, { ...item, children: [] });
  });

  flatList.forEach((item) => {
    const node = map.get(item.commentId);
    if (item.parentId) {
      const parent = map.get(item.parentId);
      if (parent) parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

const CommentSection = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const loadComments = async () => {
    try {
      const res = await fetchComments(recipeId);
      const tree = buildCommentTree(res.data);
      setComments(tree);
    } catch (err) {
      console.error('댓글 불러오기 실패', err);
      if (err.response?.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('댓글을 불러올 수 없습니다.');
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, [recipeId]);

  const handleAddComment = async (text, parentId = null) => {
    try {
      const res = await createComment(recipeId, text, parentId);
      const newComment = res.data || {
        commentId: `temp-${Date.now()}`,
        content: text,
        createdAt: new Date().toISOString(),
        writer: '나',
        parentId,
        children: []
      };

      // 새로 전체 트리 다시 불러오기 (즉시 반영)
      await loadComments();

      return newComment;
    } catch (err) {
      console.error('댓글 작성 실패', err);
      if (err.response?.status === 401) {
        alert('댓글을 작성하려면 로그인하세요.');
      }
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      await loadComments();
    } catch (err) {
      console.error('댓글 삭제 실패', err);
    }
  };

  const handleUpdate = async (commentId, newContent) => {
    try {
      await updateComment(commentId, newContent);
      await loadComments();
    } catch (err) {
      console.error('댓글 수정 실패', err);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">
        댓글
      </h2>

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-300 p-3 mb-4 rounded text-sm">
          {error}
        </div>
      )}

      <CommentForm onSubmit={handleAddComment} />

      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.commentId || `${comment.content}-${Math.random()}`}
            comment={comment}
            onReply={handleAddComment}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
