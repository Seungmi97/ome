import { useEffect, useState } from "react";

export default function UserManage() {
  const [users, setUsers] = useState([]);

  // 전체 사용자 불러오기
  useEffect(() => {
    fetch("/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("유저 목록 불러오기 실패", err));
  }, []);

  // 비활성화 처리
  const handleDeactivate = async (userId) => {
    const confirm = window.confirm("해당 사용자를 강제 탈퇴 처리하시겠습니까?");
    if (!confirm) return;

    try {
      const res = await fetch(`/admin/users/${userId}/deactivate`, {
        method: "PATCH",
      });

      if (res.ok) {
        alert("회원 계정이 비활성화되었습니다.");
        setUsers(prev => prev.filter(user => user.id !== userId));
      } else {
        alert("처리에 실패했습니다.");
      }
    } catch (err) {
      console.error("탈퇴 처리 중 오류", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">👥 유저 관리</h1>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-500">
            <th className="pb-2">닉네임</th>
            <th className="pb-2">이메일</th>
            <th className="pb-2">가입일</th>
            <th className="pb-2">상태</th>
            <th className="pb-2">관리</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">등록된 유저가 없습니다.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id} className="border-b">
                <td className="py-2">{user.nickname}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString("ko-KR")}</td>
                <td>{user.isActive ? "활성" : "비활성"}</td>
                <td>
                  {user.isActive && (
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      강제탈퇴
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
