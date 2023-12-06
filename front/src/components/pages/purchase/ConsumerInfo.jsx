import { useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { useSelector } from "react-redux";

const consumerInfo = [
  { name: "이름", value: "김유저" },
  { name: "이메일", value: "user@banana.com" },
  { name: "연락처", value: "010-1111-2222" },
];

//올 데이터.... 이렇게 될지?
// const tableName = ["이름", "이메일", "연락처"];

const ConsumerInfo = () => {
  const userId = useSelector((state) => state.user.userInfo);
  const { trigger, result } = useApi({ method: "get", path: `/${userId}` });
  // useEffect(() => {
  //   trigger({ data: { currentUserId: userId } });
  // }, []);

  // useEffect(() => {
  //   console.log(result?.data);
  // }, [result?.data]);
  return (
    <div className="title title__element">
      {consumerInfo.map((cons) => (
        <div className="flex flex__element-left">
          <div>{cons.name}</div>
          <div>{cons.value}</div>
        </div>
      ))}
    </div>
  );
};

export default ConsumerInfo;
