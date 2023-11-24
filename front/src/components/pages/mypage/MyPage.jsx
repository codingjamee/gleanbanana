import Side from "../../layout/SideLayout";

const MyPage = () => {
  return (
    <div className="mypage">
      <div className="mypage__sidebar">
        <Side />
      </div>
      <div className="mypage__content">
        <div>나의 탄소 소비량</div>
      </div>
    </div>
  );
};

export default MyPage;
