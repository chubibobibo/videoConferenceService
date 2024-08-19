/** material tailwind */
import CardComponent from "../../components/CardComponent";

/** styled components */
import { Wrapper } from "../../assets/Wrappers/CardWrapper";

function LoginPage() {
  return (
    <Wrapper>
      <CardComponent title={"Login"} btnLabel={"Login"} />
    </Wrapper>
  );
}
export default LoginPage;
