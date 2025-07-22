export default function UserTable({ users, handleDelete }) {
  return (
    <table className="w-full table-auto text-sm">
      <thead className="bg-gray-100 border-b text-gray-600">
        <tr>
          <th className="text-left px-4 py-2 w-1/6">이름</th>
          <th className="text-left px-4 py-2 w-1/4">이메일</th>
          <th className="text-left px-4 py-2 w-1/6">역할</th>
          <th className="text-left px-4 py-2 w-1/6">가입일</th>
          <th className="text-left px-4 py-2 w-1/6">관리</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-400">
              유저가 없습니다.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.userId} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                {new Date(user.createdAt).toLocaleDateString('ko-KR')}
              </td>
              <td className="px-4 py-2 text-red-600">
                <button onClick={() => handleDelete(user.userId)}>강제 탈퇴</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
