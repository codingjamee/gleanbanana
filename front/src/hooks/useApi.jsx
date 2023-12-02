import { useEffect, useState } from "react";
import { API_FETCHER } from "../utils/axiosConfig";
import { useErrorBoundary } from "react-error-boundary";

const useApi = ({
  method = "get",
  path = "",
  data = {},
  shouldInitFetch = false,
}) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [reqIdentifier, setReqIdentifier] = useState("");
  const [error, setError] = useState(false);
  const [extra, setExtra] = useState("");
  const { showBoundary } = useErrorBoundary();

  const trigger = async ({
    method: triggerMethod = method,
    path: triggerPath = path,
    data: triggerData = data,
    applyResult = false,
    isShowBoundary = true,
  }) => {
    setLoading(true);

    console.log("trigger 호출");
    console.log("triggerMethod", triggerMethod);
    setReqIdentifier(triggerMethod + "Data");
    try {
      console.log("요청보내기!");
      const triggerResult = await API_FETCHER[triggerMethod](
        triggerPath,
        triggerData
      );
      console.log("요청보내기 완료오오오 --------->!");

      if (applyResult) {
        console.log("result를 적용");
        console.log("triggerResult", triggerResult);
        setResult(triggerResult);
        return result;
      }
      return triggerResult;
    } catch (err) {
      console.log(err);
      if (isShowBoundary) {
        //에러 바운더리를 보여줘야 할때만 보여줌
        showBoundary(err);
        return;
      }
      setError(err);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    shouldInitFetch && console.log("초기 요청합니다!!", method, path);
    shouldInitFetch && trigger({ method, path, data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { result, loading, reqIdentifier, extra, trigger, error };
};
export default useApi;
