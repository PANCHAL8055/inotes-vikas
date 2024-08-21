import { useParams, useNavigate } from "react-router-dom";

const GetParams = (WrappedComponent) => {
  const GetParamsWrapper = () => {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent params={params} navigate={navigate} />;
  };
  return GetParamsWrapper;
};

export default GetParams;
