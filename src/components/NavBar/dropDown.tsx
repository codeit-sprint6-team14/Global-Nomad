const dropDown = () => {
  return (
    <ul className="h-max w-120 border bg-white border-solid border-gray-300 rounded-6 absolute right-[-12px] top-40">
      <li className="text-center cursor-pointer hover:bg-green-100 text-gray-800 text-md-medium py-12 border-b border-gray-300 w-full px-16">
        로그아웃
      </li>
      <li className="text-md-medium cursor-pointer text-center w-full hover:bg-green-100 text-gray-800 py-12 px-16">
        마이페이지
      </li>
    </ul>
  )
}

export default dropDown
